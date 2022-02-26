import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ListboxSlots = {
  root: NonNullable<Slot<'div'>>;
};

export type ListboxCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Listbox Props
 */
export type ListboxProps = ComponentProps<ListboxSlots> & ListboxCommons;

/**
 * State used in rendering Listbox
 */
export type ListboxState = ComponentState<ListboxSlots> & ListboxCommons;
