import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Capacitor } from "@capacitor/core";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export type SecureExamLanguageCopy = {
  badge: string;
  nativeBadge: string;
  violationTitle: string;
  violationDescription: (count: number) => string;
  returnToExam: string;
  fullscreenUnavailable: string;
  autoSubmitNote: string;
};

export const SECURE_EXAM_COPY: Record<"id" | "en" | "ja", SecureExamLanguageCopy> = {
  id: {
    badge: "Mode Ujian Aman Aktif",
    nativeBadge: "Mode Ujian Aman Aktif (Aplikasi)",
    violationTitle: "Peringatan Mode Ujian Aman",
    violationDescription: (count) =>
      `Anda terdeteksi keluar dari layar ujian. Pelanggaran ke-${count} dari maksimal 3. Kuis akan otomatis dikumpulkan jika pelanggaran mencapai batas.`,
    returnToExam: "Kembali ke Mode Ujian",
    fullscreenUnavailable: "Fullscreen tidak tersedia atau ditolak browser. Mode aman tetap berjalan, tetapi pengawasan perangkat diperlukan.",
    autoSubmitNote: "Ujian telah dikumpulkan otomatis karena mendeteksi 3 kali keluar dari mode ujian aman.",
  },
  en: {
    badge: "Secure Exam Mode Active",
    nativeBadge: "Secure Exam Mode Active (App)",
    violationTitle: "Secure Exam Mode Warning",
    violationDescription: (count) =>
      `You were detected leaving the exam screen. Violation ${count} of a maximum of 3. The quiz will be submitted automatically when the limit is reached.`,
    returnToExam: "Return to Exam Mode",
    fullscreenUnavailable: "Fullscreen is unavailable or was denied by the browser. Secure mode is still running, but device supervision is required.",
    autoSubmitNote: "The exam was submitted automatically after detecting 3 exits from secure exam mode.",
  },
  ja: {
    badge: "安全な試験モード 有効",
    nativeBadge: "安全な試験モード 有効（アプリ）",
    violationTitle: "安全な試験モードの警告",
    violationDescription: (count) =>
      `試験画面から離れたことが検出されました。違反 ${count} 回目（最大 3 回）。上限に達すると解答が自動提出されます。`,
    returnToExam: "試験モードに戻る",
    fullscreenUnavailable: "フルスクリーンを利用できないか、ブラウザに拒否されました。安全モードは継続しますが、端末の監督が必要です。",
    autoSubmitNote: "安全な試験モードから3回退出したため、試験は自動的に提出されました。",
  },
};

type UseSecureExamOptions = {
  active: boolean;
  submitted: boolean;
  onViolation: (eventId: string) => Promise<{
    violations: number;
    autoSubmitted: boolean;
    score?: number;
    percentage?: number;
    answeredCount?: number;
    emailSent?: boolean;
  }>;
  onViolationError: (error: unknown) => void;
  onAutoSubmit: (result: {
    score?: number;
    percentage?: number;
    answeredCount?: number;
    emailSent?: boolean;
  }) => void;
};

export const useSecureExam = ({
  active,
  submitted,
  onViolation,
  onViolationError,
  onAutoSubmit,
}: UseSecureExamOptions) => {
  const { language } = useLanguage();
  const copy = SECURE_EXAM_COPY[language];
  const nativeMode = Capacitor.isNativePlatform();
  const [violations, setViolations] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fullscreenWarning, setFullscreenWarning] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(() => nativeMode || Boolean(document.fullscreenElement));
  const violationRef = useRef(0);
  const autoSubmittedRef = useRef(false);
  const lastViolationAtRef = useRef(0);
  const violationQueueRef = useRef(Promise.resolve());

  const requestExamFullscreen = useCallback(async () => {
    if (nativeMode) {
      setIsFullscreen(true);
      setFullscreenWarning("");
      return true;
    }

    if (!document.fullscreenEnabled || typeof document.documentElement.requestFullscreen !== "function") {
      setIsFullscreen(false);
      setFullscreenWarning(copy.fullscreenUnavailable);
      return false;
    }

    try {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
      setFullscreenWarning("");
      return true;
    } catch {
      setIsFullscreen(false);
      setFullscreenWarning(copy.fullscreenUnavailable);
      return false;
    }
  }, [copy.fullscreenUnavailable, nativeMode]);

  const recordViolation = useCallback(() => {
      if (!active || submitted || autoSubmittedRef.current) return;
      const now = Date.now();
      if (now - lastViolationAtRef.current < 1_000) return;
      lastViolationAtRef.current = now;

      const nextCount = Math.min(3, violationRef.current + 1);
      violationRef.current = nextCount;
      setViolations(nextCount);
      setDialogOpen(true);

      const eventId = globalThis.crypto?.randomUUID?.();
      if (!eventId) {
        onViolationError(new Error("Secure random IDs are unavailable in this browser."));
        return;
      }

      violationQueueRef.current = violationQueueRef.current
        .then(async () => {
          const result = await onViolation(eventId);
          const authoritativeCount = Math.min(3, result.violations);
          violationRef.current = authoritativeCount;
          setViolations(authoritativeCount);
          if (result.autoSubmitted && !autoSubmittedRef.current) {
            autoSubmittedRef.current = true;
            onAutoSubmit(result);
          }
        })
        .catch(onViolationError);
    }, [active, onAutoSubmit, onViolation, onViolationError, submitted]);

  useEffect(() => {
    if (!active || submitted) return;

    const handleFullscreenChange = () => {
      const fullscreen = Boolean(document.fullscreenElement);
      setIsFullscreen(fullscreen);
      if (!fullscreen && !nativeMode) {
        recordViolation();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) recordViolation();
    };

    const handleBlur = () => {
      recordViolation();
    };

    const handleFocus = () => {
      if (!document.hasFocus()) {
        recordViolation();
      }
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const blockContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const blockSelection = (event: Event) => {
      event.preventDefault();
    };

    const blockKeyboardShortcuts = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;
      const blocked =
        (modifier && ["c", "v", "x", "u", "p", "s"].includes(key)) ||
        (modifier && event.shiftKey && ["i", "j"].includes(key)) ||
        (event.altKey && key === "tab") ||
        key === "f12" ||
        key === "printscreen";

      if (blocked) {
        event.preventDefault();
        recordViolation();
      }
    };

    const blockClipboard = (event: ClipboardEvent) => {
      if (event.clipboardData) {
        event.preventDefault();
        recordViolation();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockSelection);
    document.addEventListener("selectstart", blockSelection);
    document.addEventListener("copy", blockClipboard);
    document.addEventListener("cut", blockClipboard);
    document.addEventListener("paste", blockClipboard);
    document.addEventListener("keydown", blockKeyboardShortcuts);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockSelection);
      document.removeEventListener("selectstart", blockSelection);
      document.removeEventListener("copy", blockClipboard);
      document.removeEventListener("cut", blockClipboard);
      document.removeEventListener("paste", blockClipboard);
      document.removeEventListener("keydown", blockKeyboardShortcuts);
    };
  }, [active, nativeMode, recordViolation, submitted]);

  useEffect(() => {
    if (!active) setDialogOpen(false);
  }, [active]);

  useEffect(() => {
    if (!active && submitted && !nativeMode && document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }
  }, [active, nativeMode, submitted]);

  const resetSecurity = useCallback(() => {
    violationRef.current = 0;
    autoSubmittedRef.current = false;
    lastViolationAtRef.current = 0;
    violationQueueRef.current = Promise.resolve();
    setViolations(0);
    setDialogOpen(false);
    setFullscreenWarning("");
    setIsFullscreen(nativeMode || Boolean(document.fullscreenElement));
  }, [nativeMode]);

  const returnToExam = useCallback(async () => {
    setDialogOpen(false);
    await requestExamFullscreen();
  }, [requestExamFullscreen]);

  const blockQuestionInteraction = useCallback((event: SyntheticEvent) => {
    event.preventDefault();
  }, []);

  return {
    copy,
    dialogOpen,
    fullscreenWarning,
    isFullscreen,
    nativeMode,
    violations,
    blockQuestionInteraction,
    requestExamFullscreen,
    resetSecurity,
    returnToExam,
  };
};

type SecureExamBadgeProps = {
  active: boolean;
  isFullscreen: boolean;
  nativeMode: boolean;
  violations: number;
};

export const SecureExamBadge = ({ active, isFullscreen, nativeMode, violations }: SecureExamBadgeProps) => {
  const { language } = useLanguage();
  const copy = SECURE_EXAM_COPY[language];
  if (!active) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold ${
        isFullscreen || nativeMode
          ? "border-emerald-300/40 bg-emerald-500/15 text-emerald-200"
          : "border-amber-300/40 bg-amber-500/15 text-amber-200"
      }`}
      title={nativeMode ? copy.nativeBadge : copy.badge}
    >
      {isFullscreen || nativeMode ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
      <span>{nativeMode ? copy.nativeBadge : copy.badge}</span>
      {violations > 0 && <span className="opacity-80">· {violations}/3</span>}
    </div>
  );
};

type SecureExamDialogProps = {
  open: boolean;
  violations: number;
  copy: SecureExamLanguageCopy;
  onReturn: () => void;
  onOpenChange: (open: boolean) => void;
};

export const SecureExamDialog = ({ open, violations, copy, onReturn, onOpenChange }: SecureExamDialogProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogContent className="border-amber-300/35 bg-background text-foreground">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2 text-amber-500">
          <ShieldAlert className="h-5 w-5" />
          {copy.violationTitle}
        </AlertDialogTitle>
        <AlertDialogDescription className="leading-6 text-muted-foreground">
          {copy.violationDescription(violations)}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction onClick={onReturn}>{copy.returnToExam}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);