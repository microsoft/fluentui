// axe-core severity levels
type errorSeverity = 'critical' | 'serious' | 'moderate' | 'minor';

export type AccessibilityError = {
  elementUuid: string;
  source: string;
  message: string;
  severity?: errorSeverity;
};
