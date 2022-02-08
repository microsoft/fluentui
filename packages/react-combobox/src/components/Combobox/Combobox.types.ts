import type {
  ComponentProps,
  ComponentState,
  IntrinsicShorthandProps,
  ObjectShorthandProps,
} from '@fluentui/react-utilities';
import { OrderedGroupState } from '../../utils/OrderedGroup.types';
import { SelectionProps, SelectionState } from '../../utils/Selection.types';
import { ListboxProps } from '../Listbox';
import { ComboButtonProps } from '../ComboButton';

export type ComboboxSlots = {
  root: IntrinsicShorthandProps<'div'>;

  listbox: ObjectShorthandProps<ListboxProps>;

  trigger: ObjectShorthandProps<ComboButtonProps>;
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
export type ComboboxProps = ComponentProps<ComboboxSlots, 'trigger'> & ComboboxCommons & SelectionProps;

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Required<Pick<ComboboxCommons, 'open'>> &
  Pick<ComboboxCommons, 'placeholder' | 'value'> &
  OrderedGroupState &
  SelectionState & {
    activeId?: string;
    onOptionClick(optionKey: string): void;
  };
