import type { ComponentProps, ComponentState, DistributiveOmit } from '@fluentui/react-utilities';
import { ButtonProps, ButtonSlots, ButtonState } from '@fluentui/react-button';

/**
 * ToolbarButton Props
 */
export type ToolbarButtonProps = ComponentProps<ButtonSlots> &
  Partial<Pick<ButtonProps, 'disabled' | 'disabledFocusable'>> & {
    appearance?: 'primary' | 'subtle' | 'transparent';
  } & {
    vertical?: boolean;
  };

export type ToolbarButtonBaseProps = DistributiveOmit<ToolbarButtonProps, 'appearance'>;

/**
 * State used in rendering ToolbarButton
 */
export type ToolbarButtonState = ComponentState<Partial<ButtonSlots>> &
  ButtonState &
  Required<Pick<ToolbarButtonProps, 'vertical'>>;

export type ToolbarButtonBaseState = DistributiveOmit<ToolbarButtonState, 'appearance' | 'size' | 'shape'>;
