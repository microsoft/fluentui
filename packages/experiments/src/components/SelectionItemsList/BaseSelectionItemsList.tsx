import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionZone, SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { IPickerItemProps } from 'office-ui-fabric-react/lib/pickers';
import { IBaseSelectionItemsList, IBaseSelectionItemsListProps } from './BaseSelectionItemsList.Props';
import * as stylesImport from '../../../../office-ui-fabric-react/src/components/Pickers/BasePicker.scss';
const styles: any = stylesImport;

export interface IBaseSelectionItemsListState {
  items?: any;
  suggestedDisplayValue?: string;
  moreSuggestionsAvailable?: boolean;
  isSearching?: boolean;
  isMostRecentlyUsedVisible?: boolean;
  suggestionsVisible?: boolean;
  suggestionsLoading?: boolean;
  isResultsFooterVisible?: boolean;
}

export class BaseSelectionItemsList<T, P extends IBaseSelectionItemsListProps<T>> extends BaseComponent<P, IBaseSelectionItemsListState> implements IBaseSelectionItemsList<T> {

  protected selection: Selection;

  protected root: HTMLElement;
  protected focusZone: FocusZone;

  protected currentPromise: PromiseLike<any>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);
    this.state = {
      items: items,
    };
  }

  public get items(): T[] {
    return this.state.items;
  }

  @autobind
  public addItem(item: T) {
    let processedItem: T | PromiseLike<T> = this.props.onItemSelected ? (this.props.onItemSelected as any)(item) : item;

    let processedItemObject: T = processedItem as T;
    let processedItemPromiseLike: PromiseLike<T> = processedItem as PromiseLike<T>;

    if (processedItemPromiseLike && processedItemPromiseLike.then) {
      processedItemPromiseLike.then((resolvedProcessedItem: T) => {
        let newItems: T[] = this.state.items.concat([resolvedProcessedItem]);
        this._updateSelectedItems(newItems);
      });
    } else {
      let newItems: T[] = this.state.items.concat([processedItemObject]);
      this._updateSelectedItems(newItems);
    }
    this.setState({ suggestedDisplayValue: '' });
  }

  public componentWillUpdate(newProps: P, newState: IBaseSelectionItemsListState) {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  }

  public componentDidMount() {
    this.selection.setItems(this.state.items);
  }

  public componentWillReceiveProps(newProps: P) {
    let newItems = newProps.selectedItems;

    if (newItems) {
      let focusIndex: number;

      // If there are less new items than old items then something was removed and we
      // should try to keep focus consistent
      if (newItems.length < this.state.items.length) {
        focusIndex = this.state.items.indexOf(this.selection.getSelection()[0]);
      }

      this.setState({ items: newProps.selectedItems });
    }
  }

  public focus() {
    this.focusZone.focus();
  }

  public render() {
    let { className } = this.props;

    return (
      <div
        ref={ this._resolveRef('root') }
        className={ css(
          'ms-BasePicker',
          className ? className : '') }
        onKeyDown={ this.onKeyDown }
      >
        <FocusZone
          ref={ this._resolveRef('focusZone') }
          direction={ FocusZoneDirection.bidirectional }
        >
          <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
            <div className={ css('ms-BasePicker-text', styles.pickerText) } role={ 'list' }>
              { this.renderItems() }
            </div>
          </SelectionZone>
        </FocusZone>
      </div>
    );
  }

  protected renderItems(): JSX.Element[] {
    let { removeButtonAriaLabel } = this.props;
    let onRenderItem = this.props.onRenderItem as (props: IPickerItemProps<T>) => JSX.Element;

    let { items } = this.state;
    return items.map((item: any, index: number) => onRenderItem({
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel
    }));
  }

  protected onSelectionChange() {
    this.forceUpdate();
  }

  protected onChange(items?: T[]) {
    if (this.props.onChange) {
      (this.props.onChange as any)(items);
    }
  }

  @autobind
  protected onKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    switch (ev.which) {
      case KeyCodes.backspace:
        this.onBackspace(ev);
        ev.stopPropagation();
        break;

      case KeyCodes.del:
        this.onBackspace(ev);
    }
  }

  @autobind
  protected onItemChange(changedItem: T, index: number) {
    let { items } = this.state;

    if (index >= 0) {
      let newItems: T[] = items;
      newItems[index] = changedItem;

      this._updateSelectedItems(newItems);
    }
  }

  @autobind
  protected removeItem(item: IPickerItemProps<T>) {
    let { items } = this.state;
    let index: number = items.indexOf(item);

    if (index >= 0) {
      let newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));
      this._updateSelectedItems(newItems);
    }
  }

  @autobind
  protected removeItems(itemsToRemove: any[]) {
    let { items } = this.state;
    let newItems: T[] = items.filter((item: any) => itemsToRemove.indexOf(item) === -1);
    let firstItemToRemove = itemsToRemove[0];
    let index: number = items.indexOf(firstItemToRemove);

    this._updateSelectedItems(newItems, index);
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    if (this.state.items.length) {
      if (this.selection.getSelectedCount() > 0) {
        this.removeItems(this.selection.getSelection());
      } else {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
  */
  private _updateSelectedItems(items: T[], focusIndex?: number) {
    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need
      this.onChange(items);
    } else {
      this.setState({ items: items }, () => {
        this._onSelectedItemsUpdated(items, focusIndex);
      });
    }
  }

  private _onSelectedItemsUpdated(items?: T[], focusIndex?: number) {
    this.onChange(items);
  }
}