import { IContextualMenuItemWrapperProps } from './ContextualMenuItemWrapper.types';
import { ContextualMenuSplitButton } from './ContextualMenuSplitButton';

export interface IContextualMenuSplitButtonProps extends IContextualMenuItemWrapperProps {
  /**
   * Optional callback to access the ContextualMenuSplitButton interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ContextualMenuSplitButton | null) => void;

  /**
   * Callback for touch/pointer events on the split button.
   */
  onTap?: (ev: React.TouchEvent<HTMLElement> | PointerEvent) => void;
}