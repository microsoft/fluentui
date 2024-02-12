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
import { useListSelection } from '../../hooks/useListSelection';

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
export const useList_unstable = (props: ListProps, ref: React.Ref<HTMLDivElement | HTMLUListElement>): ListState => {
  const {
    layout = 'vertical',
    focusableItems = false,
    selectable = false,
    selectionMode = 'multiselect',
    selectedItems,
    defaultSelectedItems,
    as,
    onSelectionChange,
  } = props;

  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: focusableItems ? 'vertical' : layout === 'grid' ? 'grid-linear' : 'both',
    memorizeCurrent: true,
  });
  // const focusableGroupAttrs = useFocusableGroup();

  const [selectionState, setSelectionState] = useControllableState({
    state: selectedItems,
    defaultState: defaultSelectedItems,
    initialState: [],
  });

  const onChange = useEventCallback((e: React.SyntheticEvent, data: OnSelectionChangeData) => {
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

  return {
    components: {
      root: DEFAULT_ROOT_EL_TYPE,
    },
    root: slot.always(
      getIntrinsicElementProps(DEFAULT_ROOT_EL_TYPE, {
        ref,
        ...(selectable && {
          role: 'listbox',
          'aria-multiselectable': selectionMode === 'multiselect' ? true : undefined,
        }),
        // ...focusableGroupAttrs,
        ...arrowNavigationAttributes,
        ...props,
      }),
      { elementType: DEFAULT_ROOT_EL_TYPE },
    ),
    layout,
    // context:
    focusableItems,
    as: as || DEFAULT_ROOT_EL_TYPE,
    // only pass down selection state if its handled internally, otherwise just report the events
    selection: selectable ? selection : undefined,
  };
};
