import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { OrderedGroupState } from '../../utils/OrderedGroup.types';

export type ListboxSlots = {
  // TODO Add slots here and to listboxShorthandProps in useListbox.ts
  root: IntrinsicShorthandProps<'div'>;
};

type ListboxCommons = {
  /* Map of selected options, set this to control selected state */
  selectedKeys?: string[];
};

/**
 * Listbox Props
 */
export type ListboxProps = ComponentProps<ListboxSlots> &
  ListboxCommons & {
    /* For an uncontrolled component, sets the initial selection */
    initialSelectedKeys?: string[];

    /**
     * Sets the listbox to multiselect.
     * Set this for multiselect listboxes even if fully controlling selection state.
     * @default false
     */
    multiselect?: boolean;

    /* Callback when an option is selected */
    onSelect?(optionKey: string): void;
  };

/**
 * State used in rendering Listbox
 */
export type ListboxState = ComponentState<ListboxSlots> &
  Required<ListboxCommons> &
  OrderedGroupState & {
    activeId?: string;
    onOptionClick(optionKey: string): void;
  };
