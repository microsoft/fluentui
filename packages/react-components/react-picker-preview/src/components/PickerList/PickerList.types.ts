import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { Listbox } from '@fluentui/react-combobox';
import { PickerContextValue } from '../../contexts/PickerContext';

export type PickerListSlots = {
  root?: Slot<typeof Listbox>;
};

/**
 * PickerList Props
 */
export type PickerListProps = ComponentProps<PickerListSlots> & {};

/**
 * State used in rendering PickerList
 */
export type PickerListState = ComponentState<PickerListSlots> & Pick<PickerContextValue, 'open'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from PickerListProps.
// & Required<Pick<PickerListProps, 'propName'>>
