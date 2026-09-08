import { browsers, features, MATRIX_ORDER } from './constants';
import type { FeatureKey } from './types';

const NATIVE_FEATURES: FeatureKey[] = MATRIX_ORDER;

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

export function getMinimumVersions(): Record<string, string | null> {
  const result: Record<string, string | null> = {};

  for (const browser of browsers) {
    let max: string | null = null;

    for (const key of NATIVE_FEATURES) {
      const version = features[key].support[browser];
      if (version === null || version === undefined) {
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
