import type { SpinnerSlots as SpinnerBaseSlots, SpinnerBaseProps, SpinnerBaseState } from '@fluentui/react-spinner';

/**
 * Spinner component slots
 */
export type SpinnerSlots = SpinnerBaseSlots;

/**
 * Spinner component props
 */
export type SpinnerProps = SpinnerBaseProps;

/**
 * Spinner component state
 */
export type SpinnerState = SpinnerBaseState & {
  root: {
    /**
     * Data attribute reflecting the position of the label when a label slot is present. Value is 'before', 'after', 'above', or 'below'.
     */
    'data-label-position'?: 'before' | 'after' | 'above' | 'below';
  };
};
