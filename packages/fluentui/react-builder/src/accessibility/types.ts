export type AccessibilityError = {
  elementUuid: string | number;
  source: string;
  error: string;
  help?: string;
  url?: string;
  severity?: string;
};
