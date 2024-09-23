import * as React from 'react';
import {
  getIntrinsicElementProps,
  OnSelectionChangeData,
  slot,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import { ListProps, ListState } from './List.types';
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
  const {
    navigationMode,
    selectionMode,
    selectedItems,
    defaultSelectedItems,
    as = DEFAULT_ROOT_EL_TYPE,
    onSelectionChange,
  } = props;

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
      root: DEFAULT_ROOT_EL_TYPE,
    },
    root: slot.always(
      getIntrinsicElementProps(DEFAULT_ROOT_EL_TYPE, {
        ref,
        role: listRole,
        ...(selectionMode && {
          'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
        }),
        ...arrowNavigationAttributes,
        ...props,
      }),
      { elementType: DEFAULT_ROOT_EL_TYPE },
    ),
    listItemRole,
    validateListItem,
    navigationMode,
    // only pass down selection state if its handled internally, otherwise just report the events
    selection: selectionMode ? selection : undefined,
  };
};
