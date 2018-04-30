import * as React from 'react';
import {
  BaseComponent,
  KeyCodes
} from '../../Utilities';
import { Selection } from 'office-ui-fabric-react/lib/Selection';

import { IBaseSelectedItemsList, IBaseSelectedItemsListProps, ISelectedItemProps } from './BaseSelectedItemsList.types';

export interface IBaseSelectedItemsListState {
  // tslint:disable-next-line:no-any
  items?: any;
  suggestedDisplayValue?: string;
  moreSuggestionsAvailable?: boolean;
  isSearching?: boolean;
  isMostRecentlyUsedVisible?: boolean;
  suggestionsVisible?: boolean;
  suggestionsLoading?: boolean;
  isResultsFooterVisible?: boolean;
}

export class BaseSelectedItemsList<T, P extends IBaseSelectedItemsListProps<T>>
  extends BaseComponent<P, IBaseSelectedItemsListState> implements IBaseSelectedItemsList<T> {

  protected root: HTMLElement;
  protected selection: Selection;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    const items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];
    this.state = {
      items: items,
    };

    // Create a new selection if one is not specified
    this.selection = this.props.selection
      ? this.props.selection as Selection
      : new Selection({ onSelectionChanged: this.onSelectionChanged });
  }

  public get items(): T[] {
    return this.state.items;
  }

  public addItems = (items: T[]): void => {
    // tslint:disable-next-line:no-any
    const processedItems: T[] | PromiseLike<T[]> = this.props.onItemSelected ? (this.props.onItemSelected as any)(items) : items;

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
    this.setState({ suggestedDisplayValue: '' });
  }

  public removeItemAt = (index: number): void => {
    const { items } = this.state;
    // tslint:disable-next-line:no-any
    if (index > -1) {
      if (this.props.onItemDeleted) {
        (this.props.onItemDeleted as (item: T) => void)(items[index]);
      }

      const newItems = items.slice(0, index).concat(items.slice(index + 1));
      this.updateItems(newItems);
    }
  }

  public removeItem = (item: ISelectedItemProps<T>): void => {
    const { items } = this.state;
    const index: number = items.indexOf(item);

    this.removeItemAt(index);
  }

  // tslint:disable-next-line:no-any
  public removeItems = (itemsToRemove: any[]): void => {
    const { items } = this.state;
    // tslint:disable-next-line:no-any
    const newItems: T[] = items.filter((item: any) => itemsToRemove.indexOf(item) === -1);
    const firstItemToRemove = itemsToRemove[0];
    const index: number = items.indexOf(firstItemToRemove);

    if (this.props.onItemDeleted) {
      itemsToRemove.forEach((item: T) => {
        (this.props.onItemDeleted as (item: T) => void)(item);
      });
    }

    this.updateItems(newItems, index);
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
  */
  public updateItems(items: T[], focusIndex?: number): void {
    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need
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
  }

  public unselectAll(): void {
    this.selection.setAllSelected(false);
  }

  public componentWillUpdate(newProps: P, newState: IBaseSelectedItemsListState): void {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  }

  public componentDidMount(): void {
    this.selection.setItems(this.state.items);
  }

  public componentWillReceiveProps(newProps: P): void {
    const newItems = newProps.selectedItems;

    if (newItems) {
      this.setState({ items: newProps.selectedItems });
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
    const onRenderItem = this.props.onRenderItem as (props: ISelectedItemProps<T>) => JSX.Element;

    const { items } = this.state;
    // tslint:disable-next-line:no-any
    return items.map((item: any, index: number) => onRenderItem({
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel,
      onCopyItem: (itemToCopy: T) => this.copyItems([itemToCopy]),
    }));
  }

  protected onSelectionChanged = (): void => {
    this.forceUpdate();
  }

  protected onChange(items?: T[]): void {
    if (this.props.onChange) {
      (this.props.onChange as (items?: T[]) => void)(items);
    }
  }

  protected onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    switch (ev.which) {
      case KeyCodes.backspace:
        ev.stopPropagation();
        this.onBackspace(ev);
        break;

      case KeyCodes.del:
        this.onBackspace(ev);
    }
  }

  protected onItemChange = (changedItem: T, index: number): void => {
    const { items } = this.state;

    if (index >= 0) {
      const newItems: T[] = items;
      newItems[index] = changedItem;

      this.updateItems(newItems);
    }
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void {
    if (this.state.items.length) {
      if (this.selection.getSelectedCount() > 0) {
        this.removeItems(this.selection.getSelection());
      } else {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  }

  protected copyItems(items: T[]): void {
    if (this.props.onCopyItems) {
      // tslint:disable-next-line:no-any
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

  protected _isFocusZoneInnerKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
    return false;
  }

  private _onSelectedItemsUpdated(items?: T[], focusIndex?: number): void {
    this.onChange(items);
  }
}