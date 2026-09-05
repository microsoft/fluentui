import type { SpinButtonBaseState } from '@fluentui/react-spinbutton';

export type { SpinButtonSlots, SpinButtonBaseProps as SpinButtonProps } from '@fluentui/react-spinbutton';

/**
 * SpinButton component state
 */
export type SpinButtonState = SpinButtonBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the spin button is actively spinning. Value is 'up' or 'down'.
     */
    'data-spin-state'?: string;

    /**
     * Data attribute set when the value is at a range boundary. Value is 'min', 'max', or 'both'.
     */
    'data-at-bound'?: string;

    /**
     * Data attribute set when the spin button is invalid.
     */
    'data-invalid'?: string;
  };
};
