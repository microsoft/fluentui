import * as React from 'react';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ComboboxContextValue } from '../../contexts/ComboboxContext';
import type { ComboboxBaseProps, ComboboxBaseSlots, ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';
import { ComboboxInput } from '../ComboboxInput/ComboboxInput';

export type ComboboxSlots = Omit<ComboboxBaseSlots, 'input'> & {
  input: NonNullable<Slot<typeof ComboboxInput>>;
};

/**
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<ComboboxSlots> & Omit<ComboboxBaseProps, 'input'>;

/**
 * State used in rendering Combobox
 */
export type ComboboxState = Omit<ComboboxBaseState, 'components' | 'input'> & ComponentState<ComboboxSlots>;

export type ComboboxContextValues = {
  combobox: ComboboxContextValue;
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
