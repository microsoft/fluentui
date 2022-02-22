import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioGroupSlots = {
  root: Slot<'span'>;
};

/**
 * RadioGroup Props
 */
export type RadioGroupProps = ComponentProps<RadioGroupSlots>;

/**
 * State used in rendering RadioGroup
 */
export type RadioGroupState = ComponentState<RadioGroupSlots>;
