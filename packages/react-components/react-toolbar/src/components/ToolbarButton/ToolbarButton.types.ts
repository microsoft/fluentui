import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

/**
 * ToolbarButton Props
 */
export type ToolbarButtonProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ButtonProps, 'disabled' | 'disabledFocusable'>> & {
    appearance?: 'primary' | 'subtle' | 'secondary';
  } & {
    vertical?: boolean;
  };

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarButtonState = ComponentState<Partial<ButtonSlots>> &
  ButtonState &
  Required<Pick<ToolbarButtonProps, 'vertical'>>;
