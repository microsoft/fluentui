import type { ComponentProps, ComponentState, DistributiveOmit } from '@fluentui/react-utilities';
import type { ToggleButtonProps, ButtonSlots, ToggleButtonState } from '@fluentui/react-button';

/**
 * ToolbarToggleButton Props
 */
export type ToolbarToggleButtonProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ToggleButtonProps, 'disabled' | 'disabledFocusable' | 'size'>> & {
    appearance?: 'primary' | 'subtle' | 'transparent';
    name: string;
    value: string;
  };

export type ToolbarToggleButtonBaseProps = DistributiveOmit<ToolbarToggleButtonProps, 'appearance'>;

/**
 * State used in rendering ToolbarToggleButton
 */
export type ToolbarToggleButtonState = ComponentState<Partial<ButtonSlots>> &
  ToggleButtonState &
  Required<Pick<ToggleButtonProps, 'checked'>> &
  Pick<ToolbarToggleButtonProps, 'name' | 'value'>;

export type ToolbarToggleButtonBaseState = DistributiveOmit<ToolbarToggleButtonState, 'appearance'>;
