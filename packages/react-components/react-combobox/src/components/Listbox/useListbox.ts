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

  // get state from parent combobox, if it exists
  const hasListboxContext = useHasParentContext(ListboxContext);
  const onActiveDescendantChange = useListboxContext_unstable(ctx => ctx.onActiveDescendantChange);

  const listenerRef = React.useCallback((el: HTMLDivElement | null) => {
    if (!el) {
      return;
    }

    el.addEventListener('activedescendantchange', (untypedEvent: Event) => {
      // Typescript doesn't support custom event types on handler
      const event = untypedEvent as ActiveDescendantChangeEvent;

      const previousOption = event.detail.previousId ? optionCollection.getOptionById(event.detail.previousId) : null;
      const nextOption = optionCollection.getOptionById(event.detail.id);
      // TODO - remove
      console.log(event.detail, previousOption, nextOption);
      onActiveDescendantChange(event, { previousOption, nextOption })
    });
  }, []);

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
        ref: useMergedRefs(ref as React.Ref<HTMLDivElement>, activeParentRef, activeDescendantListboxRef, listenerRef),
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
