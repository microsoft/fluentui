export interface IComponentStatusProps {

  /**
   * Components should be fully usable with the keyboard. For this badge to pass, all of the functionalities of
   * a component needs to be accessible via the keyboard.
   */
  keyboardAccessibilitySupport: ChecklistStatus;

  /**
   * Components should be appropriately marked with ARIA attributes so users with assistive technologies can
   * interact with them. For this badge to pass, a component needs to be marked with ARIA attributes to describe
   * its behavior for assistive technologies (e.g., screen readers). A component can use ARIA roles, states
   * and properties to inform users of its behavior.
   */
  markupSupport: ChecklistStatus;

  /**
   * Components should display correctly in high contrast mode. For this badge to pass, set your operating
   * system to use high contrast and then ensure that the components render correctly.
   */
  highContrastSupport: ChecklistStatus;

  /**
   * For localization, components should display correctly in right to left layouts. For this badge to pass,
   * ensure RTL (right-to-left) layouts render properly in the sample website by enabling it in the settings
   * (located in the top right corner for LTR layout).
   */
  rtlSupport: ChecklistStatus;

  /**
   * To avoid regressions, make sure components are throughly unit-tested. For this badge to be marked "good",
   * write unit tests that cover all edge cases and scenarios.
   */
  testCoverage: ChecklistStatus;
}

export enum ChecklistStatus {
  unknown = 'Unknown',
  notApplicable = 'Not applicable',
  pass = 'Pass',
  fail = 'Fail',
  none = 'Missing tests',
  poor = 'Poor',
  fair = 'Fair',
  good = 'Good'
}
