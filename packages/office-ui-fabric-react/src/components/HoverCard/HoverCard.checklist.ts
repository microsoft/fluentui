import { ChecklistStatus } from '../../common/DocPage.types';

export const HoverCardStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.fair,
  markupSupport: ChecklistStatus.good,
  highContrastSupport: ChecklistStatus.fail,
  rtlSupport: ChecklistStatus.pass,
  testCoverage: ChecklistStatus.none
};
