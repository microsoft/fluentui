import type { RadioBaseState } from '@fluentui/react-radio';

export type { RadioSlots, RadioBaseProps as RadioProps } from '@fluentui/react-radio';

/**
 * Radio component state
 */
export type RadioState = RadioBaseState & {
  root: {
    /**
     * Data attribute set when the radio is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute reflecting the label position.
     */
    'data-label-position'?: RadioBaseState['labelPosition'];
  };
};
