import * as React from 'react';
import { Selection } from '../../Selection';

import { IBaseSelectedItemsList, IBaseSelectedItemsListProps, ISelectedItemProps } from './BaseSelectedItemsList.types';
import { initializeComponentRef } from '../../Utilities';

export interface IBaseSelectedItemsListState<T = any> {
  items: T[];
  selection: Selection;
}

export class BaseSelectedItemsList<T, P extends IBaseSelectedItemsListProps<T>>
  extends React.Component<P, IBaseSelectedItemsListState<T>>
  implements IBaseSelectedItemsList<T> {
  protected root: HTMLElement;

  public static getDerivedStateFromProps(newProps: IBaseSelectedItemsListProps<any>) {
    const updatedState: Partial<IBaseSelectedItemsListState<any>> = {};

    let hasUpdate: boolean = false;

    if (newProps.selectedItems) {
      updatedState.items = newProps.selectedItems;
      hasUpdate = true;
    }
    if (newProps.selection) {
      updatedState.selection = newProps.selection;
      hasUpdate = true;
    }

    return hasUpdate ? updatedState : null;
  }
  constructor(basePickerProps: P) {
    super(basePickerProps);

    initializeComponentRef(this);
    const items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    // Create a new selection if one is not specified
    const selection = this.props.selection
      ? (this.props.selection as Selection)
      : new Selection({ onSelectionChanged: this.onSelectionChanged });
    this.state = {
      items: items,
      selection: selection,
    };
  }

  public get items(): T[] {
    return this.state.items;
  }

  public addItems = (items: T[]): void => {
    const processedItems: T[] | PromiseLike<T[]> = this.props.onItemSelected
      ? (this.props.onItemSelected as any)(items)
      : items;

    const processedItemObjects: T[] = processedItems as T[];
    const processedItemPromiseLikes: PromiseLike<T[]> = processedItems as PromiseLike<T[]>;

    if (processedItemPromiseLikes && processedItemPromiseLikes.then) {
      processedItemPromiseLikes.then((resolvedProcessedItems: T[]) => {
        const newItems: T[] = this.state.items.concat(resolvedProcessedItems);
        this.updateItems(newItems);
      });
    } else {
      const newItems: T[] = this.state.items.concat(processedItemObjects);
      this.updateItems(newItems);
    }
  };

  public removeItemAt = (index: number): void => {
    const { items } = this.state;

    if (this._canRemoveItem(items[index])) {
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
    const { items } = this.state;
    const index: number = items.indexOf(item);

    this.removeItemAt(index);
  };

  public replaceItem = (itemToReplace: T, itemsToReplaceWith: T[]): void => {
    const { items } = this.state;
    const index: number = items.indexOf(itemToReplace);
    if (index > -1) {
      const newItems = items
        .slice(0, index)
        .concat(itemsToReplaceWith)
        .concat(items.slice(index + 1));
      this.updateItems(newItems);
    }
  };

  public removeItems = (itemsToRemove: any[]): void => {
    const { items } = this.state;
    const itemsCanRemove = itemsToRemove.filter((item: any) => this._canRemoveItem(item));
    const newItems: T[] = items.filter((item: any) => itemsCanRemove.indexOf(item) === -1);
    const firstItemToRemove = itemsCanRemove[0];
    const index: number = items.indexOf(firstItemToRemove);

    if (this.props.onItemsDeleted) {
      (this.props.onItemsDeleted as (item: T[]) => void)(itemsCanRemove);
    }

    this.updateItems(newItems, index);
  };

  public removeSelectedItems(): void {
    if (this.state.items.length && this.selection.getSelectedCount() > 0) {
      this.removeItems(this.selection.getSelection());
    }
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided, this will act as a controlled component and will not update its own state.
   */
  public updateItems(items: T[], focusIndex?: number): void {
    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need to pass the new props
      this.onChange(items);
    } else {
      this.setState({ items: items }, () => {
        this._onSelectedItemsUpdated(items, focusIndex);
      });
    }
  }

  public onCopy = (ev: React.ClipboardEvent<HTMLElement>): void => {
    if (this.props.onCopyItems && this.selection.getSelectedCount() > 0) {
      const selectedItems: T[] = this.selection.getSelection() as T[];
      this.copyItems(selectedItems);
    }
  };

  public hasSelectedItems(): boolean {
    return this.selection.getSelectedCount() > 0;
  }

  public unselectAll(): void {
    this.selection.setAllSelected(false);
  }

  public highlightedItems(): T[] {
    return this.selection.getSelection() as T[];
  }

  public componentDidUpdate(oldProps: P, oldState: IBaseSelectedItemsListState) {
    if (this.state.items && this.state.items !== oldState.items) {
      this.selection.setItems(this.state.items);
    }
  }

  public componentDidMount(): void {
    this.selection.setItems(this.state.items);
  }

  public render(): any {
    return this.renderItems();
  }

  protected get selection(): Selection {
    return this.state.selection;
  }

  protected set selection(select: Selection) {
    this.setState({ selection: select });
  }

  protected renderItems = (): JSX.Element[] => {
    const { removeButtonAriaLabel } = this.props;
    const onRenderItem = this.props.onRenderItem as (props: ISelectedItemProps<T>) => JSX.Element;

    const { items } = this.state;
    return items.map((item: any, index: number) =>
      onRenderItem({
        item,
        index,
        key: item.key ? item.key : index,
        selected: this.selection.isIndexSelected(index),
        onRemoveItem: () => this.removeItem(item),
        onItemChange: this.onItemChange,
        removeButtonAriaLabel: removeButtonAriaLabel,
        onCopyItem: (itemToCopy: T) => this.copyItems([itemToCopy]),
      }),
    );
  };

  protected onSelectionChanged = (): void => {
    this.forceUpdate();
  };

  protected onChange(items?: T[]): void {
    if (this.props.onChange) {
      (this.props.onChange as (items?: T[]) => void)(items);
    }
  }

  protected onItemChange = (changedItem: T, index: number): void => {
    const { items } = this.state;

    if (index >= 0) {
      const newItems: T[] = items;
      newItems[index] = changedItem;

      this.updateItems(newItems);
    }
  };

  protected copyItems(items: T[]): void {
    if (this.props.onCopyItems) {
      const copyText = (this.props.onCopyItems as any)(items);

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

  private _onSelectedItemsUpdated(items?: T[], focusIndex?: number): void {
    this.onChange(items);
  }

  private _canRemoveItem(item: T): boolean {
    return !this.props.canRemoveItem || this.props.canRemoveItem(item);
  }
}
