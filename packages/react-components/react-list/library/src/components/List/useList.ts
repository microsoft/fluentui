'use client';

import * as React from 'react';
import {
  getIntrinsicElementProps,
  OnSelectionChangeData,
  slot,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import { ListBaseProps, ListBaseState, ListProps, ListState } from './List.types';
import { useListSelection } from '../../hooks/useListSelection';
import {
  calculateListItemRoleForListRole,
  calculateListRole,
  validateGridCellsArePresent,
  validateProperElementTypes,
  validateProperRolesAreUsed,
} from '../../utils';

const DEFAULT_ROOT_EL_TYPE = 'ul';

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
  return useListBase_unstable(props, ref);
};

/**
 * Base hook for List component, which manages state related to ARIA, keyboard navigation,
 * selection, and slot structure. List has no design-specific props, so this hook contains
 * the full component logic.
 *
 * @param props - User provided props to the List component.
 * @param ref - User provided ref to be passed to the List component.
 */
export const useListBase_unstable = (
  props: ListBaseProps,
  ref: React.Ref<HTMLDivElement | HTMLUListElement | HTMLOListElement>,
): ListBaseState => {
  const { navigationMode, selectionMode, selectedItems, defaultSelectedItems, onSelectionChange } = props;

  const as = props.as || navigationMode === 'composite' ? 'div' : DEFAULT_ROOT_EL_TYPE;

  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'vertical',
    memorizeCurrent: true,
  });

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

  const { findAllFocusable } = useFocusFinders();

  const validateListItem = useEventCallback((listItemEl: HTMLElement) => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    const itemRole = listItemEl.getAttribute('role') || '';
    const focusable = findAllFocusable(listItemEl);
    validateProperElementTypes(as, listItemEl.tagName.toLocaleLowerCase());
    validateProperRolesAreUsed(listRole, itemRole, !!selectionMode, focusable.length > 0);
    validateGridCellsArePresent(listRole, listItemEl);
  });

  return {
    components: {
      root: as,
    },
    root: slot.always(
      getIntrinsicElementProps(as, {
        ref,
        role: listRole,
        ...(selectionMode && {
          'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
        }),
        ...arrowNavigationAttributes,
        ...props,
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
