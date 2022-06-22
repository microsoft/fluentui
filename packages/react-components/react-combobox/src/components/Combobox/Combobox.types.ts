import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ComboboxBaseProps, ComboboxBaseState } from '../../utils/ComboboxBase.types';
import type { ComboboxContextValue } from '../../contexts/ComboboxContext';
import { Listbox } from '../Listbox/Listbox';

export type ComboboxSlots = {
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
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<Partial<ComboboxSlots>, 'button'> & ComboboxBaseProps;

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> & ComboboxBaseState;

/**
 * Data for the Combobox onOpenChange event.
 */
export type ComboboxOpenChangeData = {
  open: boolean;
};

/* Possible event types for onOpen */
export type ComboboxOpenEvents =
  | React.FocusEvent<HTMLElement>
  | React.KeyboardEvent<HTMLElement>
  | React.MouseEvent<HTMLElement>;

export type ComboboxContextValues = {
  combobox: ComboboxContextValue;
};
