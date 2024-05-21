import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import type {
  ActiveOptionChangeData as ComboboxBaseActiveOptionChangeData,
  ComboboxBaseContextValues,
  ComboboxBaseOpenChangeData,
  ComboboxBaseOpenEvents,
  ComboboxBaseProps,
  ComboboxBaseState,
} from '../../utils/ComboboxBase.types';
import { Listbox } from '../Listbox/Listbox';

export type DropdownSlots = {
  /** The root dropdown slot */
  root: NonNullable<Slot<'div'>>;

  /** The dropdown arrow icon */
  expandIcon?: Slot<'span'>;

  /** The dropdown clear icon */
  clearButton?: Slot<'button'>;

  /** The primary slot, the element with role="combobox" */
  button: NonNullable<Slot<'button'>>;

  /** The dropdown listbox slot */
  listbox?: Slot<typeof Listbox>;
};

/**
 * Dropdown Props
 */
export type DropdownProps = ComponentProps<Partial<DropdownSlots>, 'button'> & ComboboxBaseProps;

/**
 * State used in rendering Dropdown
 */
export type DropdownState = ComponentState<DropdownSlots> &
  Omit<ComboboxBaseState, 'freeform'> & {
    /** Whether the placeholder is currently displayed */
    placeholderVisible: boolean;

    showClearButton?: boolean;

    activeDescendantController: ActiveDescendantImperativeRef;
  };

/* Export types defined in ComboboxBase */
export type DropdownContextValues = ComboboxBaseContextValues;
export type DropdownOpenEvents = ComboboxBaseOpenEvents;
export type DropdownOpenChangeData = ComboboxBaseOpenChangeData;
export type ActiveOptionChangeData = ComboboxBaseActiveOptionChangeData;
