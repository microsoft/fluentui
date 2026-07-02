import type { AvailabilityLevel, FeatureSupport } from '../types';

export function getAvailabilityLevel(feature: FeatureSupport): AvailabilityLevel {
  if (feature.baseline === 'high') {
    return 'widely';
  }

  if (feature.baseline === 'low') {
    return 'newly';
  }

  return 'limited';
}
