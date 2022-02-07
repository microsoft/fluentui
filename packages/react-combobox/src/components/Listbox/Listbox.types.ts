import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { OrderedGroupState } from '../../utils/OrderedGroup.types';
import { SelectionProps, SelectionState } from '../../utils/Selection.types';

export type ListboxSlots = {
  // TODO Add slots here and to listboxShorthandProps in useListbox.ts
  root: IntrinsicShorthandProps<'div'>;
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
    activeId?: string;
    onOptionClick(optionKey: string): void;
  };
