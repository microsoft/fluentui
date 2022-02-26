import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ComboButtonSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type ComboButtonCommons = {
  // TODO Add things shared between props and state here
};

/**
 * ComboButton Props
 */
export type ComboButtonProps = ComponentProps<ComboButtonSlots> & ComboButtonCommons;

/**
 * State used in rendering ComboButton
 */
export type ComboButtonState = ComponentState<ComboButtonSlots> & ComboButtonCommons;
