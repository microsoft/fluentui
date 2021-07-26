/* enum ErrorSource {
  AXECore,
  AbilityAttributes
} */

export type AccessibilityError = {
  elementUuid: string | number;
  source: string;
  message: string;
  severity?: string;
};
