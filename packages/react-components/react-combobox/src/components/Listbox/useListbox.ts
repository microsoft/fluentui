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
import type { ListboxProps, ListboxState } from './Listbox.types';
import { getDropdownActionFromKey } from '../../utils/dropdownKeyActions';
import { useOptionCollection } from '../../utils/useOptionCollection';
import { useSelection } from '../../utils/useSelection';
import { optionClassNames } from '../Option/useOptionStyles.styles';
import { ListboxContext, useListboxContext_unstable } from '../../contexts/ListboxContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
const UNSAFE_noLongerUsed = {
  activeOption: undefined,
  focusVisible: false,
  setActiveOption: () => null,
};

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
  const hasParentActiveDescendantContext = useHasParentActiveDescendantContext();
  const activeDescendantController = hasParentActiveDescendantContext ? activeDescendantContext.controller : controller;

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

  const onFocus = (_event: React.FocusEvent<HTMLElement>) => {
    if (hasParentActiveDescendantContext || activeDescendantController.active()) {
      return;
    }

    // restore focus to last active option (if it still exists) - similar to memorizeCurrent in useArrowNavigationGroup
    if (activeDescendantController.focusLastActive()) {
      return;
    }

    // if there is a selected option, focus it and make it active
    const selectedOptionValues = selectedOptions ?? [];
    const firstSelectedOption = optionCollection.getOptionsMatchingValue(value =>
      selectedOptionValues.includes(value),
    )[0];
    if (firstSelectedOption) {
      activeDescendantController.focus(firstSelectedOption.id);
      return;
    }

    // if there is no active descendant and no selected options, set the first option as active
    activeDescendantController.first();
  };

  const onBlur = (_event: React.FocusEvent<HTMLElement>) => {
    if (hasParentActiveDescendantContext) {
      return;
    }

    // blur active descendant styles on blur, in the absence of a parent context controlling the state
    activeDescendantController.blur();
  };

  // get state from parent combobox, if it exists
  const hasListboxContext = useHasParentContext(ListboxContext);
  const contextSelectedOptions = useListboxContext_unstable(ctx => ctx.selectedOptions);
  const contextSelectOption = useListboxContext_unstable(ctx => ctx.selectOption);

  // without a parent combobox context, provide values directly from Listbox
  const optionContextValues = hasListboxContext
    ? {
        selectedOptions: contextSelectedOptions,
        selectOption: contextSelectOption,
        ...UNSAFE_noLongerUsed,
      }
    : {
        selectedOptions,
        selectOption,
        ...UNSAFE_noLongerUsed,
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
  state.root.onFocus = useEventCallback(mergeCallbacks(state.root.onFocus, onFocus));
  state.root.onBlur = useEventCallback(mergeCallbacks(state.root.onBlur, onBlur));

  return state;
};
