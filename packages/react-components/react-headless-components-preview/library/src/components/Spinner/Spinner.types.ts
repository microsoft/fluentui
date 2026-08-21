import type { SpinnerBaseState } from '@fluentui/react-spinner';

export type { SpinnerSlots, SpinnerBaseProps as SpinnerProps } from '@fluentui/react-spinner';

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
