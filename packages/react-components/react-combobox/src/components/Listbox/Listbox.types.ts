import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { OptionValue, OptionCollectionState } from '../../utils/OptionCollection.types';
import { SelectionEvents, SelectionProps, SelectionState } from '../../utils/Selection.types';
import type { ListboxContextValue } from '../../contexts/ListboxContext';

export type ListboxSlots = {
  /* The root slot, a `<div>` with `role="listbox"` */
  root: Slot<'div'>;
};

/**
 * Listbox Props
 */
export type ListboxProps = ComponentProps<ListboxSlots> & SelectionProps;

/**
 * State used in rendering Listbox
 */
export type ListboxState = ComponentState<ListboxSlots> &
  OptionCollectionState &
  SelectionState & {
    /* Option data for the currently highlighted option (not the selected option) */
    activeOption?: OptionValue;

    selectOption(event: SelectionEvents, option: OptionValue): void;

    setActiveOption(option?: OptionValue): void;
  };

export type ListboxContextValues = {
  listbox: ListboxContextValue;
};
