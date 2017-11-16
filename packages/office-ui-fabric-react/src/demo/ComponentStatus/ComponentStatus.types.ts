export interface IComponentStatusProps {
  keyboardAccessibilitySupport: ChecklistStatus;
  markupSupport: ChecklistStatus;
  highContrastSupport: ChecklistStatus;
  rtlSupport: ChecklistStatus;
  testCoverage: ChecklistStatus;
}

export enum ChecklistStatus {
  unknown = 'Unknown',
  pass = 'Pass',
  fail = 'Fail',
  none = 'No Tests',
  poor = 'Poor',
  fair = 'Fair',
  good = 'Good'
}
