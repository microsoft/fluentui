import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  ActiveDescendantChangeEvent,
  ActiveDescendantContextValue,
  ActiveDescendantImperativeRef,
} from '@fluentui/react-aria';
import { OptionValue, OptionCollectionState } from '../../utils/OptionCollection.types';
import { SelectionEvents, SelectionProps, SelectionState } from '../../utils/Selection.types';
import type { ListboxContextValue } from '../../contexts/ListboxContext';

export type ListboxSlots = {
  /** The root slot, a `<div>` with `role="listbox"` */
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
  Pick<SelectionProps, 'multiselect'> &
  SelectionState & {
    /**
     * @deprecated - no longer used internally
     * @see activeDescendantController.active()
     */
    activeOption?: OptionValue;

    /**
     * @deprecated - no longer used internally
     */
    focusVisible: boolean;

    /**
     * @deprecated - no longer used internally
     * @see activeDescendantController.focus(id)
     */
    setActiveOption(option?: OptionValue): void;

    // Whether the Listbox renders within a Combobox, Dropdown, or picker, or as a standalone widget
    standalone: boolean;

    selectOption(event: SelectionEvents, option: OptionValue): void;

    activeDescendantController: ActiveDescendantImperativeRef;

    onActiveDescendantChange?: (event: ActiveDescendantChangeEvent) => void;
  };

export type ListboxContextValues = {
  listbox: ListboxContextValue;
  activeDescendant: ActiveDescendantContextValue;
};
