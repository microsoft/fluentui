import { ChecklistStatus } from '../../demo/ComponentStatus/ComponentStatus.types';

export const ModalStatus = {
  keyboardAccessibilitySupport: ChecklistStatus.unknown,
  markupSupport: ChecklistStatus.unknown,
  highContrastSupport: ChecklistStatus.pass,
  rtlSupport: ChecklistStatus.fail,
  testCoverage: ChecklistStatus.none
};