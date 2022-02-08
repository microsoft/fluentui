import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { OptionValue, OptionCollectionState } from '../../utils/OptionCollection.types';
import { SelectionProps, SelectionState } from '../../utils/Selection.types';

export type ListboxSlots = {
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
    activeOption?: OptionValue;
    onOptionClick(optionKey: string): void;
  };
