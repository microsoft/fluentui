import { BROWSER_LABELS, FEATURE_LABELS, features } from './constants';
import type { AvailabilityLevel, FeatureKey } from './types';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AVAILABILITY_LABELS: Record<AvailabilityLevel, string> = {
  widely: 'Widely available',
  newly: 'Newly available',
  limited: 'Limited availability',
};

export interface BaselineStatus {
  level: AvailabilityLevel;
  availabilityLabel: string;
  detailLabel: string;
}

export function browserLabel(id: string): string {
  return BROWSER_LABELS[id] ?? id;
}

export function featureLabel(key: FeatureKey): string {
  return FEATURE_LABELS[key];
}

export function getBaselineStatus(key: FeatureKey): BaselineStatus {
  const feature = features[key];

  if (key === 'focusgroup') {
    return {
      level: 'limited',
      availabilityLabel: AVAILABILITY_LABELS.limited,
      detailLabel: 'Polyfilled (Microsoft focusgroup polyfill)',
    };
  }

  if (feature.baseline === 'high') {
    return {
      level: 'widely',
      availabilityLabel: AVAILABILITY_LABELS.widely,
      detailLabel: `Baseline · Widely available (since ${formatYear(feature.baselineHighDate)})`,
    };
  }

  if (feature.baseline === 'low') {
    return {
      level: 'newly',
      availabilityLabel: AVAILABILITY_LABELS.newly,
      detailLabel: `Baseline · Newly available (since ${formatMonthYear(feature.baselineLowDate)})`,
    };
  }

  const detailLabel =
    feature.partial && feature.representativeBaselineLowDate
      ? `Limited availability (since ${formatMonthYear(feature.representativeBaselineLowDate)})`
      : 'Limited availability · not yet Baseline';

  return {
    level: 'limited',
    availabilityLabel: AVAILABILITY_LABELS.limited,
    detailLabel,
  };
}

function formatMonthYear(date: string | null): string {
  if (!date) {
    return '';
  }

  const [year, month] = date.split('-');
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

function formatYear(date: string | null): string {
  return date ? date.split('-')[0] : '';
}
