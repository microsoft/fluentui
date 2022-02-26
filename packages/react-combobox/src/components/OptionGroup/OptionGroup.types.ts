import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type OptionGroupSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type OptionGroupCommons = {
  // TODO Add things shared between props and state here
};

/**
 * OptionGroup Props
 */
export type OptionGroupProps = ComponentProps<OptionGroupSlots> & OptionGroupCommons;

/**
 * State used in rendering OptionGroup
 */
export type OptionGroupState = ComponentState<OptionGroupSlots> & OptionGroupCommons;
