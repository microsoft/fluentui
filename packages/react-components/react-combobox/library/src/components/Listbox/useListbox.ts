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
  ActiveDescendantChangeEvent,
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
import { useOnKeyboardNavigationChange } from '@fluentui/react-tabster';

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
  'use no memo';

  const { multiselect } = props;
  const optionCollection = useOptionCollection();

  const {
    listboxRef: activeDescendantListboxRef,
    activeParentRef,
    controller,
  } = useActiveDescendant<HTMLInputElement, HTMLDivElement>({
    matchOption: el => el.classList.contains(optionClassNames.root),
  });

  const hasListboxContext = useHasParentContext(ListboxContext);
  const onActiveDescendantChange = useListboxContext_unstable(ctx => ctx.onActiveDescendantChange);
  const contextGetOptionById = useListboxContext_unstable(ctx => ctx.getOptionById);
  const contextGetOptionsMatchingValue = useListboxContext_unstable(ctx => ctx.getOptionsMatchingValue);

  const getOptionById = hasListboxContext ? contextGetOptionById : optionCollection.getOptionById;
  const getOptionsMatchingValue = hasListboxContext
    ? contextGetOptionsMatchingValue
    : optionCollection.getOptionsMatchingValue;

  const listenerRef = React.useMemo(() => {
    let element: HTMLDivElement | null = null;

    const listener = (untypedEvent: Event) => {
      // Typescript doesn't support custom event types on handler
      const event = untypedEvent as ActiveDescendantChangeEvent;
      onActiveDescendantChange?.(event);
    };

    return (el: HTMLDivElement | null) => {
      if (!el) {
        element?.removeEventListener('activedescendantchange', listener);
        return;
      }

      element = el;
      element.addEventListener('activedescendantchange', listener);
    };
  }, [onActiveDescendantChange]);

  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = React.useState(false);
  useOnKeyboardNavigationChange(setIsNavigatingWithKeyboard);

  const activeDescendantContext = useActiveDescendantContext();
  const hasParentActiveDescendantContext = useHasParentActiveDescendantContext();
  const activeDescendantController = hasParentActiveDescendantContext ? activeDescendantContext.controller : controller;

  const { clearSelection, selectedOptions, selectOption } = useSelection(props);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const action = getDropdownActionFromKey(event, { open: true });
    const activeOptionId = activeDescendantController.active();
    const activeOption = activeOptionId ? getOptionById(activeOptionId) : null;

    switch (action) {
      case 'First':
      case 'Last':
      case 'Next':
      case 'Previous':
      case 'PageDown':
      case 'PageUp':
      case 'CloseSelect':
      case 'Select':
        event.preventDefault();
        break;
    }

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

  React.useEffect(() => {
    if (!hasParentActiveDescendantContext) {
      // disable focus-visible attributes until focus is received
      activeDescendantController.hideFocusVisibleAttributes();
    }

    // if it is single-select and there is a selected option, start at the selected option
    if (!multiselect && optionContextValues.selectedOptions.length > 0) {
      const selectedOption = getOptionsMatchingValue(v => v === optionContextValues.selectedOptions[0]).pop();

      if (selectedOption?.id) {
        activeDescendantController.focus(selectedOption.id);
      }
    }

    // otherwise start at the first option
    else {
      activeDescendantController.first();
    }

    return () => {
      activeDescendantController.blur();
    };

    // this should only be run once in the lifecycle of the Listbox
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFocus = React.useCallback(() => {
    if (hasParentActiveDescendantContext) {
      return;
    }

    activeDescendantController.showFocusVisibleAttributes();

    if (isNavigatingWithKeyboard) {
      activeDescendantController.scrollActiveIntoView();
    }
  }, [activeDescendantController, hasParentActiveDescendantContext, isNavigatingWithKeyboard]);

  const onBlur = React.useCallback(() => {
    if (hasParentActiveDescendantContext) {
      return;
    }

    activeDescendantController.hideFocusVisibleAttributes();
  }, [activeDescendantController, hasParentActiveDescendantContext]);

  const state: ListboxState = {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: useMergedRefs(ref as React.Ref<HTMLDivElement>, activeParentRef, activeDescendantListboxRef, listenerRef),
        role: multiselect ? 'menu' : 'listbox',
        tabIndex: 0,
        ...props,
      }),
      { elementType: 'div' },
    ),
    standalone: !hasListboxContext,
    multiselect,
    clearSelection,
    activeDescendantController,
    onActiveDescendantChange,
    ...optionCollection,
    ...optionContextValues,
  };

  state.root.onKeyDown = useEventCallback(mergeCallbacks(state.root.onKeyDown, onKeyDown));
  state.root.onFocus = useEventCallback(mergeCallbacks(state.root.onFocus, onFocus));
  state.root.onBlur = useEventCallback(mergeCallbacks(state.root.onBlur, onBlur));

  return state;
};
