import * as React from 'react';
import {
  getIntrinsicElementProps,
  OnSelectionChangeData,
  slot,
  useControllableState,
  useEventCallback,
} from '@fluentui/react-utilities';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { ListProps, ListState } from './List.types';
import { useListFeatures } from '../../hooks/useListFeatures';
import { useListSelection } from '../../hooks/useListSelection';

/**
 * Create the state required to render List.
 *
 * The returned state can be modified with hooks such as useListStyles_unstable,
 * before being passed to renderList_unstable.
 *
 * @param props - props from this instance of List
 * @param ref - reference to root HTMLElement of List
 */
export const useList_unstable = (props: ListProps, ref: React.Ref<HTMLElement>): ListState => {
  const {
    layout = 'vertical',
    focusableItems = false,
    // customArrowNavigationOptions,
    selectable = false,
    selectionMode = 'multiselect',
    selectedItems,
    defaultSelectedItems,
    onSelectionChange,
  } = props;

  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: layout === 'grid' ? 'grid-linear' : 'both',
    memorizeCurrent: true,
    // ...(customArrowNavigationOptions || {}),
  });

  const [items, setItems] = React.useState<Array<{ id: string | number }>>([]);

  const [selectionState, setSelectionState] = useControllableState({
    state: selectedItems,
    defaultState: defaultSelectedItems,
    initialState: [],
  });

  const onChange = useEventCallback((e: React.SyntheticEvent<Element, Event>, data: OnSelectionChangeData) => {
    const selectedItemsAsArray = Array.from(data.selectedItems);
    setSelectionState(selectedItemsAsArray);
    onSelectionChange?.(e, { selectedItems: selectedItemsAsArray });
  });

  const selection = useListSelection({
    onSelectionChange: onChange,
    selectionMode,
    selectedItems: selectionState,
    defaultSelectedItems,
  });

  const registerItem = useEventCallback((id: string | number) => {
    if (!items.find(item => item.id === id)) {
      setItems(current => [...current, { id }]);
    }
  });

  const deregisterItem = useEventCallback((id: string | number) => {
    if (items.find(k => k.id === id)) {
      setItems(current => current.filter(item => item.id !== id));
    }
  });

  return {
    components: {
      root: 'ul',
    },
    root: slot.always(
      getIntrinsicElementProps('ul', {
        ref,
        ...(selectable ? selection.getListProps() : {}),
        ...arrowNavigationAttributes,
        ...props,
      }),
      { elementType: 'ul' },
    ),
    layout,
    // context:
    focusableItems,
    items,
    registerItem: selectable ? registerItem : undefined,
    deregisterItem: selectable ? deregisterItem : undefined,
    // only pass down selection state if its handled internally, otherwise just report the events
    selection: selectable ? selection : undefined,
  };
};
