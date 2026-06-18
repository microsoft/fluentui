import { FEATURE_LABELS } from '../constants';
import type { FeatureKey } from '../types';

export function featureLabel(key: FeatureKey): string {
  return FEATURE_LABELS[key];
}
