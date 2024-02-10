import * as React from 'react';
import {
  getIntrinsicElementProps,
  mergeCallbacks,
  useEventCallback,
  slot,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { useHasParentContext } from '@fluentui/react-context-selector';
import {
  useActiveDescendant,
  useActiveDescendantContext,
  useHasParentActiveDescendantContext,
} from '@fluentui/react-aria';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { useOptionCollection } from '../../utils/useOptionCollection';
import { useSelection } from '../../utils/useSelection';
import type { ListboxProps, ListboxState } from './Listbox.types';
import { optionClassNames } from '../Option/useOptionStyles.styles';
import { ListboxContext, useListboxContext_unstable } from '../../contexts/ListboxContext';

/**
 * Create the state required to render Listbox.
 *
 * The returned state can be modified with hooks such as useListboxStyles_unstable,
 * before being passed to renderListbox_unstable.
 *
 * @param props - props from this instance of Listbox
 * @param ref - reference to root HTMLElement of Listbox
 */
export const useListbox_unstable = (props: ListboxProps, ref: React.Ref<HTMLElement>): ListboxState => {
  const { multiselect } = props;
  const optionCollection = useOptionCollection();
  const { getOptionById } = optionCollection;

  const {
    listboxRef: activeDescendantListboxRef,
    activeParentRef,
    controller,
  } = useActiveDescendant<HTMLInputElement, HTMLDivElement>({
    matchOption: el => el.classList.contains(optionClassNames.root),
  });

  const activeDescendantContext = useActiveDescendantContext();
  const activeDescendantController = useHasParentActiveDescendantContext()
    ? activeDescendantContext.controller
    : controller;

  const { clearSelection, selectedOptions, selectOption } = useSelection(props);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const activeOptionId = activeDescendantController.active();
    const activeOption = activeOptionId ? getOptionById(activeOptionId) : null;

    switch (action) {
      case 'Next':
        if (activeOption) {
          activeDescendantController.next();
        } else {
          activeDescendantController.first();
        }
        break;
      case 'Previous':
        if (activeOption) {
          activeDescendantController.prev();
        } else {
          activeDescendantController.first();
        }
        break;
      case 'PageUp':
      case 'First':
        activeDescendantController.first();
        break;
      case 'PageDown':
      case 'Last':
        activeDescendantController.last();
        break;
      case 'Select':
      case 'CloseSelect':
        activeOption && selectOption(event, activeOption);
        break;
    }
  };

  // get state from parent combobox, if it exists
  const hasComboboxContext = useHasParentContext(ListboxContext);
  const contextSelectedOptions = useListboxContext_unstable(ctx => ctx.selectedOptions);
  const contextSelectOption = useListboxContext_unstable(ctx => ctx.selectOption);

  // without a parent combobox context, provide values directly from Listbox
  const optionContextValues = hasComboboxContext
    ? {
        activeOption: undefined,
        focusVisible: false,
        selectedOptions: contextSelectedOptions,
        selectOption: contextSelectOption,
        setActiveOption: () => null,
      }
    : {
        activeOption: undefined,
        focusVisible: false,
        selectedOptions,
        selectOption,
        setActiveOption: () => null,
      };

  const state: ListboxState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref as React.Ref<HTMLDivElement>, activeParentRef, activeDescendantListboxRef),
        role: multiselect ? 'menu' : 'listbox',
        tabIndex: 0,
        ...props,
      }),
      { elementType: 'div' },
    ),
    multiselect,
    clearSelection,
    activeDescendantController,
    ...optionCollection,
    ...optionContextValues,
  };

  state.root.onKeyDown = useEventCallback(mergeCallbacks(state.root.onKeyDown, onKeyDown));

  return state;
};
