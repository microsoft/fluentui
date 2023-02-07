import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { ToggleButtonProps, ButtonSlots, ToggleButtonState } from '@fluentui/react-button';

/**
 * ToolbarRadioButton Props
 */
export type ToolbarRadioButtonProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ToggleButtonProps, 'disabled' | 'disabledFocusable' | 'size'>> & {
    appearance?: 'primary' | 'subtle';
    name: string;
    value: string;
  };

/**
 * State used in rendering ToolbarRadioButton
 */
export type ToolbarRadioButtonState = ComponentState<Partial<ButtonSlots>> &
  ToggleButtonState &
  Required<Pick<ToggleButtonProps, 'checked'>> &
  Pick<ToolbarRadioButtonProps, 'name' | 'value'>;
