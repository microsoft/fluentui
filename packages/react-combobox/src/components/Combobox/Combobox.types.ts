import type {
  ComponentProps,
  ComponentState,
  IntrinsicShorthandProps,
  ObjectShorthandProps,
} from '@fluentui/react-utilities';
import { OrderedGroupState } from '../../utils/OrderedGroup.types';
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
export type ComboboxProps = ComponentProps<ComboboxSlots> &
  ComboboxCommons & {
    /* For an uncontrolled component, sets the initial selection */
    initialSelectedKeys?: string[];

    multiselect?: boolean;

    onChange?: (option: string, selected: boolean) => void;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Required<Pick<ComboboxCommons, 'open' | 'selectedKeys'>> &
  Pick<ComboboxCommons, 'placeholder' | 'value'> &
  OrderedGroupState & {
    activeId?: string;
    onOptionClick(optionKey: string): void;
  };
