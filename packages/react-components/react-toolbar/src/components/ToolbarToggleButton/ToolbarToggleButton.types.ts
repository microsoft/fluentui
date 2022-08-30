import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { ToggleButtonProps, ButtonSlots, ToggleButtonState } from '@fluentui/react-button';

/**
 * ToolbarToggleButton Props
 */
export type ToolbarToggleButtonProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ToggleButtonProps, 'disabled' | 'disabledFocusable' | 'size'>> & {
    appearance?: 'primary' | 'subtle';
  };

/**
 * State used in rendering ToolbarToggleButton
 */
export type ToolbarToggleButtonState = ComponentState<Partial<ButtonSlots>> &
  ToggleButtonState &
  Required<Pick<ToggleButtonProps, 'checked'>> & {
    name?: string;
    value?: string;
  };
