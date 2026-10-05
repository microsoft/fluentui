export type FeatureKey =
  | 'popover'
  | 'dialog'
  | 'anchor-positioning'
  | 'anchor-name'
  | 'position-area'
  | 'position-try-fallbacks'
  | 'anchor-center'
  | 'focusgroup';

export type ConceptKey = 'popover' | 'dialog' | 'anchor-positioning' | 'focusgroup';

export type Baseline = 'high' | 'low' | false;

export interface FeatureSupport {
  key: FeatureKey;
  name: string;
  baseline: Baseline;
  baselineLowDate: string | null;
  baselineHighDate: string | null;
  partial: boolean;
  representativeBaseline: Baseline | null;
  representativeBaselineLowDate: string | null;
  support: Record<string, string | null>;
}

export interface BrowserSupportFile {
  generatedFrom: string;
  browsers: string[];
  features: Record<FeatureKey, FeatureSupport>;
}

export interface FeatureDetail {
  referenceUrl: string;
  usage: string;
  fallback: string;
}

export type AvailabilityLevel = 'widely' | 'newly' | 'limited';
