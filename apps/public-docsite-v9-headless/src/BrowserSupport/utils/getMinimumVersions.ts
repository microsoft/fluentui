import { browsers, features, MATRIX_ORDER } from '../constants';
import type { FeatureKey } from '../types';

/** Features that ship natively in at least one browser and gate "works by default". */
const NATIVE_FEATURES: FeatureKey[] = MATRIX_ORDER;

/** Compare dotted numeric versions (e.g. "15.4" vs "116"). Returns >0 if a > b. */
export function compareVersions(a: string, b: string): number {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  const len = Math.max(pa.length, pb.length);
  for (let i = 0; i < len; i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) {
      return diff;
    }
  }
  return 0;
}

/**
 * Per browser, the minimum version where every natively-shipping feature is supported —
 * i.e. the MAX of each feature's minimum supporting version. Features that never shipped in a
 * browser (e.g. focusgroup, unsupported everywhere) are excluded from that browser's floor and
 * surfaced separately as an "always needs a polyfill" caveat in the docs. A browser whose
 * considered features are all unsupported yields `null`.
 */
export function getMinimumVersions(): Record<string, string | null> {
  const result: Record<string, string | null> = {};

  for (const browser of browsers) {
    let max: string | null = null;

    for (const key of NATIVE_FEATURES) {
      const version = features[key].support[browser];
      if (version == null) {
        // Feature never shipped in this browser — exclude it from the "by default" floor.
        continue;
      }
      if (max === null || compareVersions(version, max) > 0) {
        max = version;
      }
    }

    result[browser] = max;
  }

  return result;
}
