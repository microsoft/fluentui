export type AccessibilityErrorsBySource = {
  source: string;
  errors: string[];
}

export type AccessibilityErrors = {
  elementUuid: string | number;
  accessibilityErrors: AccessibilityErrorsBySource[];
}
