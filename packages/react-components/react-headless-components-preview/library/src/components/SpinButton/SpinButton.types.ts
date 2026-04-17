import type {
  SpinButtonSlots as SpinButtonBaseSlots,
  SpinButtonBaseProps,
  SpinButtonBaseState,
} from '@fluentui/react-spinbutton';

/**
 * SpinButton component slots
 */
export type SpinButtonSlots = SpinButtonBaseSlots;

/**
 * SpinButton component props
 */
export type SpinButtonProps = SpinButtonBaseProps;

/**
 * SpinButton component state
 */
export type SpinButtonState = SpinButtonBaseState & {
  root: {
    /**
     * Data attribute set when the spin button is disabled.
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
  };
};
