import type { ToggleButtonBaseState } from '@fluentui/react-button';

export type { ButtonSlots as ToggleButtonSlots } from '../Button/Button.types';
export type { ToggleButtonBaseProps as ToggleButtonProps } from '@fluentui/react-button';

/**
 * ToggleButton component state
 */
export type ToggleButtonState = ToggleButtonBaseState & {
  root: {
    /**
     * Present when the button is disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Present when the button is disabled but still focusable; omitted otherwise.
     */
    'data-disabled-focusable'?: string;

    /**
     * Present when the button renders only an icon; omitted otherwise.
     */
    'data-icon-only'?: string;

    /**
     * Present when the button is checked; omitted otherwise.
     */
    'data-checked'?: string;

    /**
     * Data attribute reflecting the icon position when an icon slot is present.
     */
    'data-icon-position'?: ToggleButtonBaseState['iconPosition'];
  };
};
