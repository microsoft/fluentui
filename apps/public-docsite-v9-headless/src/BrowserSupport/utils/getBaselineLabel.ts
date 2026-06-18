import type { FeatureSupport } from '../types';
import { formatMonthYear } from './formatMonthYear';
import { formatYear } from './formatYear';

export function getBaselineLabel(feature: FeatureSupport): string {
  if (feature.baseline === 'high') {
    return `Baseline · Widely available (since ${formatYear(feature.baselineHighDate)})`;
  }

  if (feature.baseline === 'low') {
    return `Baseline · Newly available (since ${formatMonthYear(feature.baselineLowDate)})`;
  }

  if (feature.partial && feature.representativeBaselineLowDate) {
    return `Limited availability (since ${formatMonthYear(feature.representativeBaselineLowDate)})`;
  }

  return 'Limited availability · not yet Baseline';
}
