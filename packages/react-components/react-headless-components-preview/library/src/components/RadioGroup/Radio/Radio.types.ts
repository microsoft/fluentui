import type { RadioSlots as RadioBaseSlots, RadioBaseProps, RadioBaseState } from '@fluentui/react-radio';

/**
 * Radio component slots
 */
export type RadioSlots = RadioBaseSlots;

/**
 * Radio component props
 */
export type RadioProps = RadioBaseProps;

/**
 * Radio component state
 */
export type RadioState = RadioBaseState & {
  root: {
    /**
     * Data attribute set when the radio is disabled.
     */
    'data-disabled'?: string;
  };
};
