import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ComboboxBaseProps, ComboboxBaseState } from '../../ComboboxBase/ComboboxBase.types';
import { Listbox } from '../Listbox/Listbox';

export type DropdownSlots = {
  /* The root combobox slot */
  root: NonNullable<Slot<'div'>>;

  /* The dropdown listbox slot */
  listbox: NonNullable<Slot<typeof Listbox>>;

  /* The primary slot, the element with role="combobox" */
  button: NonNullable<Slot<'button'>>;
};

/**
 * Dropdown Props
 */
export type DropdownProps = ComponentProps<Partial<DropdownSlots>, 'button'> & ComboboxBaseProps;

/**
 * State used in rendering Dropdown
 */
export type DropdownState = ComponentState<DropdownSlots> & ComboboxBaseState;
