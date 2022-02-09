import type { PositioningShorthand } from '@fluentui/react-positioning';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { OptionValue, OptionCollectionState } from '../../utils/OptionCollection.types';
import { SelectionProps, SelectionState } from '../../utils/Selection.types';
import { Listbox } from '../Listbox';
import { ComboButton } from '../ComboButton';

export type ComboboxSlots = {
  root: NonNullable<Slot<'div'>>;

  listbox: Slot<typeof Listbox>;

  trigger: Slot<typeof ComboButton>;
};

export type ComboboxCommons = {
  /**
   * Render the combobox dropdown inline in the DOM.
   * This has accessibility benefits, particularly for touch screen readers.
   */
  inline?: boolean;

  open?: boolean;

  placeholder?: string;

  selectedKeys?: string[];

  /* controlled value string */
  value?: string;
};

/**
 * Combobox Props
 */
export type ComboboxProps = ComponentProps<Partial<ComboboxSlots>, 'trigger'> &
  ComboboxCommons &
  SelectionProps & {
    /**
     * Configure the positioning of the combobox dropdown
     *
     * @defaultvalue below
     */
    positioning?: PositioningShorthand;
  };

/**
 * State used in rendering Combobox
 */
export type ComboboxState = ComponentState<ComboboxSlots> &
  Required<Pick<ComboboxCommons, 'open' | 'inline'>> &
  Pick<ComboboxCommons, 'placeholder' | 'value'> &
  OptionCollectionState &
  SelectionState & {
    activeOption?: OptionValue;
    idBase: string;
    onOptionClick(optionKey: string): void;
  };
