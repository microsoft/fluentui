import type { ComponentProps } from '@fluentui/react-utilities';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

/**
 * ToolbarButton Props
 */
export type ToolbarButtonProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ButtonProps, 'disabled' | 'disabledFocusable'>> & {
    appearance?: 'primary' | 'subtle';
  };

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarButtonState = ButtonState;
