import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

/**
 * ToolbarButton Props
 */
export type ToolbarButtonProps = ComponentProps<ButtonSlots> &
  Pick<ButtonProps, 'disabled' | 'disabledFocusable'> & {
    size?: 'small' | 'medium';

    appearance?: 'primary' | 'subtle';
  };

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarButtonState = ComponentState<ButtonSlots> & ButtonState;
