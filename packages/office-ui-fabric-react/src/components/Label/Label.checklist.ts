import { ChecklistStatus, IComponentStatusProps } from '../../demo/ComponentStatus/ComponentStatus.types';

export const LabelStatus: IComponentStatusProps = {
  keyboardAccessibilitySupport: ChecklistStatus.notApplicable,
  markupSupport: ChecklistStatus.good,
  highContrastSupport: ChecklistStatus.pass,
  rtlSupport: ChecklistStatus.pass,
  testCoverage: ChecklistStatus.good
};
