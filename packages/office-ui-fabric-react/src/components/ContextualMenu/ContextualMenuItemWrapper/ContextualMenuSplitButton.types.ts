import { IContextualMenuItemWrapperProps } from './IContextualMenuItemWrapper';

export interface IContextualMenuSplitButtonProps extends IContextualMenuItemWrapperProps {
  /**
   * Callback for touch/pointer events on the split button.
   */
  onTap?: (ev: React.TouchEvent<HTMLElement> | PointerEvent) => void;
}