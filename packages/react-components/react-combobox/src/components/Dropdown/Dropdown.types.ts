import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  ComboboxBaseContextValues,
  ComboboxBaseOpenChangeData,
  ComboboxBaseOpenEvents,
  ComboboxBaseProps,
  ComboboxBaseState,
} from '../../utils/ComboboxBase.types';
import { Listbox } from '../Listbox/Listbox';
import { Portal } from '@fluentui/react-portal';

export type DropdownSlots = {
  /* The root dropdown slot */
  root: NonNullable<Slot<'div'>>;

  /* The dropdown arrow icon */
  expandIcon: Slot<'span'>;

  /* The primary slot, the element with role="combobox" */
  button: NonNullable<Slot<'button'>>;

  /* The dropdown listbox slot */
  listbox?: Slot<typeof Listbox>;

  /*
     The dropdown portal slot.
     Limited to setting props only as the listbox is the rendered child.
  */
  portal: NonNullable<Slot<typeof Portal>>;
};

/**
 * Dropdown Props
 */
export type DropdownProps = ComponentProps<Partial<DropdownSlots>, 'button'> & ComboboxBaseProps;

/**
 * State used in rendering Dropdown
 */
export type DropdownState = ComponentState<DropdownSlots> &
  ComboboxBaseState & {
    /* Whether the placeholder is currently displayed */
    placeholderVisible: boolean;
  };

/* Export types defined in ComboboxBase */
export type DropdownContextValues = ComboboxBaseContextValues;
export type DropdownOpenEvents = ComboboxBaseOpenEvents;
export type DropdownOpenChangeData = ComboboxBaseOpenChangeData;
