export interface IComponentStatusProps {
  keyboardAccessibilitySupport: boolean | undefined;
  highContrastSupport: boolean | undefined;
  rtlSupport: boolean | undefined;
  testCoverage: TestCoverageStatus | undefined;
}

export enum TestCoverageStatus {
  none = 'No Tests',
  poor = 'Poor',
  fair = 'Fair',
  good = 'Good'
}
