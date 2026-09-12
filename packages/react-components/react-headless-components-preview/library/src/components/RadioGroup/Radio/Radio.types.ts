import type { RadioBaseState } from '@fluentui/react-radio';

export type { RadioSlots, RadioBaseProps as RadioProps } from '@fluentui/react-radio';

/**
 * Radio component state
 */
export type RadioState = RadioBaseState & {
  root: {
    /**
     * Present when disabled; omitted otherwise.
     */
    'data-disabled'?: string;

    /**
     * Data attribute reflecting the label position.
     */
    'data-label-position'?: RadioBaseState['labelPosition'];
  };
};
