import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ComboboxBaseProps, ComboboxBaseState } from '../../ComboboxBase/ComboboxBase.types';
import type { ComboboxContextValue } from '../../contexts/ComboboxContext';
import { Listbox } from '../Listbox/Listbox';

export type DropdownSlots = {
  /* The root combobox slot */
  root: NonNullable<Slot<'div'>>;

  /* The dropdown arrow icon */
  expandIcon: Slot<'span'>;

  /* The primary slot, the element with role="combobox" */
  button: NonNullable<Slot<'button'>>;

  /* The dropdown listbox slot */
  listbox: NonNullable<Slot<typeof Listbox>>;
};

/**
 * Dropdown Props
 */
export type DropdownProps = ComponentProps<Partial<DropdownSlots>, 'button'> & ComboboxBaseProps;

/**
 * State used in rendering Dropdown
 */
export type DropdownState = ComponentState<DropdownSlots> & ComboboxBaseState;

export type ComboboxContextValues = {
  combobox: ComboboxContextValue;
};
