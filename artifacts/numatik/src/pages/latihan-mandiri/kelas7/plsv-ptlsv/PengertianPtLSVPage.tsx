import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import Starfield from "@/components/Starfield";
import PageNavigation from "@/components/PageNavigation";
import { playPopSound } from "@/hooks/useAudio";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const SubLabel = ({ letter, color }: { letter: string; color: string }) => (
  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold shrink-0 ${color}`}>
    {letter}
  </span>
);

const Tag = ({ label, color }: { label: string; color: string }) => (
  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border font-body uppercase tracking-wider ${color}`}>
    {label}
  </span>
);

const M = ({ math }: { math: string }) => (
  <span className="inline-block"><InlineMath math={math} /></span>
);

const DashedLine = ({ color = "border-red-400/20" }: { color?: string }) => (
  <span className={`inline-block w-20 border-b ${color} align-middle mx-1`} />
);

/* ══════════════════════════════════════════════════════════
   SOAL 1 – Mudah: Baca simbol ketidaksamaan
══════════════════════════════════════════════════════════ */
const NumberLineExample = () => (
  <svg
    role="img"
    aria-label="Daerah penyelesaian x kurang dari 5, diarsir ke kiri dari lingkaran terbuka di 5"
    viewBox="0 0 180 52"
    className="w-40 h-12"
  >
    <line x1="20" y1="20" x2="98" y2="20" stroke="#fb7185" strokeWidth="6" />
    <polygon points="12,20 24,13 24,27" fill="#fb7185" />
    <line x1="110" y1="20" x2="160" y2="20" stroke="#ffffff80" strokeWidth="1.5" />
    {[43, 79, 103, 127].map((x) => (
      <line key={x} x1={x} y1="16" x2={x} y2="24" stroke="#ffffff80" strokeWidth="1" />
    ))}
    <circle cx="103" cy="20" r="5" fill="none" stroke="#fb7185" strokeWidth="2" />
    <circle cx="79" cy="20" r="3.5" fill="#facc15" />
    <text x="103" y="39" textAnchor="middle" fill="#ffffffb3" fontSize="10">5</text>
  </svg>
);

const Soal1 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q1.instruction"
          components={{ a: <span className="text-red-300 font-semibold" /> }}
        />
      </p>
      <div className="overflow-x-auto rounded-xl border border-red-500/20">
        <table className="w-full text-xs font-body">
          <thead>
            <tr className="bg-red-500/20">
              <th className="px-3 py-2 text-red-300 font-bold text-left">{t('practice.plsvPtlsv.pengertianPtLSV.q1.thSimbol')}</th>
              <th className="px-3 py-2 text-red-300 font-bold text-left">{t('practice.plsvPtlsv.pengertianPtLSV.q1.thDibaca')}</th>
              <th className="min-w-[180px] px-3 py-2 text-red-300 font-bold text-center text-[10px] leading-tight">
                Daerah Penyelesaian dalam garis bilangan
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "a", simbol: "x < 5" },
              { label: "b", simbol: "x > -2" },
              { label: "c", simbol: "x \\leq 8" },
              { label: "d", simbol: "x \\geq 1" },
              { label: "e", simbol: "-3 < x < 7" },
            ].map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-red-500/5" : "bg-transparent"}>
                <td className="px-3 py-2.5 text-white/90 font-mono">
                  <div className="flex items-center gap-2">
                    <SubLabel letter={r.label} color="bg-red-500/20 text-red-300 border border-red-400/30" />
                    <M math={r.simbol} />
                  </div>
                </td>
                <td className="px-3 py-2.5">
                  <div className="h-5 border-b border-dashed border-red-400/25 min-w-[140px]" />
                </td>
                <td className="px-3 py-2.5">
                  {r.label === "a" ? (
                    <div className="text-white/85">
                      <NumberLineExample />
                    </div>
                  ) : (
                    <div className="h-5 border-b border-dashed border-red-400/25 min-w-[80px]" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 2 – Mudah: Benar atau Salah
══════════════════════════════════════════════════════════ */
const Soal2 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q2.instruction"
          components={{
            b: <span className="text-green-300 font-semibold" />,
            s: <span className="text-rose-300 font-semibold" />,
          }}
        />
      </p>
      <div className="space-y-2 pl-1">
        {[
          { l: "a", expr: "7 > 4" },
          { l: "b", expr: "-3 < -1" },
          { l: "c", expr: "5 \\geq 5" },
          { l: "d", expr: "0 > 2" },
          { l: "e", expr: "-5 \\geq -3" },
          { l: "f", expr: "\\frac{1}{2} < 0{,}6" },
          { l: "g", expr: "|-4| > |3|" },
          { l: "h", expr: "0{,}25 \\leq \\frac{1}{4}" },
        ].map(({ l, expr }) => (
          <div key={l} className="flex items-center gap-2.5 bg-rose-500/5 border border-rose-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={l} color="bg-rose-500/20 text-rose-300 border border-rose-400/30" />
            <span className="flex-1"><M math={expr} /></span>
            <span className="text-white/20 text-[11px] font-body shrink-0">{t('practice.plsvPtlsv.pengertianPtLSV.q2.benarSalah')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 3 – Mudah: Isi simbol yang tepat
══════════════════════════════════════════════════════════ */
const Soal3 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q3.instruction"
          components={{
            box: <span className="text-amber-300 font-semibold" />,
            m1: <M math="<,\ >,\ \leq," />,
            m2: <M math="\geq" />,
          }}
        />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
        {[
          { l: "a", left: "9", right: "12" },
          { l: "b", left: "-6", right: "-2" },
          { l: "c", left: "\\frac{3}{4}", right: "\\frac{2}{3}" },
          { l: "d", left: "0{,}5", right: "\\frac{1}{2}" },
          { l: "e", left: "(-3)^2", right: "3^2" },
          { l: "f", left: "|-7|", right: "|5|" },
          { l: "g", left: "\\sqrt{16}", right: "3{,}9" },
          { l: "h", left: "2^3", right: "3^2" },
        ].map(({ l, left, right }) => (
          <div key={l} className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={l} color="bg-amber-500/20 text-amber-300 border border-amber-400/30" />
            <M math={left} />
            <span className="mx-2 w-8 h-7 border-2 border-dashed border-amber-400/40 rounded flex items-center justify-center text-amber-400/40 text-lg">□</span>
            <M math={right} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 4 – Mudah: Manakah PtLSV?
══════════════════════════════════════════════════════════ */
const Soal4 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q4.instruction"
          components={{ a: <span className="text-orange-300 font-semibold" /> }}
        />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1">
        {[
          { l: "a", expr: "x + 3 > 7" },
          { l: "b", expr: "2x - 5 \\leq 9" },
          { l: "c", expr: "3x + 2y < 8" },
          { l: "d", expr: "x^2 - 1 > 0" },
          { l: "e", expr: "\\frac{n}{4} \\geq -2" },
          { l: "f", expr: "5 - 2m < 3m + 1" },
          { l: "g", expr: "pq > 12" },
          { l: "h", expr: "4 > 1" },
          { l: "i", expr: "\\frac{1}{x} < 3" },
          { l: "j", expr: "-7 + k \\geq 0" },
        ].map(({ l, expr }) => (
          <div key={l} className="flex items-center gap-2.5 bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-2.5">
            <SubLabel letter={l} color="bg-orange-500/20 text-orange-300 border border-orange-400/30" />
            <M math={expr} />
          </div>
        ))}
      </div>
      <p className="text-white/40 text-[11px] font-body pl-1 italic">{t('practice.plsvPtlsv.pengertianPtLSV.q4.hint')}</p>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 5 – Mudah: Tulis dengan simbol
══════════════════════════════════════════════════════════ */
const Soal5 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q5.instruction"
          components={{ a: <span className="text-yellow-300 font-semibold" /> }}
        />
      </p>
      <div className="space-y-2 pl-1">
        {(["a", "b", "c", "d", "e", "f"] as const).map((l) => (
          <div key={l} className="bg-yellow-500/5 border border-yellow-500/10 rounded-lg px-4 py-3">
            <div className="flex gap-2 items-start">
              <SubLabel letter={l} color="bg-yellow-500/20 text-yellow-300 border border-yellow-400/30" />
              <p className="font-body text-sm text-white/85 flex-1">{t(`practice.plsvPtlsv.pengertianPtLSV.q5.${l}`)}</p>
            </div>
            <div className="mt-2 ml-7 h-5 border-b border-dashed border-yellow-400/25 w-40" />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 6 – Sedang: Substitusi – apakah memenuhi?
══════════════════════════════════════════════════════════ */
const Soal6 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q6.instruction"
          components={{
            a: <span className="text-teal-300 font-semibold" />,
            b: <span className="text-rose-300 font-semibold" />,
          }}
        />
      </p>
      <div className="overflow-x-auto rounded-xl border border-teal-500/20">
        <table className="w-full text-xs font-body">
          <thead>
            <tr className="bg-teal-500/20">
              <th className="px-2 py-2 text-teal-300 font-bold text-left w-6"> </th>
              <th className="px-3 py-2 text-teal-300 font-bold text-left">{t('practice.plsvPtlsv.pengertianPtLSV.q6.thPtLSV')}</th>
              <th className="px-3 py-2 text-teal-300 font-bold text-left">{t('practice.plsvPtlsv.pengertianPtLSV.q6.thNilai')}</th>
              <th className="px-3 py-2 text-teal-300 font-bold text-left">{t('practice.plsvPtlsv.pengertianPtLSV.q6.thMemenuhi')}</th>
            </tr>
          </thead>
          <tbody>
            {[
              { l: "a", ptlsv: "x + 4 > 9", nilai: "x = 5" },
              { l: "b", ptlsv: "3n - 2 \\leq 10", nilai: "n = 4" },
              { l: "c", ptlsv: "2m + 1 < 7", nilai: "m = 3" },
              { l: "d", ptlsv: "\\frac{y}{3} \\geq 2", nilai: "y = 6" },
              { l: "e", ptlsv: "5 - k > 2", nilai: "k = 4" },
              { l: "f", ptlsv: "-2p < 8", nilai: "p = -5" },
            ].map((r, i) => (
              <tr key={r.l} className={i % 2 === 0 ? "bg-teal-500/5" : "bg-transparent"}>
                <td className="px-2 py-2.5 text-teal-400 font-bold">{r.l}.</td>
                <td className="px-3 py-2.5 text-white/85"><M math={r.ptlsv} /></td>
                <td className="px-3 py-2.5 text-white/70"><M math={r.nilai} /></td>
                <td className="px-3 py-2.5">
                  <div className="h-5 border-b border-dashed border-teal-400/25 min-w-[80px]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 7 – Sedang: Notasi himpunan penyelesaian
══════════════════════════════════════════════════════════ */
const Soal7 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q7.instruction"
          components={{
            z: <M math="x \in \mathbb{Z}" />,
            hp: <span className="text-purple-300 font-semibold" />,
          }}
        />
      </p>
      <div className="space-y-2 pl-1">
        {[
          { l: "a", expr: "x < 4" },
          { l: "b", expr: "x \\geq -3" },
          { l: "c", expr: "x \\leq 0" },
          { l: "d", expr: "-2 \\leq x < 3" },
          { l: "e", expr: "x > -5" },
          { l: "f", expr: "1 < x \\leq 6" },
        ].map(({ l, expr }) => (
          <div key={l} className="bg-purple-500/5 border border-purple-500/10 rounded-lg px-4 py-3">
            <div className="flex gap-2 items-center mb-2">
              <SubLabel letter={l} color="bg-purple-500/20 text-purple-300 border border-purple-400/30" />
              <M math={expr} />
            </div>
            <div className="ml-7 space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-white/40 font-body">
                <span>{t('practice.plsvPtlsv.pengertianPtLSV.q7.hp')}</span>
                <div className="h-5 border-b border-dashed border-purple-400/25 flex-1" />
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/40 font-body">
                <span>{t('practice.plsvPtlsv.pengertianPtLSV.q7.garisLabel')}</span>
                <div className="flex-1 border-b border-white/10 relative h-5">
                  <div className="absolute inset-0 border-b border-dashed border-purple-400/20" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 8 – Sedang: Buat model PtLSV
══════════════════════════════════════════════════════════ */
const Soal8 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q8.instruction"
          components={{ a: <span className="text-sky-300 font-semibold" /> }}
        />
      </p>
      <div className="space-y-2 pl-1">
        {(["a", "b", "c", "d", "e"] as const).map((l) => (
          <div key={l} className="bg-sky-500/5 border border-sky-500/10 rounded-lg px-4 py-3">
            <div className="flex gap-2 items-start mb-2">
              <SubLabel letter={l} color="bg-sky-500/20 text-sky-300 border border-sky-400/30" />
              <p className="font-body text-sm text-white/85 flex-1">{t(`practice.plsvPtlsv.pengertianPtLSV.q8.${l}`)}</p>
            </div>
            <div className="ml-7 flex items-center gap-2">
              <span className="text-[11px] text-white/40 font-body">{t('practice.plsvPtlsv.pengertianPtLSV.q8.modelLabel')}</span>
              <div className="h-5 border-b border-dashed border-sky-400/25 flex-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 9 – Sedang: Pasangkan PtLSV dengan deskripsinya
══════════════════════════════════════════════════════════ */
const Soal9 = () => {
  const { t } = useTranslation();
  const rightCol = [
    { id: "P", key: "descP" },
    { id: "Q", key: "descQ" },
    { id: "R", key: "descR" },
    { id: "S", key: "descS" },
    { id: "T", key: "descT" },
  ] as const;
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q9.instruction"
          components={{ a: <span className="text-lime-300 font-semibold" /> }}
        />
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <p className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1">{t('practice.plsvPtlsv.pengertianPtLSV.q9.colPtLSV')}</p>
          {[
            { id: "1", expr: "x + 5 < 3" },
            { id: "2", expr: "2x \\geq 6" },
            { id: "3", expr: "x - 7 > -4" },
            { id: "4", expr: "3 - x \\leq 1" },
            { id: "5", expr: "\\frac{x}{2} < -1" },
          ].map(({ id, expr }) => (
            <div key={id} className="flex items-center gap-2 bg-lime-500/5 border border-lime-500/10 rounded-lg px-3 py-2.5">
              <span className="w-5 h-5 rounded-full bg-lime-500/20 text-lime-300 text-[10px] font-bold flex items-center justify-center shrink-0">{id}</span>
              <M math={expr} />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] text-white/40 font-body uppercase tracking-wider mb-1">{t('practice.plsvPtlsv.pengertianPtLSV.q9.colDesc')}</p>
          {rightCol.map(({ id, key }) => (
            <div key={id} className="flex items-center gap-2 bg-lime-500/5 border border-lime-500/10 rounded-lg px-3 py-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center justify-center shrink-0">{id}</span>
              <span className="text-white/75 text-[11px] font-body">{t(`practice.plsvPtlsv.pengertianPtLSV.q9.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-lime-500/5 border border-lime-500/10 rounded-lg px-4 py-2.5 ml-1">
        <p className="text-[11px] text-white/40 font-body">{t('practice.plsvPtlsv.pengertianPtLSV.q9.jawabanLabel')} <DashedLine color="border-lime-400/20" /></p>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   SOAL 13 – Sulit: PtLSV dengan pecahan
══════════════════════════════════════════════════════════ */
const Soal13 = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <p className="font-body text-sm text-white/90 leading-relaxed">
        <Trans
          i18nKey="practice.plsvPtlsv.pengertianPtLSV.q13.instruction"
          components={{ a: <span className="text-fuchsia-300 font-semibold" /> }}
        />
      </p>
      <div className="space-y-3 pl-1">
        {[
          {
            l: "a",
            ptlsv: "\\frac{2x-1}{3} < 5",
            nilai: [{ v: "x = 8" }, { v: "x = 9" }],
          },
          {
            l: "b",
            ptlsv: "\\frac{3n+2}{4} \\geq 5",
            nilai: [{ v: "n = 6" }, { v: "n = 5" }],
          },
          {
            l: "c",
            ptlsv: "2 - \\frac{m}{5} > 0",
            nilai: [{ v: "m = 9" }, { v: "m = 11" }],
          },
        ].map(({ l, ptlsv, nilai }) => (
          <div key={l} className="bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-xl px-4 py-3">
            <div className="flex gap-2 items-center mb-3">
              <SubLabel letter={l} color="bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/30" />
              <M math={ptlsv} />
            </div>
            <div className="ml-7 grid grid-cols-2 gap-2">
              {nilai.map(({ v }, idx) => (
                <div key={idx} className="bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-lg px-3 py-2">
                  <p className="text-[11px] text-white/60 font-body mb-1"><M math={v} /></p>
                  <div className="h-5 border-b border-dashed border-fuchsia-400/20 w-full" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


/* ══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════ */
const PengertianPtLSVPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const cards = [
    {
      num: 1, tag: t('practice.plsvPtlsv.pengertianPtLSV.tags.mudah'), tagColor: "bg-red-500/20 text-red-300 border-red-400/40",
      gradient: "from-red-900/50 to-rose-900/30", border: "border-red-500/25",
      bar: "from-red-400 to-rose-500", numBg: "bg-red-500/30 text-red-200",
      subtitle: t('practice.plsvPtlsv.pengertianPtLSV.tags.c1'),
      custom: <Soal1 />,
    },
    {
      num: 2, tag: t('practice.plsvPtlsv.pengertianPtLSV.tags.mudah'), tagColor: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      gradient: "from-amber-900/50 to-yellow-900/30", border: "border-amber-500/25",
      bar: "from-amber-400 to-yellow-500", numBg: "bg-amber-500/30 text-amber-200",
      subtitle: t('practice.plsvPtlsv.pengertianPtLSV.tags.c3'),
      custom: <Soal3 />,
    },
    {
      num: 3, tag: t('practice.plsvPtlsv.pengertianPtLSV.tags.mudah'), tagColor: "bg-orange-500/20 text-orange-300 border-orange-400/40",
      gradient: "from-orange-900/50 to-amber-900/30", border: "border-orange-500/25",
      bar: "from-orange-400 to-amber-500", numBg: "bg-orange-500/30 text-orange-200",
      subtitle: t('practice.plsvPtlsv.pengertianPtLSV.tags.c4'),
      custom: <Soal4 />,
    },
    {
      num: 4, tag: t('practice.plsvPtlsv.pengertianPtLSV.tags.sedang'), tagColor: "bg-teal-500/20 text-teal-300 border-teal-400/40",
      gradient: "from-teal-900/50 to-cyan-900/30", border: "border-teal-500/25",
      bar: "from-teal-400 to-cyan-500", numBg: "bg-teal-500/30 text-teal-200",
      subtitle: t('practice.plsvPtlsv.pengertianPtLSV.tags.c6'),
      custom: <Soal6 />,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center gradient-space overflow-hidden plsv-ptlsv-practice-route">
      <Starfield />
      <PageNavigation />

      <div className="relative z-10 max-w-3xl w-full px-4 py-10">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/10 border border-red-400/30 flex items-center justify-center mb-4 shadow-lg">
            <span className="text-2xl">≤</span>
          </div>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(248,113,113,0.5)' }}
          >
            {t('practice.plsvPtlsv.pengertianPtLSV.title1')}
          </h1>
          <h1
            className="font-display text-xl md:text-2xl font-bold text-white text-center mb-1 leading-tight"
            style={{ textShadow: '0 0 32px rgba(248,113,113,0.5)' }}
          >
            {t('practice.plsvPtlsv.pengertianPtLSV.title2')}
          </h1>
          <p className="text-white/40 text-xs text-center font-body mt-2">Kelas 7 · PLSV & PtLSV · {t('practice.breadcrumb')}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-body">{t('practice.plsvPtlsv.pengertianPtLSV.badge')}</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-red-500/10 border border-red-400/20 text-red-400 font-body">✦ {t('practice.plsvPtlsv.pengertianPtLSV.tags.mudah')}</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/20 text-teal-400 font-body">✦ {t('practice.plsvPtlsv.pengertianPtLSV.tags.sedang')}</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-400 font-body">✦ {t('practice.plsvPtlsv.pengertianPtLSV.tags.sulit')}</span>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {cards.map((c, i) => (
            <div
              key={c.num}
              className="relative rounded-2xl overflow-hidden animate-slide-up"
              style={{ animationDelay: `${Math.min(i * 0.04, 0.5)}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} backdrop-blur`} />
              <div className={`absolute inset-0 border ${c.border} rounded-2xl`} />
              <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${c.bar} rounded-l-2xl`} />

              <div className="relative px-5 py-4 pl-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold font-body shrink-0 ${c.numBg}`}>
                    {c.num}
                  </span>
                  <Tag label={c.tag} color={c.tagColor} />
                </div>
                <p className="text-white/50 text-[11px] font-body mb-3 pl-8">{c.subtitle}</p>
                <div className="pl-1">
                  {c.custom}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-2">{t('practice.levelGuide')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-body">
            {[
              { col: "text-red-400", label: t('practice.plsvPtlsv.pengertianPtLSV.tags.mudah'), desc: t('practice.plsvPtlsv.pengertianPtLSV.legend.descMudah') },
              { col: "text-teal-400", label: t('practice.plsvPtlsv.pengertianPtLSV.tags.sedang'), desc: t('practice.plsvPtlsv.pengertianPtLSV.legend.descSedang') },
              { col: "text-violet-400", label: t('practice.plsvPtlsv.pengertianPtLSV.tags.sulit'), desc: t('practice.plsvPtlsv.pengertianPtLSV.legend.descSulit') },
            ].map(({ col, label, desc }) => (
              <div key={label} className="flex gap-1.5 items-start">
                <span className={`font-bold ${col} shrink-0`}>✦</span>
                <span className="text-white/50"><span className={`${col} font-bold`}>{label}:</span>{' '}{desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back */}
        <div className="mt-8 text-center">
          <button
            onClick={() => { playPopSound(); navigate("/latihan-mandiri/kelas-7/plsv-ptlsv"); }}
            className="text-sm text-white/30 hover:text-red-400 transition-colors cursor-pointer font-body"
          >
            {t('practice.backTo')} PLSV & PtLSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengertianPtLSVPage;
