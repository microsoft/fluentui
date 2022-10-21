import type { ComponentProps, ComponentState } from '@fluentui/react-utilities';
import { ToggleButtonProps, ButtonSlots, ToggleButtonState } from '@fluentui/react-button';

/**
 * ToolbarToggleButton Props
 */
export type ToolbarRadioProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ToggleButtonProps, 'disabled' | 'disabledFocusable' | 'size'>> & {
    appearance?: 'primary' | 'subtle';
    name: string;
    value: string;
  };

/**
 * State used in rendering ToolbarToggleButton
 */
export type ToolbarRadioState = ComponentState<Partial<ButtonSlots>> &
  ToggleButtonState &
  Required<Pick<ToggleButtonProps, 'checked'>> &
  Pick<ToolbarRadioProps, 'name' | 'value'>;
