import type { RadioGroupBaseState } from '@fluentui/react-radio';

export type {
  RadioGroupSlots,
  RadioGroupBaseProps as RadioGroupProps,
  RadioGroupContextValues,
} from '@fluentui/react-radio';

export type RadioGroupState = RadioGroupBaseState & {
  root: {
    /**
     * Data attribute set when the radio group is disabled.
     */
    'data-disabled'?: string;
  };
};
