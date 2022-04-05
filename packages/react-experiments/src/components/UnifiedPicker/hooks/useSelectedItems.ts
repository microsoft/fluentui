import * as React from 'react';
import { Selection } from '../../../Utilities';

export interface IUseSelectedItemsResponse<T> {
  selectedItems: T[];
  setSelectedItems: (items: T[]) => void;
  addItems: (items: T[]) => void;
  dropItemsAt: (insertIndex: number, itemsToAdd: T[], indicesToRemove: number[]) => void;
  removeItemAt: (index: number) => void;
  removeItem: (item: T) => void;
  replaceItem: (itemToReplace: T, itemsToReplaceWith: T[]) => void;
  removeItems: (itemsToRemove: T[], indicesToRemove: number[]) => void;
  removeSelectedItems: () => void;
  getSelectedItems: () => T[];
  hasSelectedItems: () => boolean;
  unselectAll: () => void;
  selectAll: () => void;
}

export const useSelectedItems = <T extends {}>(
  selection: Selection,
  selectedItems?: T[],
): IUseSelectedItemsResponse<T> => {
  const [items, setSelectedItems] = React.useState(selectedItems || []);

  React.useEffect(
    () => {
      if (selectedItems !== undefined) {
        selection.setItems(selectedItems);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- we want to do this once
    [],
  );

  React.useEffect(() => {
    setSelectedItems(selectedItems ? selectedItems : []);
  }, [selectedItems]);

  const addItems = React.useCallback(
    (itemsToAdd: T[]): void => {
      const newItems: T[] = items.concat(itemsToAdd);
      setSelectedItems(newItems);
      selection.setItems(newItems);
    },
    [items, selection],
  );

  const dropItemsAt = React.useCallback(
    (insertIndex: number, itemsToAdd: T[], indicesToRemove: number[]): void => {
      const currentItems: T[] = [...items];
      const updatedItems: T[] = [];

      for (let i = 0; i < currentItems.length; i++) {
        const item = currentItems[i];
        // If this is the insert before index, insert the dragged items, then the current item
        if (i === insertIndex) {
          itemsToAdd.forEach(draggedItem => {
            updatedItems.push(draggedItem);
          });
        }
        if (!indicesToRemove.includes(i)) {
          // only insert items into the new list that are not being dragged
          updatedItems.push(item);
        }
      }
      // if the insert index is at the end, add them now
      if (insertIndex === currentItems.length) {
        itemsToAdd.forEach(draggedItem => {
          updatedItems.push(draggedItem);
        });
      }
      setSelectedItems(updatedItems);
      selection.setItems(updatedItems);
    },
    [items, selection],
  );

  const removeItemAt = React.useCallback(
    (index: number): void => {
      const currentItems: T[] = [...items];
      const updatedItems: T[] = currentItems.slice(0, index).concat(currentItems.slice(index + 1));
      setSelectedItems(updatedItems);
      selection.setItems(updatedItems);
    },
    [items, selection],
  );

  const removeItem = React.useCallback(
    (item: T): void => {
      const currentItems: T[] = [...items];
      const index: number = currentItems.indexOf(item);
      removeItemAt(index);
    },
    [items, removeItemAt],
  );

  const replaceItem = React.useCallback(
    (itemToReplace: T, itemsToReplaceWith: T[]): void => {
      const currentItems: T[] = [...items];
      const index: number = items.indexOf(itemToReplace);

      if (index > -1) {
        const updatedItems = currentItems
          .slice(0, index)
          .concat(itemsToReplaceWith)
          .concat(currentItems.slice(index + 1));
        setSelectedItems(updatedItems);
        selection.setItems(updatedItems);
      }
    },
    [items, selection],
  );

  const removeItems = React.useCallback(
    (itemsToRemove: any[], indicesToRemove: number[]): void => {
      // we want to only remove specific items in case of duplicates of same item.
      const updatedItems: T[] = items.filter((item: T, index: number) => {
        return !indicesToRemove.includes(index);
      });
      setSelectedItems(updatedItems);
      selection.setItems(updatedItems);
    },
    [items, selection],
  );

  const hasSelectedItems = React.useCallback((): Boolean => {
    if (items.length && selection.getSelectedCount() > 0) {
      return true;
    } else {
      return false;
    }
  }, [items.length, selection]);

  const getSelectedItems = React.useCallback((): T[] => {
    if (hasSelectedItems()) {
      return selection.getSelection() as T[];
    } else {
      return [];
    }
  }, [hasSelectedItems, selection]);

  const getSelectedIndices = React.useCallback((): number[] => {
    if (hasSelectedItems()) {
      return selection.getSelectedIndices();
    } else {
      return [];
    }
  }, [hasSelectedItems, selection]);

  const removeSelectedItems = React.useCallback((): void => {
    removeItems(getSelectedItems(), getSelectedIndices());
  }, [getSelectedItems, removeItems, getSelectedIndices]);

  const unselectAll = React.useCallback((): void => {
    if (hasSelectedItems()) {
      selection.setAllSelected(false);
    }
  }, [hasSelectedItems, selection]);

  const selectAll = React.useCallback((): void => {
    selection.setAllSelected(true);
  }, [selection]);

  return {
    selectedItems: items,
    setSelectedItems: setSelectedItems,
    addItems: addItems,
    dropItemsAt: dropItemsAt,
    removeItemAt: removeItemAt,
    removeItem: removeItem,
    replaceItem: replaceItem,
    removeItems: removeItems,
    removeSelectedItems: removeSelectedItems,
    getSelectedItems: getSelectedItems,
    hasSelectedItems: hasSelectedItems,
    unselectAll: unselectAll,
    selectAll: selectAll,
  } as IUseSelectedItemsResponse<T>;
};
