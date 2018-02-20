export interface IComponentStatusProps {
  keyboardAccessibilitySupport: ChecklistStatus;
  markupSupport: ChecklistStatus;
  highContrastSupport: ChecklistStatus;
  rtlSupport: ChecklistStatus;
  testCoverage: ChecklistStatus;
}

export enum ChecklistStatus {
  unknown = 'Unknown',
  notApplicable = 'Not applicable',
  pass = 'Pass',
  fail = 'Fail',
  none = 'No tests',
  poor = 'Poor',
  fair = 'Fair',
  good = 'Good'
}
