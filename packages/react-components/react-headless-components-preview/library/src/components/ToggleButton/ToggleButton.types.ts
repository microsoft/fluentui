import type { ButtonSlots as ButtonBaseSlots } from '../Button/Button.types';
import type { ToggleButtonBaseProps, ToggleButtonBaseState } from '@fluentui/react-button';

/**
 * ToggleButton component slots
 */
export type ToggleButtonSlots = ButtonBaseSlots;

/**
 * ToggleButton component props
 */
export type ToggleButtonProps = ToggleButtonBaseProps;

/**
 * ToggleButton component state
 */
export type ToggleButtonState = ToggleButtonBaseState & {
  root: {
    /**
     * Data attribute set when the button is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the button is disabled but still focusable.
     */
    'data-disabled-focusable'?: string;

    /**
     * Data attribute set when the button renders only an icon.
     */
    'data-icon-only'?: string;

    /**
     * Data attribute set when the button is in a checked (pressed) state.
     */
    'data-checked'?: string;
  };
};
