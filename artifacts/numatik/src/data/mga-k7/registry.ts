import type { Registry, SubmaterialEntry } from "./types";
import { ARITMETIKA_SOSIAL } from "./aritmetika-sosial";
import { GARIS_DAN_SUDUT } from "./garis-dan-sudut";
import { SEGITIGA_SEGIEMPAT } from "./segitiga-segiempat";
import { HIMPUNAN } from "./himpunan";
import { BILANGAN_RASIONAL } from "./bilangan-rasional";
import { ALJABAR } from "./aljabar";
import { PLSV_PTLSV } from "./plsv-ptlsv";
import { PERBANDINGAN } from "./perbandingan";
import { BILANGAN_BULAT } from "./bilangan-bulat";

const ALL_ENTRIES: SubmaterialEntry[] = [
  ...BILANGAN_BULAT,
  ...ARITMETIKA_SOSIAL,
  ...GARIS_DAN_SUDUT,
  ...SEGITIGA_SEGIEMPAT,
  ...HIMPUNAN,
  ...BILANGAN_RASIONAL,
  ...ALJABAR,
  ...PLSV_PTLSV,
  ...PERBANDINGAN,
];

export const REGISTRY: Registry = Object.fromEntries(
  ALL_ENTRIES.map((e) => [`${e.parentSlug}/${e.slug}`, e]),
);

export const getSubmaterial = (parentSlug: string, slug: string) =>
  REGISTRY[`${parentSlug}/${slug}`];
