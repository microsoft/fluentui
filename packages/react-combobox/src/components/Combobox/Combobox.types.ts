import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { OptionValue, OrderedGroupState } from '../../utils/OrderedGroup.types';
import { SelectionProps, SelectionState } from '../../utils/Selection.types';
import { Listbox } from '../Listbox';
import { ComboButton } from '../ComboButton';

export type ComboboxSlots = {
  root: NonNullable<Slot<'div'>>;

  listbox: Slot<typeof Listbox>;

  trigger: Slot<typeof ComboButton>;
};

export type ComboboxCommons = {
  open?: boolean;

  placeholder?: string;

  selectedKeys?: string[];

  /* controlled value string */
  value?: string;
};

/**
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<Partial<ComboboxSlots>, 'trigger'> & ComboboxCommons & SelectionProps;

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Required<Pick<ComboboxCommons, 'open'>> &
  Pick<ComboboxCommons, 'placeholder' | 'value'> &
  OrderedGroupState &
  SelectionState & {
    activeOption?: OptionValue;
    onOptionClick(optionKey: string): void;
  };
