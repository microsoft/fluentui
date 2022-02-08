import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { OptionValue, OrderedGroupState } from '../../utils/OrderedGroup.types';
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
  OrderedGroupState &
  SelectionState & {
    activeOption?: OptionValue;
    onOptionClick(optionKey: string): void;
  };
