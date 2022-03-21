import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type OptionSlots = {
  root: Slot<'div'>;
};

export type OptionCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Option Props
 */
export type OptionProps = ComponentProps<OptionSlots> & OptionCommons;

/**
 * State used in rendering Option
 */
export type OptionState = ComponentState<OptionSlots> & OptionCommons;
