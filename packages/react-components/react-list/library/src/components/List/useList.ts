'use client';

import type * as React from 'react';
import type { OnSelectionChangeData } from '@fluentui/react-utilities';
import { getIntrinsicElementProps, slot, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import type { ListProps, ListState } from './List.types';
import { useListSelection } from '../../hooks/useListSelection';
import { calculateListItemRoleForListRole, calculateListRole, validateListItemElement } from '../../utils';

const DEFAULT_ROOT_EL_TYPE = 'ul';

/**
 * Plain DOM approximation of Tabster's focus finders, used by the base hook which must stay free of
 * any Tabster runtime.
 */
const FOCUSABLE_SELECTOR =
  'a[href], area[href], button, input, select, textarea, iframe, ' +
  '[contenteditable=""], [contenteditable="true" i], [contenteditable="plaintext-only" i], [tabindex]';
const NON_FOCUSABLE_SELECTOR = ':disabled, [hidden], input[type="hidden"], [tabindex^="-"]';

/**
 * Create the state required to render List.
 *
 * The returned state can be modified with hooks such as useListStyles_unstable,
 * before being passed to renderList_unstable.
 *
 * @param props - props from this instance of List
 * @param ref - reference to root HTMLElement of List
 */
export const useList_unstable = (
  props: ListProps,
  ref: React.Ref<HTMLDivElement | HTMLUListElement | HTMLOListElement>,
): ListState => {
  const state = useListBase_unstable(props, ref);

  const { navigationMode, selectionMode } = props;
  const as = props.as || (navigationMode === 'composite' ? 'div' : DEFAULT_ROOT_EL_TYPE);
  const listRole = props.role || calculateListRole(navigationMode, !!selectionMode);

  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'vertical',
    memorizeCurrent: true,
  });

  const { findAllFocusable } = useFocusFinders();

  const validateListItem = useEventCallback((listItemEl: HTMLElement) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    validateListItemElement(listItemEl, {
      listRenderedAs: as,
      listRole,
      hasSelection: !!selectionMode,
      hasFocusableChildren: findAllFocusable(listItemEl).length > 0,
    });
  });

  return {
    ...state,
    validateListItem,
    // Consumer props keep winning over the navigation attributes, matching the base slot ordering.
    root: { ...arrowNavigationAttributes, ...state.root },
  };
};

/**
 * Base state hook for List, free of any focus or keyboard navigation runtime.
 *
 * Arrow key navigation is layered on by the wrapping `useList_unstable` hook, so consumers of this
 * hook are expected to bring their own focus management.
 *
 * @param props - props from this instance of List
 * @param ref - reference to root HTMLElement of List
 */
export const useListBase_unstable = (
  props: ListProps,
  ref: React.Ref<HTMLDivElement | HTMLUListElement | HTMLOListElement>,
): ListState => {
  const { navigationMode, selectionMode, selectedItems, defaultSelectedItems, onSelectionChange } = props;

  const as = props.as || (navigationMode === 'composite' ? 'div' : DEFAULT_ROOT_EL_TYPE);

  const [selectionState, setSelectionState] = useControllableState({
    state: selectedItems,
    defaultState: defaultSelectedItems,
    initialState: [],
  });

  const onChange = useEventCallback((e: React.SyntheticEvent, data: OnSelectionChangeData) => {
    const selectedItemsAsArray = Array.from(data.selectedItems);
    setSelectionState(selectedItemsAsArray);
    onSelectionChange?.(e, { event: e, type: 'change', selectedItems: selectedItemsAsArray });
  });

  const selection = useListSelection({
    onSelectionChange: onChange,
    selectionMode: selectionMode || 'multiselect',
    selectedItems: selectionState,
  });

  const listRole = props.role || calculateListRole(navigationMode, !!selectionMode);
  const listItemRole = calculateListItemRoleForListRole(listRole);

  const validateListItem = useEventCallback((listItemEl: HTMLElement) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    validateListItemElement(listItemEl, {
      listRenderedAs: as,
      listRole,
      hasSelection: !!selectionMode,
      hasFocusableChildren: Array.from(listItemEl.querySelectorAll(FOCUSABLE_SELECTOR)).some(
        element => !element.matches(NON_FOCUSABLE_SELECTOR),
      ),
    });
  });

  return {
    components: {
      root: as,
    },
    root: slot.always(
      getIntrinsicElementProps(as, {
        ref,
        ...(selectionMode && {
          'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
        }),
        ...props,
        role: listRole,
      }),
      { elementType: as },
    ),
    listItemRole,
    validateListItem,
    navigationMode,
    // only pass down selection state if its handled internally, otherwise just report the events
    selection: selectionMode ? selection : undefined,
  };
};
