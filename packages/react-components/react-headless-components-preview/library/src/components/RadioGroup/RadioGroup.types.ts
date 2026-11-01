import type { RadioGroupBaseState } from '@fluentui/react-radio';

export type {
  RadioGroupSlots,
  RadioGroupBaseProps as RadioGroupProps,
  RadioGroupContextValues,
} from '@fluentui/react-radio';

export type RadioGroupState = RadioGroupBaseState & {
  root: {
    'data-disabled'?: string;
  };
};
