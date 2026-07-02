import { FEATURE_DETAILS, features } from '../constants';
import type { FeatureKey } from '../types';
import { getBaselineLabel } from './getBaselineLabel';

export function getStatusLabel(key: FeatureKey): string {
  const polyfill = (FEATURE_DETAILS as Record<string, { polyfill?: string }>)[key]?.polyfill;

  if (polyfill) {
    return `Polyfilled (${polyfill})`;
  }

  return getBaselineLabel(features[key]);
}
