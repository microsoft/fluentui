import * as React from 'react';
import { Selection } from '../../Selection';

import { IBaseSelectedItemsList, IBaseSelectedItemsListProps, ISelectedItemProps } from './BaseSelectedItemsList.types';
import { initializeComponentRef } from '../../Utilities';
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

export const BaseSelectedItemsList = <T extends IObjectWithKey>(props: IBaseSelectedItemsListProps<T>) => {
  const [items, setItems] = useControllableValue(
    props.selectedItems,
    props.defaultSelectedItems || [],
    (ev, newItems) => props.onChange?.(items),
  );
  const selection = useSelection(props, items!);

  const canRemoveItem = (item: T): boolean => {
    return !props.canRemoveItem || props.canRemoveItem(item);
  };

  return (
    <BaseSelectedItemsListClass
      {...props}
      hoistedProps={{ items: items!, setItems: setItems as any, selection, canRemoveItem }}
    />
  );
};
BaseSelectedItemsList.displayName = 'BaseSelectedItemsList';

interface IBaseSelectedItemsListClassProps<T> extends IBaseSelectedItemsListProps<T> {
  hoistedProps: {
    items: T[];
    setItems: (items: T[]) => void;
    selection: Selection;
    canRemoveItem: (item: T) => boolean;
  };
}

class BaseSelectedItemsListClass<T extends IObjectWithKey, P extends IBaseSelectedItemsListClassProps<T>>
  extends React.Component<P, {}>
  implements IBaseSelectedItemsList<T> {
  protected root: HTMLElement;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    initializeComponentRef(this);
  }

  public get items(): T[] {
    return this.props.hoistedProps.items;
  }

  public addItems = async (items: T[]): Promise<void> => {
    const processedItems: T | T[] = this.props.onItemSelected ? await this.props.onItemSelected(items) : items;

    const processedItemObjects: T[] = Array.isArray(processedItems) ? processedItems : [processedItems];

    const newItems: T[] = this.props.hoistedProps.items.concat(processedItemObjects);
    this.updateItems(newItems);
  };

  public removeItemAt = (index: number): void => {
    const { items } = this.props.hoistedProps;

    if (this.props.hoistedProps.canRemoveItem(items[index])) {
      if (index > -1) {
        if (this.props.onItemsDeleted) {
          (this.props.onItemsDeleted as (item: T[]) => void)([items[index]]);
        }

        const newItems = items.slice(0, index).concat(items.slice(index + 1));
        this.updateItems(newItems);
      }
    }
  };

  public removeItem = (item: T): void => {
    const { items } = this.props.hoistedProps;
    const index: number = items.indexOf(item);

    this.removeItemAt(index);
  };

  public replaceItem = (itemToReplace: T, itemsToReplaceWith: T | T[]): void => {
    const { items } = this.props.hoistedProps;
    const index: number = items.indexOf(itemToReplace);
    if (index > -1) {
      const newItems = [...items];
      newItems.splice(index, 1, ...(Array.isArray(itemsToReplaceWith) ? itemsToReplaceWith : [itemsToReplaceWith]));
      this.updateItems(newItems);
    }
  };

  public removeItems = (itemsToRemove: T[]): void => {
    const { items } = this.props.hoistedProps;
    const itemsCanRemove = itemsToRemove.filter(item => this.props.hoistedProps.canRemoveItem(item));
    const newItems: T[] = items.filter(item => itemsCanRemove.indexOf(item) === -1);

    if (this.props.onItemsDeleted) {
      (this.props.onItemsDeleted as (item: T[]) => void)(itemsCanRemove);
    }

    this.updateItems(newItems);
  };

  public removeSelectedItems(): void {
    if (this.props.hoistedProps.items.length && this.props.hoistedProps.selection.getSelectedCount() > 0) {
      this.removeItems(this.props.hoistedProps.selection.getSelection() as T[]);
    }
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided, this will act as a controlled component and will not update its own state.
   */
  public updateItems(items: T[]): void {
    this.props.hoistedProps.setItems(items);
  }

  public onCopy = (ev: React.ClipboardEvent<HTMLElement>): void => {
    if (this.props.onCopyItems && this.props.hoistedProps.selection.getSelectedCount() > 0) {
      const selectedItems: T[] = this.props.hoistedProps.selection.getSelection() as T[];
      this.copyItems(selectedItems);
    }
  };

  public hasSelectedItems(): boolean {
    return this.props.hoistedProps.selection.getSelectedCount() > 0;
  }

  public unselectAll(): void {
    this.props.hoistedProps.selection.setAllSelected(false);
  }

  public highlightedItems(): T[] {
    return this.props.hoistedProps.selection.getSelection() as T[];
  }

  public copyItems(items: T[]): void {
    if (this.props.onCopyItems) {
      const copyText = this.props.onCopyItems(items);

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
  }

  public render() {
    const { removeButtonAriaLabel } = this.props;
    const onRenderItem = this.props.onRenderItem as (props: ISelectedItemProps<T>) => JSX.Element;

    const { items } = this.props.hoistedProps;
    return items.map((item: T, index: number) =>
      onRenderItem({
        item,
        index,
        key: item.key ? item.key : index,
        selected: this.props.hoistedProps.selection.isIndexSelected(index),
        onRemoveItem: () => this.removeItem(item),
        onItemChange: this.onItemChange,
        removeButtonAriaLabel: removeButtonAriaLabel,
        onCopyItem: (itemToCopy: T) => this.copyItems([itemToCopy]),
      }),
    );
  }

  protected onItemChange = (changedItem: T, index: number): void => {
    const { items } = this.props.hoistedProps;

    if (index >= 0) {
      const newItems: T[] = items;
      newItems[index] = changedItem;

      this.updateItems(newItems);
    }
  };
}
