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

  /* The primary slot, an input with role="combobox" */
  input: NonNullable<Slot<'input'>>;

  /* The dropdown listbox slot */
  listbox: NonNullable<Slot<typeof Listbox>>;
};

/**
 * Combobox Props
 */
export type ComboboxProps = Omit<ComponentProps<Partial<ComboboxSlots>, 'input'>, 'children' | 'size'> &
  ComboboxBaseProps & {
    /*
     * The primary slot, `<input>`, does not support children so we need to explicitly include it here.
     */
    children: React.ReactNode;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  ComboboxBaseState & {
    /* Whether the placeholder is currently displayed */
    placeholderVisible: boolean;
  };

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
