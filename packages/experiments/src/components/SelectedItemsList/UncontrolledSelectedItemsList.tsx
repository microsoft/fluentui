import * as React from 'react';
import { Selection } from 'office-ui-fabric-react/lib/Selection';

import {
  IUncontrolledSelectedItemsList,
  IControlledSelectedItemsList,
  IUncontrolledSelectedItemListProps,
  BaseSelectedItem
} from './SelectedItemsList.types';
import { useSelectionIndices } from '../../utilities/useSelectionIndices';
import { ControlledSelectedItemsList } from './ControlledSelectedItemsList';

export const useSelectedItemListState = <TSelectedItem extends any>(defaultSelectedItems: TSelectedItem[] | undefined) => {
  const [selectedItems, setSelectedItems] = React.useState(defaultSelectedItems || []);

  const removeSelectedItems = React.useCallback(
    (removedItems: TSelectedItem[]) => {
      // Update internal state if it is tracked at all
      const nextSelectedItems = selectedItems.filter(i => removedItems.indexOf(i) === -1);
      if (nextSelectedItems.length !== selectedItems.length - removedItems.length) {
        console.error('removeSelectedItems called on some item not in the current state');
      }
      setSelectedItems(nextSelectedItems);
    },
    [selectedItems]
  );

  const replaceSelectedItem = React.useCallback(
    (newItem: TSelectedItem | TSelectedItem[], index: number): void => {
      const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

      if (index >= 0) {
        const newItems: TSelectedItem[] = [...selectedItems];
        newItems.splice(index, 1, ...newItemsArray);
        setSelectedItems(newItems);
      }
    },
    [setSelectedItems, selectedItems]
  );

  const appendSelectedItems = React.useCallback(
    (itemsToAppend: TSelectedItem[]) => {
      setSelectedItems(selectedItems.concat(itemsToAppend));
    },
    [selectedItems]
  );

  return {
    selectedItems,
    setSelectedItems,
    removeSelectedItems,
    replaceSelectedItem,
    appendSelectedItems
  };
};

/**
 * A self-managed selected item list.
 */
export const UncontrolledSelectedItemsList = <TItem extends BaseSelectedItem>(props: IUncontrolledSelectedItemListProps<TItem>) => {
  const selection = React.useMemo(() => props.selection || new Selection(), [props.selection]);
  const selectedIndices = useSelectionIndices(selection);

  const { selectedItems, removeSelectedItems, replaceSelectedItem, appendSelectedItems } = useSelectedItemListState(
    props.defaultSelectedItems
  );

  // Selection which initializes at the beginning of the component and
  // only updates if selection becomes set in props (e.g component transitions from
  // being controlled to uncontrolled)
  const itemsInSelection = React.useMemo(() => selectedIndices.filter(i => i > 0 && i < selectedItems.length).map(i => selectedItems[i]), [
    selectedItems,
    selectedIndices
  ]);

  const unselectAll = React.useCallback(() => {
    selection.setAllSelected(false);
  }, [selectedItems]);

  const controlledRef = React.useRef<IControlledSelectedItemsList>(null);
  const copyItemsInSelectionToClipboard = React.useCallback(() => {
    controlledRef.current && controlledRef.current.copyItemsInSelectionToClipboard();
  }, [controlledRef]);

  // For usage as a controlled component with a ref
  React.useImperativeHandle(
    props.componentRef,
    (): IUncontrolledSelectedItemsList<TItem> => ({
      items: selectedItems,
      addItems: appendSelectedItems,
      removeItems: removeSelectedItems,
      itemsInSelection,
      unselectAll,
      copyItemsInSelectionToClipboard
    }),
    [selectedItems, itemsInSelection, appendSelectedItems, unselectAll, removeSelectedItems, copyItemsInSelectionToClipboard]
  );

  return (
    <ControlledSelectedItemsList<TItem>
      componentRef={controlledRef}
      // pass-through props
      getItemCopyText={props.getItemCopyText}
      onRenderItem={props.onRenderItem}
      removeButtonAriaLabel={props.removeButtonAriaLabel}
      canRemoveItem={props.canRemoveItem}
      // props that are internal to the uncontrolled component
      selection={selection}
      selectedItems={selectedItems}
      onItemsRemoved={removeSelectedItems}
      onItemChange={replaceSelectedItem}
    />
  );
};
export type UncontrolledSelectedItemsList<TItem extends BaseSelectedItem> = (
  props: IUncontrolledSelectedItemListProps<TItem>
) => React.ReactElement;
(UncontrolledSelectedItemsList as any).displayName = 'UncontrolledSelectedItemsList';
