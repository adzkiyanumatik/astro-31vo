import { useState } from "react";
import { GoogleSignInButton } from "@/components/tka/GoogleSignInButton";
import type { Language } from "@/contexts/LanguageContext";

type Props = {
  language: Language;
  packageNumber: 1 | 2;
  onVerified: (preAuthToken: string) => void;
};

const translations = {
  id: {
    heading: "Verifikasi email dua langkah",
    instruction: "Masuk dengan Google, lalu masukkan kode sekali pakai yang dikirim ke email terverifikasi.",
    sendCode: "Kirim kode OTP",
    codeLabel: "Kode OTP 6 digit",
    verify: "Verifikasi kode",
    sent: "Kode OTP dikirim. Kode berlaku 10 menit.",
    verified: "Email dan kode OTP berhasil diverifikasi.",
    sending: "Mengirim kode...",
    verifying: "Memeriksa kode...",
    generic: "Verifikasi gagal. Silakan coba lagi.",
    authRequired: "Masuk dengan Google sebelum meminta kode.",
    authInvalid: "Login Google kedaluwarsa atau tidak valid. Silakan masuk kembali.",
    duplicate: "Akun ini sudah pernah memulai atau mengumpulkan try out ini.",
    rateLimit: "Terlalu banyak permintaan. Tunggu sebelum meminta kode baru.",
    otpInvalid: "Kode OTP salah. Periksa kembali kode di email.",
    otpExpired: "Kode OTP kedaluwarsa atau tidak valid. Minta kode baru.",
    otpAttempts: "Batas percobaan kode tercapai. Minta kode baru.",
    deliveryFailed: "Kode belum berhasil dikirim. Silakan coba lagi nanti.",
  },
  en: {
    heading: "Two-step email verification",
    instruction: "Sign in with Google, then enter the one-time code sent to your verified email.",
    sendCode: "Send OTP code",
    codeLabel: "6-digit OTP code",
    verify: "Verify code",
    sent: "OTP sent. The code expires in 10 minutes.",
    verified: "Email and OTP successfully verified.",
    sending: "Sending code...",
    verifying: "Verifying code...",
    generic: "Verification failed. Please try again.",
    authRequired: "Sign in with Google before requesting a code.",
    authInvalid: "Google sign-in expired or is invalid. Please sign in again.",
    duplicate: "This account has already started or submitted this try out.",
    rateLimit: "Too many requests. Wait before requesting another code.",
    otpInvalid: "The OTP is incorrect. Check the code in your email.",
    otpExpired: "The OTP expired or is invalid. Request a new code.",
    otpAttempts: "The code attempt limit was reached. Request a new code.",
    deliveryFailed: "The code could not be sent. Please try again later.",
  },
  ja: {
    heading: "メールによる二段階認証",
    instruction: "Googleでログインし、認証済みメールに届いたワンタイムコードを入力してください。",
    sendCode: "OTPコードを送信",
    codeLabel: "6桁のOTPコード",
    verify: "コードを認証",
    sent: "OTPを送信しました。コードの有効期限は10分です。",
    verified: "メールとOTPの認証が完了しました。",
    sending: "コードを送信中...",
    verifying: "コードを確認中...",
    generic: "認証に失敗しました。もう一度お試しください。",
    authRequired: "コードをリクエストする前にGoogleでログインしてください。",
    authInvalid: "Googleログインの期限が切れているか無効です。再度ログインしてください。",
    duplicate: "このアカウントでは試験を開始または提出済みです。",
    rateLimit: "リクエストが多すぎます。時間をおいて再度お試しください。",
    otpInvalid: "OTPが正しくありません。メールのコードを確認してください。",
    otpExpired: "OTPの期限が切れているか無効です。新しいコードをリクエストしてください。",
    otpAttempts: "コードの試行回数上限に達しました。新しいコードをリクエストしてください。",
    deliveryFailed: "コードを送信できませんでした。後でもう一度お試しください。",
  },
} satisfies Record<Language, Record<string, string>>;

const errorMessage = (code: unknown, copy: (typeof translations)[Language]) => {
  switch (code) {
    case "GOOGLE_AUTH_REQUIRED":
      return copy.authRequired;
    case "GOOGLE_AUTH_INVALID":
      return copy.authInvalid;
    case "DUPLICATE_SUBMISSION":
      return copy.duplicate;
    case "OTP_RATE_LIMIT":
      return copy.rateLimit;
    case "OTP_INVALID":
      return copy.otpInvalid;
    case "OTP_EXPIRED":
      return copy.otpExpired;
    case "OTP_ATTEMPTS_EXCEEDED":
      return copy.otpAttempts;
    case "OTP_DELIVERY_FAILED":
      return copy.deliveryFailed;
    default:
      return copy.generic;
  }
};

const TkaOtpVerification = ({ language, packageNumber, onVerified }: Props) => {
  const copy = translations[language];
  const [idToken, setIdToken] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const requestCode = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/tka/tryout/${packageNumber}/otp/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        challengeId?: string;
        code?: string;
      };
      if (!response.ok || !data.challengeId) {
        if (response.status === 401) setIdToken("");
        throw new Error(data.code ?? "OTP_DELIVERY_FAILED");
      }
      setChallengeId(data.challengeId);
      setSent(true);
    } catch (requestError) {
      setError(
        errorMessage(
          requestError instanceof Error ? requestError.message : undefined,
          copy,
        ),
      );
    } finally {
      setBusy(false);
    }
  };

  const verifyCode = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/tka/tryout/${packageNumber}/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, challengeId, code }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        preAuthToken?: string;
        code?: string;
      };
      if (!response.ok || !data.preAuthToken) {
        if (response.status === 401) setIdToken("");
        throw new Error(data.code ?? "OTP_INVALID");
      }
      setVerified(true);
      onVerified(data.preAuthToken);
    } catch (verificationError) {
      setError(
        errorMessage(
          verificationError instanceof Error ? verificationError.message : undefined,
          copy,
        ),
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-5 space-y-3">
      <div>
        <p className="text-xs font-bold text-cyan-100/85">{copy.heading}</p>
        <p className="mt-1 text-[11px] leading-5 text-white/45">{copy.instruction}</p>
      </div>
      <GoogleSignInButton
        language={language}
        signedIn={Boolean(idToken)}
        onCredential={(credential) => {
          setIdToken(credential);
          setChallengeId("");
          setSent(false);
          setVerified(false);
          setError("");
        }}
        onError={() => setError(copy.generic)}
      />
      {idToken && !verified && (
        <button
          type="button"
          onClick={() => void requestCode()}
          disabled={busy}
          className="w-full rounded-xl border border-cyan-300/30 bg-cyan-400/10 px-4 py-3 text-sm font-bold text-cyan-100 transition hover:bg-cyan-400/20 disabled:opacity-50"
        >
          {busy ? copy.sending : copy.sendCode}
        </button>
      )}
      {sent && !verified && (
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-xs text-emerald-200">{copy.sent}</p>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold text-cyan-100/80">{copy.codeLabel}</span>
            <input
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-center font-mono text-lg tracking-[0.4em] text-white outline-none focus:border-cyan-300/60"
            />
          </label>
          <button
            type="button"
            onClick={() => void verifyCode()}
            disabled={busy || code.length !== 6}
            className="w-full rounded-xl border border-emerald-300/35 bg-emerald-500/15 px-4 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-500/25 disabled:opacity-50"
          >
            {busy ? copy.verifying : copy.verify}
          </button>
        </div>
      )}
      {verified && <p className="text-xs font-semibold text-emerald-200">{copy.verified}</p>}
      {error && <p role="alert" className="text-xs font-semibold text-rose-300">{error}</p>}
    </div>
  );
};

export default TkaOtpVerification;
