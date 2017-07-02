export interface IComponentChecklistProps {
  status: boolean;
  designApproved: boolean | undefined;
  keyboardAccessibilitySupport: boolean | undefined;
  highContrastSupport: boolean | undefined;
  rtlSupport: boolean | undefined;
}