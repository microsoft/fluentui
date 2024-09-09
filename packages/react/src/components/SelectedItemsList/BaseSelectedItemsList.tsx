import * as React from 'react';
import { Selection } from '../../Selection';
import { initializeComponentRef } from '../../Utilities';
import type {
  IBaseSelectedItemsList,
  IBaseSelectedItemsListProps,
  ISelectedItemProps,
} from './BaseSelectedItemsList.types';
import type { IObjectWithKey } from '../../Utilities';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx } from '../../utilities/dom';

export interface IBaseSelectedItemsListState<T> {
  items: T[];
}

export class BaseSelectedItemsList<T extends {}, P extends IBaseSelectedItemsListProps<T>>
  extends React.Component<P, IBaseSelectedItemsListState<T>>
  implements IBaseSelectedItemsList<T>
{
  public static contextType = WindowContext;

  protected root: HTMLElement;
  private _defaultSelection: Selection;

  public static getDerivedStateFromProps(newProps: IBaseSelectedItemsListProps<any>) {
    if (newProps.selectedItems) {
      return { items: newProps.selectedItems };
    }

    return null;
  }

  constructor(basePickerProps: P) {
    super(basePickerProps);

    initializeComponentRef(this);
    const items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];
    this.state = {
      items,
    };

    // Create a new selection if one is not specified
    this._defaultSelection = new Selection({ onSelectionChanged: this.onSelectionChanged });
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
    const itemsCanRemove = itemsToRemove.filter(item => this._canRemoveItem(item));
    const newItems: T[] = items.filter(item => itemsCanRemove.indexOf(item) === -1);
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
      this.setState({ items }, () => {
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

  public componentDidUpdate(oldProps: P, oldState: IBaseSelectedItemsListState<IObjectWithKey>): void {
    if (this.state.items && this.state.items !== oldState.items) {
      this.selection.setItems(this.state.items);
    }
  }

  public unselectAll(): void {
    this.selection.setAllSelected(false);
  }

  public highlightedItems(): T[] {
    return this.selection.getSelection() as T[];
  }

  public componentDidMount(): void {
    this.selection.setItems(this.state.items);
  }

  protected get selection(): Selection {
    return this.props.selection ?? this._defaultSelection;
  }

  public render(): any {
    return this.renderItems();
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
        removeButtonAriaLabel,
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

      const doc = getDocumentEx(this.context)!; // equivalent to previous behavior of directly using `document`
      const copyInput = doc.createElement('input') as HTMLInputElement;
      doc.body.appendChild(copyInput);

      try {
        // Try to copy the text directly to the clipboard
        copyInput.value = copyText;
        copyInput.select();
        // eslint-disable-next-line deprecation/deprecation
        if (!doc.execCommand('copy')) {
          // The command failed. Fallback to the method below.
          throw new Error();
        }
      } catch (err) {
        // no op
      } finally {
        doc.body.removeChild(copyInput);
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
