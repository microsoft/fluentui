import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { ActiveDescendantContextValue, ActiveDescendantImperativeRef } from '@fluentui/react-aria';
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
  Pick<SelectionProps, 'multiselect'> &
  SelectionState & {
    /**
     * @deprecated - no longer used internally
     */
    activeOption?: OptionValue;

    /**
     * @deprecated - no longer used internally
     */
    focusVisible: boolean;

    selectOption(event: SelectionEvents, option: OptionValue): void;

    /**
     * @deprecated - no longer used internally
     */
    setActiveOption(option?: OptionValue): void;

    activeDescendantController: ActiveDescendantImperativeRef;
  };

export type ListboxContextValues = {
  listbox: ListboxContextValue;
  activeDescendant: ActiveDescendantContextValue;
};
