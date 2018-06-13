import { ChecklistStatus, IComponentStatusProps } from '../../common/DocPage.types';

export const LabelStatus: IComponentStatusProps = {
  keyboardAccessibilitySupport: ChecklistStatus.notApplicable,
  markupSupport: ChecklistStatus.good,
  highContrastSupport: ChecklistStatus.pass,
  rtlSupport: ChecklistStatus.pass,
  testCoverage: ChecklistStatus.good
};
