import * as React from 'react';
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

export type ComboboxSlots = {
  /** The root combobox slot */
  root: NonNullable<Slot<'div'>>;

  /** The dropdown arrow icon */
  expandIcon?: Slot<'span'>;

  /** The dropdown clear icon */
  clearIcon?: Slot<'span'>;

  /** The primary slot, an input with role="combobox" */
  input: NonNullable<Slot<'input'>>;

  /** The dropdown listbox slot */
  listbox?: Slot<typeof Listbox>;
};

/**
 * Combobox Props
 */
export type ComboboxProps = Omit<ComponentProps<Partial<ComboboxSlots>, 'input'>, 'children' | 'size'> &
  ComboboxBaseProps & {
    freeform?: boolean;
    /**
     * The primary slot, `<input>`, does not support children so we need to explicitly include it here.
     */
    children?: React.ReactNode;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  ComboboxBaseState & {
    showClearIcon?: boolean;
    activeDescendantController: ActiveDescendantImperativeRef;
  };

/* Export types defined in ComboboxBase */
export type ComboboxContextValues = ComboboxBaseContextValues;
export type ComboboxOpenChangeData = ComboboxBaseOpenChangeData;
export type ComboboxOpenEvents = ComboboxBaseOpenEvents;
export type ActiveOptionChangeData = ComboboxBaseActiveOptionChangeData;
