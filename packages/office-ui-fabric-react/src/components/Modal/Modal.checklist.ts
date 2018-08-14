import { ChecklistStatus } from '../../common/DocPage.types';

export const ModalStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.unknown,
  markupSupport: ChecklistStatus.unknown,
  highContrastSupport: ChecklistStatus.pass,
  rtlSupport: ChecklistStatus.fail,
  testCoverage: ChecklistStatus.none
};
