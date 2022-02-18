import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ComboboxSlots = {
  root: Slot<'div'>;
};

export type ComboboxCommons = {
  // TODO Add things shared between props and state here
};

/**
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<ComboboxSlots> & ComboboxCommons;

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> & ComboboxCommons;
