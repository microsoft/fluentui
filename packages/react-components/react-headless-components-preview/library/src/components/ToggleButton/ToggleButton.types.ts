import type { ToggleButtonBaseState } from '@fluentui/react-button';

export type { ButtonSlots as ToggleButtonSlots } from '../Button/Button.types';
export type { ToggleButtonBaseProps as ToggleButtonProps } from '@fluentui/react-button';

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

    /**
     * Data attribute reflecting the icon position when an icon slot is present.
     */
    'data-icon-position'?: ToggleButtonBaseState['iconPosition'];
  };
};
