import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { Selection } from 'office-ui-fabric-react/lib/Selection';

import { ISelectedItemsList, ISelectedItemsListProps, BaseSelectedItem } from './SelectedItemsList.types';
import { copyToClipboard } from './utils/copyToClipboard';

export interface ISelectedItemsListState<T = any> {
  items: T[];
}

export class SelectedItemsList<TItem extends BaseSelectedItem>
  extends BaseComponent<ISelectedItemsListProps<TItem>, ISelectedItemsListState<TItem>>
  implements ISelectedItemsList<TItem> {
  protected root: HTMLElement;
  protected selection: Selection;

  constructor(basePickerProps: ISelectedItemsListProps<TItem>) {
    super(basePickerProps);

    const items: TItem[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];
    this.state = {
      items: items
    };

    // Create a new selection if one is not specified
    this.selection = this.props.selection
      ? (this.props.selection as Selection)
      : new Selection({ onSelectionChanged: this.onSelectionChanged });
  }

  public get items(): TItem[] {
    return this.state.items;
  }

  public addItems = (items: TItem[]): void => {
    // tslint:disable-next-line:no-any
    const processedItems: TItem[] | PromiseLike<TItem[]> = this.props.onItemSelected ? (this.props.onItemSelected as any)(items) : items;

    const processedItemObjects: TItem[] = processedItems as TItem[];
    const processedItemPromiseLikes: PromiseLike<TItem[]> = processedItems as PromiseLike<TItem[]>;

    if (processedItemPromiseLikes && processedItemPromiseLikes.then) {
      processedItemPromiseLikes.then((resolvedProcessedItems: TItem[]) => {
        const newItems: TItem[] = this.state.items.concat(resolvedProcessedItems);
        this.updateItems(newItems);
      });
    } else {
      const newItems: TItem[] = this.state.items.concat(processedItemObjects);
      this.updateItems(newItems);
    }
  };

  public removeItemAt = (index: number): void => {
    const { items } = this.state;

    if (this._canRemoveItem(items[index])) {
      if (index > -1) {
        if (this.props.onItemsDeleted) {
          (this.props.onItemsDeleted as (item: TItem[]) => void)([items[index]]);
        }

        const newItems = items.slice(0, index).concat(items.slice(index + 1));
        this.updateItems(newItems);
      }
    }
  };

  public removeItem = (item: TItem): void => {
    const { items } = this.state;
    const index: number = items.indexOf(item);

    this.removeItemAt(index);
  };

  public replaceItem = (itemToReplace: TItem, itemsToReplaceWith: TItem[]): void => {
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

  // tslint:disable-next-line:no-any
  public removeItems = (itemsToRemove: any[]): void => {
    const { items } = this.state;
    const itemsCanRemove = itemsToRemove.filter((item: any) => this._canRemoveItem(item));
    // tslint:disable-next-line:no-any
    const newItems: TItem[] = items.filter((item: any) => itemsCanRemove.indexOf(item) === -1);
    const firstItemToRemove = itemsCanRemove[0];
    const index: number = items.indexOf(firstItemToRemove);

    if (this.props.onItemsDeleted) {
      (this.props.onItemsDeleted as (item: TItem[]) => void)(itemsCanRemove);
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
   * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
   */
  public updateItems(items: TItem[], focusIndex?: number): void {
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
      const selectedItems: TItem[] = this.selection.getSelection() as TItem[];
      this.copyItems(selectedItems);
    }
  };

  public hasSelectedItems(): boolean {
    return this.selection.getSelectedCount() > 0;
  }

  public unselectAll(): void {
    this.selection.setAllSelected(false);
  }

  public highlightedItems(): TItem[] {
    return this.selection.getSelection() as TItem[];
  }

  public componentWillUpdate(newProps: ISelectedItemsListProps<TItem>, newState: ISelectedItemsListState): void {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  }

  public componentDidMount(): void {
    this.selection.setItems(this.state.items);
  }

  public componentWillReceiveProps(newProps: ISelectedItemsListProps<TItem>): void {
    const newItems = newProps.selectedItems;

    if (newItems) {
      this.setState({ items: newItems });
    }

    if (newProps.selection) {
      this.selection = newProps.selection;
    }
  }

  // tslint:disable-next-line:no-any
  public render(): any {
    return this.renderItems();
  }

  protected renderItems = (): JSX.Element[] => {
    const { removeButtonAriaLabel } = this.props;
    const SelectedItem = this.props.onRenderItem;

    const { items } = this.state;
    return items.map((item: TItem, index: number) => (
      <SelectedItem
        item={item}
        index={index}
        key={item.key !== undefined ? item.key : index}
        selected={this.selection.isIndexSelected(index)}
        onRemoveItem={this.removeItem}
        onItemChange={this.onItemChange}
        removeButtonAriaLabel={removeButtonAriaLabel}
        onCopyItem={this._onCopyItem}
      />
    ));
  };

  protected _onCopyItem = (item: TItem) => this.copyItems([item]);

  protected onSelectionChanged = (): void => {
    this.forceUpdate();
  };

  protected onChange(items?: TItem[]): void {
    if (this.props.onChange) {
      (this.props.onChange as (items?: TItem[]) => void)(items);
    }
  }

  protected onItemChange = (newItem: TItem | TItem[], index: number): void => {
    const { items } = this.state;
    const newItemsArray = !Array.isArray(newItem) ? [newItem] : newItem;

    if (index >= 0) {
      const newItems: TItem[] = [...items];
      newItems.splice(index, 1, ...newItemsArray);
      this.updateItems(newItems);
    }
  };

  protected copyItems(items: TItem[]): void {
    if (this.props.onCopyItems) {
      // tslint:disable-next-line:no-any
      const copyText = (this.props.onCopyItems as any)(items);
      copyToClipboard(copyText);
    }
  }

  private _onSelectedItemsUpdated(items?: TItem[], focusIndex?: number): void {
    this.onChange(items);
  }

  private _canRemoveItem(item: TItem): boolean {
    return !this.props.canRemoveItem || this.props.canRemoveItem(item);
  }
}
