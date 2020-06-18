import * as React from 'react';
import { Selection } from '../../Selection';

import { IBaseSelectedItemsListProps } from './BaseSelectedItemsList.types';
import { IObjectWithKey } from '../../Utilities';
import { useControllableValue, useForceUpdate, useConst } from '@uifabric/react-hooks';

function useSelection<T extends IObjectWithKey>(props: IBaseSelectedItemsListProps<T>, items: T[] = []) {
  const forceUpdate = useForceUpdate();
  const defaultSelection = useConst(() => new Selection({ onSelectionChanged: forceUpdate }));

  const selection = props.selection ?? defaultSelection;

  React.useEffect(() => {
    selection.setItems(items);
  }, [items]);

  return selection;
}

function useComponentRef<T extends IObjectWithKey>(
  props: IBaseSelectedItemsListProps<T>,
  selection: Selection,
  items: T[],
  setItems: (items: T[]) => void,
) {
  const canRemoveItem = (item: T): boolean => {
    return !props.canRemoveItem || props.canRemoveItem(item);
  };

  const addItems = async (itemsToAdd: T[]): Promise<void> => {
    const processedItems: T | T[] = props.onItemSelected ? await props.onItemSelected(itemsToAdd) : itemsToAdd;

    const processedItemObjects: T[] = Array.isArray(processedItems) ? processedItems : [processedItems];

    const newItems: T[] = items.concat(processedItemObjects);
    updateItems(newItems);
  };

  const removeItemAt = (index: number): void => {
    if (canRemoveItem(items[index])) {
      if (index > -1) {
        props.onItemsDeleted?.([items[index]]);

        const newItems = items.slice(0, index).concat(items.slice(index + 1));
        updateItems(newItems);
      }
    }
  };

  const removeItem = (item: T): void => {
    const index: number = items.indexOf(item);

    removeItemAt(index);
  };

  const replaceItem = (itemToReplace: T, itemsToReplaceWith: T | T[]): void => {
    const index: number = items.indexOf(itemToReplace);
    if (index > -1) {
      const newItems = [...items];
      newItems.splice(index, 1, ...(Array.isArray(itemsToReplaceWith) ? itemsToReplaceWith : [itemsToReplaceWith]));
      updateItems(newItems);
    }
  };

  const removeItems = (itemsToRemove: T[]): void => {
    const itemsCanRemove = itemsToRemove.filter(item => canRemoveItem(item));
    const newItems: T[] = items.filter(item => itemsCanRemove.indexOf(item) === -1);

    props.onItemsDeleted?.(itemsCanRemove);

    updateItems(newItems);
  };

  const removeSelectedItems = (): void => {
    if (items.length && selection.getSelectedCount() > 0) {
      removeItems(selection.getSelection() as T[]);
    }
  };

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided, this will act as a controlled component and will not update its own state.
   */
  const updateItems = (newItems: T[]): void => {
    setItems(newItems);
  };

  const onCopy = (ev: React.ClipboardEvent<HTMLElement>): void => {
    if (props.onCopyItems && selection.getSelectedCount() > 0) {
      const selectedItems: T[] = selection.getSelection() as T[];
      copyItems(selectedItems);
    }
  };

  const hasSelectedItems = (): boolean => {
    return selection.getSelectedCount() > 0;
  };

  const unselectAll = (): void => {
    selection.setAllSelected(false);
  };

  const highlightedItems = (): T[] => {
    return selection.getSelection() as T[];
  };

  const copyItems = (itemsToCopy: T[]): void => {
    if (props.onCopyItems) {
      const copyText = props.onCopyItems(itemsToCopy);

      const copyInput = document.createElement('input') as HTMLInputElement;
      document.body.appendChild(copyInput);

      try {
        // Try to copy the text directly to the clipboard
        copyInput.value = copyText;
        copyInput.select();
        if (!document.execCommand('copy')) {
          // The command failed. Fallback to the method below.
          throw new Error();
        }
      } catch (err) {
        // no op
      } finally {
        document.body.removeChild(copyInput);
      }
    }
  };

  const onItemChange = (changedItem: T, index: number): void => {
    if (index >= 0) {
      const newItems: T[] = items;
      newItems[index] = changedItem;

      updateItems(newItems);
    }
  };

  const publicMethods = {
    get items() {
      return items;
    },
    addItems,
    removeItemAt,
    removeItem,
    replaceItem,
    removeItems,
    removeSelectedItems,
    updateItems,
    onCopy,
    hasSelectedItems,
    unselectAll,
    highlightedItems,
    copyItems,
    onItemChange,
  };

  React.useImperativeHandle(props.componentRef, () => publicMethods, [publicMethods]);

  return publicMethods;
}

export const BaseSelectedItemsList = <T extends IObjectWithKey>(
  props: IBaseSelectedItemsListProps<T>,
): JSX.Element[] => {
  const [items = [], setItems] = useControllableValue(
    props.selectedItems,
    props.defaultSelectedItems || [],
    (ev, newItems) => props.onChange?.(newItems),
  );
  const selection = useSelection(props, items);
  const publicMethods = useComponentRef(props, selection, items, setItems);

  const { removeButtonAriaLabel, onRenderItem } = props;

  return onRenderItem
    ? items.map((item: T, index: number) =>
        onRenderItem({
          item,
          index,
          key: item.key ? item.key : index,
          selected: selection.isIndexSelected(index),
          onRemoveItem: () => publicMethods.removeItem(item),
          onItemChange: publicMethods.onItemChange,
          removeButtonAriaLabel: removeButtonAriaLabel,
          onCopyItem: (itemToCopy: T) => publicMethods.copyItems([itemToCopy]),
        }),
      )
    : [];
};
BaseSelectedItemsList.displayName = 'BaseSelectedItemsList';
