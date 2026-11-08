import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const M = ({ math }: { math: string }) => (
  <span className="inline-block"><InlineMath math={math} /></span>
);
const Tag = ({ label, color }: { label: string; color: string }) => (
  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border font-body uppercase tracking-wider ${color}`}>
    {label}
  </span>
);
const NumBadge = ({ n, color }: { n: string; color: string }) => (
  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold shrink-0 font-body ${color}`}>{n}</span>
);
const letterLabel = (index: number) => {
  let label = "";
  let current = index;
  while (current >= 0) {
    label = String.fromCharCode((current % 26) + 97) + label;
    current = Math.floor(current / 26) - 1;
  }
  return label;
};

const PFX = "practice.plsvPtlsv.modelMatematikaPtLSV";

/* ── Soal A: Membuat Model Pertidaksamaan ─────────────── */
const SoalA = ({ startIndex }: { startIndex: number }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      {/* Soal 2 */}
      <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2.5">
          <NumBadge n={letterLabel(startIndex)} color="bg-orange-500/30 text-orange-200 border border-orange-400/40" />
          <p className="font-body text-sm text-white/85 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.q2.text`}
              components={{ a: <span className="text-orange-300 font-semibold" /> }}
            />{" "}
            <span className="text-white/50 italic">
              {t(`${PFX}.q2.hintPre`)}<M math="p" />{t(`${PFX}.q2.hintPost`)}
            </span>
          </p>
        </div>
      </div>

      {/* Soal 3 */}
      <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2.5">
          <NumBadge n={letterLabel(startIndex + 1)} color="bg-orange-500/30 text-orange-200 border border-orange-400/40" />
          <p className="font-body text-sm text-white/85 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.q3.text`}
              components={{ a: <span className="text-orange-300 font-semibold" /> }}
            />{" "}
            <span className="text-white/50 italic">
              {t(`${PFX}.q3.hintPre`)}<M math="u" />{t(`${PFX}.q3.hintPost`)}
            </span>
          </p>
        </div>
      </div>

      {/* Soal 4 */}
      <div className="bg-orange-500/5 border border-orange-500/15 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2.5">
          <NumBadge n={letterLabel(startIndex + 2)} color="bg-orange-500/30 text-orange-200 border border-orange-400/40" />
          <p className="font-body text-sm text-white/85 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.q4.text`}
              components={{ a: <span className="text-orange-300 font-semibold" /> }}
            />{" "}
            <span className="text-white/50 italic">
              {t(`${PFX}.q4.hintPre`)}<M math="s" />{t(`${PFX}.q4.hintPost`)}
            </span>
          </p>
        </div>
      </div>

    </div>
  );
};

/* ── Soal B: Penerapan Lengkap ────────────────────────── */
const SoalB = ({ startIndex }: { startIndex: number }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      {/* Soal 9 */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2.5">
          <NumBadge n={letterLabel(startIndex)} color="bg-amber-500/25 text-amber-200 border border-amber-400/40" />
          <p className="font-body text-sm text-white/85 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.q9.text`}
              components={{ a: <span className="text-amber-300 font-semibold" /> }}
            />
          </p>
        </div>
      </div>

      {/* Soal 10 */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2.5">
          <NumBadge n={letterLabel(startIndex + 1)} color="bg-amber-500/25 text-amber-200 border border-amber-400/40" />
          <p className="font-body text-sm text-white/85 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.q10.text`}
              components={{ a: <span className="text-amber-300 font-semibold" /> }}
            />
          </p>
        </div>
      </div>

      {/* Soal 11 */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3 space-y-2">
        <div className="flex items-start gap-2.5">
          <NumBadge n={letterLabel(startIndex + 2)} color="bg-amber-500/25 text-amber-200 border border-amber-400/40" />
          <div className="space-y-2">
            <p className="font-body text-sm text-white/85 leading-relaxed">
              <Trans
                i18nKey={`${PFX}.q11.text`}
                components={{
                  a: <span className="text-amber-300 font-semibold" />,
                  m1: <M math="(3x + 4)" />,
                  m2: <M math="(x + 6)" />,
                }}
              />
            </p>
            <div className="flex flex-wrap gap-2 pl-1">
              {[
                { l: "a", tk: `${PFX}.q11.subA` },
                { l: "b", tk: `${PFX}.q11.subB` },
              ].map(({ l, tk }) => (
                <div key={l} className="flex items-start gap-2 bg-amber-500/10 border border-amber-400/20 rounded-lg px-3 py-2 w-full">
                  <span className="text-amber-400 font-bold text-xs mt-0.5 shrink-0">{l}.</span>
                  <span className="font-body text-xs text-white/70 leading-relaxed">{t(tk)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Soal 12 */}
      <div className="bg-amber-500/5 border border-amber-500/15 rounded-xl px-4 py-3">
        <div className="flex items-start gap-2.5">
          <NumBadge n={letterLabel(startIndex + 3)} color="bg-amber-500/25 text-amber-200 border border-amber-400/40" />
          <p className="font-body text-sm text-white/85 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.q12.text`}
              components={{ a: <span className="text-amber-300 font-semibold" /> }}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

/* ── Soal C: Model & Penerapan Lanjutan ───────────────── */
const SoalC = ({ part, startIndex }: { part: "model" | "application"; startIndex: number }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      {part === "model" && (
      <div className="space-y-4">

        {/* Soal 13 */}
        <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl px-4 py-3">
          <div className="flex items-start gap-2.5">
            <NumBadge n={letterLabel(startIndex)} color="bg-yellow-500/25 text-yellow-200 border border-yellow-400/40" />
            <p className="font-body text-sm text-white/85 leading-relaxed">
              <Trans
                i18nKey={`${PFX}.q13.text`}
                components={{ a: <span className="text-yellow-300 font-semibold" /> }}
              />{" "}
              <span className="text-white/50 italic">
                {t(`${PFX}.q13.hintPre`)}<M math="d" />{t(`${PFX}.q13.hintPost`)}
              </span>
            </p>
          </div>
        </div>

        {/* Soal 14 */}
        <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl px-4 py-3">
          <div className="flex items-start gap-2.5">
            <NumBadge n={letterLabel(startIndex + 1)} color="bg-yellow-500/25 text-yellow-200 border border-yellow-400/40" />
            <p className="font-body text-sm text-white/85 leading-relaxed">
              <Trans
                i18nKey={`${PFX}.q14.text`}
                components={{ a: <span className="text-yellow-300 font-semibold" /> }}
              />{" "}
              <span className="text-white/50 italic">
                {t(`${PFX}.q14.hintPre`)}<M math="r" />{t(`${PFX}.q14.hintPost`)}
              </span>
            </p>
          </div>
        </div>

        {/* Soal 16 */}
        <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl px-4 py-3">
          <div className="flex items-start gap-2.5">
            <NumBadge n={letterLabel(startIndex + 2)} color="bg-yellow-500/25 text-yellow-200 border border-yellow-400/40" />
            <p className="font-body text-sm text-white/85 leading-relaxed">
              <Trans
                i18nKey={`${PFX}.q16.text`}
                components={{ a: <span className="text-yellow-300 font-semibold" /> }}
              />{" "}
              <span className="text-white/50 italic">
                {t(`${PFX}.q16.hintPre`)}<M math="q" />{t(`${PFX}.q16.hintPost`)}
              </span>
            </p>
          </div>
        </div>

      </div>
      )}

      {part === "application" && (
      <div className="space-y-4">
        <div className="space-y-4">
          {/* Soal 18 */}
          <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl px-4 py-3 space-y-2">
            <div className="flex items-start gap-2.5">
              <NumBadge n={letterLabel(startIndex)} color="bg-yellow-500/25 text-yellow-200 border border-yellow-400/40" />
              <div className="space-y-2">
                <p className="font-body text-sm text-white/85 leading-relaxed">
                  <Trans
                    i18nKey={`${PFX}.q18.text`}
                    components={{
                      a: <span className="text-yellow-300 font-semibold" />,
                      m: <M math="3m" />,
                    }}
                  />
                </p>
                {[
                  { l: "a", tk: `${PFX}.q18.subA` },
                  { l: "b", tk: `${PFX}.q18.subB` },
                  { l: "c", tk: `${PFX}.q18.subC` },
                ].map(({ l, tk }) => (
                  <div key={l} className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-400/20 rounded-lg px-3 py-2">
                    <span className="text-yellow-400 font-bold text-xs mt-0.5 shrink-0">{l}.</span>
                    <span className="font-body text-xs text-white/70 leading-relaxed">{t(tk)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Soal 21 */}
          <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl px-4 py-3">
            <div className="flex items-start gap-2.5">
              <NumBadge n={letterLabel(startIndex + 1)} color="bg-yellow-500/25 text-yellow-200 border border-yellow-400/40" />
              <p className="font-body text-sm text-white/85 leading-relaxed">
                <Trans
                  i18nKey={`${PFX}.q21.text`}
                  components={{ a: <span className="text-yellow-300 font-semibold" /> }}
                />
              </p>
            </div>
          </div>

        </div>
      </div>
      )}
    </div>
  );
};

/* ── Page ─────────────────────────────────────────────── */
const ModelMatematikaPtLSVPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  /* ── Card config (inside component so t() is available) ── */
  const cards = [
    {
      num: 1, tag: t(`${PFX}.tags.soalA`),
      tagColor: "bg-orange-500/20 text-orange-300 border-orange-400/40",
      gradient: "from-orange-900/50 to-amber-900/30", border: "border-orange-500/25",
      bar: "from-orange-400 to-amber-500", numBg: "bg-orange-500/30 text-orange-200",
      custom: (
        <div className="space-y-4">
          <p className="font-body text-sm text-white/90 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.qA.instruction`}
              components={{ a: <span className="text-orange-300 font-semibold" /> }}
            />
          </p>
          <SoalA startIndex={0} />
          <SoalC part="model" startIndex={3} />
        </div>
      ),
    },
    {
      num: 2, tag: t(`${PFX}.tags.soalB`),
      tagColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      gradient: "from-amber-900/50 to-yellow-900/30", border: "border-amber-500/25",
      bar: "from-amber-400 to-yellow-500", numBg: "bg-amber-500/30 text-amber-200",
      custom: (
        <div className="space-y-4">
          <p className="font-body text-sm text-white/90 leading-relaxed">
            <Trans
              i18nKey={`${PFX}.qB.instruction`}
              components={{ a: <span className="text-amber-300 font-semibold" /> }}
            />
          </p>
          <SoalB startIndex={0} />
          <SoalC part="application" startIndex={4} />
        </div>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden plsv-ptlsv-practice-route">
      <Starfield />
      <PageNavigation />
      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-400/30 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl">📖</span>
          </div>
          <h1 className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(251,146,60,0.5)' }}>
            {t(`${PFX}.title1`)}
          </h1>
          <h1 className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(251,146,60,0.5)' }}>
            {t(`${PFX}.title2`)}
          </h1>
          <h1 className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(251,146,60,0.5)' }}>
            {t(`${PFX}.title3`)}
          </h1>
          <p className="text-white/40 text-xs text-center font-body mt-2">Kelas 7 · PLSV & PtLSV · {t('practice.breadcrumb')}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-body">{t(`${PFX}.badge`)}</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-orange-500/10 border border-orange-400/20 text-orange-400 font-body">✦ Kelas 7</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {cards.map((c, i) => (
            <div key={c.num} className="relative rounded-2xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} backdrop-blur`} />
              <div className={`absolute inset-0 border ${c.border} rounded-2xl`} />
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${c.bar} rounded-l-2xl`} />
              <div className="relative px-5 py-4 pl-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-body shrink-0 ${c.numBg}`}>{c.num}</span>
                  <Tag label={c.tag} color={c.tagColor} />
                </div>
                <div className="pl-1">{c.custom}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/plsv-ptlsv"); }}
            className="text-sm text-white/30 hover:text-orange-400 transition-colors cursor-pointer font-body">
            {t('practice.backTo')} PLSV & PtLSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModelMatematikaPtLSVPage;
