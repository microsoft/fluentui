import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { Selection, SelectionZone, SelectionMode, IObjectWithKey } from 'office-ui-fabric-react/src/utilities/selection/index';
import { IBaseWellPicker, IBaseWellPickerProps } from './BaseWellPicker.Props';
import { IBaseFloatingPickerProps } from './BaseFloatingPicker.Props';
import { IPickerItemProps, BaseAutoFill, IInputProps } from 'office-ui-fabric-react/lib/Pickers';
import { BaseFloatingPicker } from './BaseFloatingPicker';
import * as stylesImport from '../../../../office-ui-fabric-react/src/components/pickers/BasePicker.scss';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface IBaseWellPickerState {
  // tslint:disable-next-line:no-any
  items: any;
  suggestedDisplayValue?: string;
}

export class BaseWellPicker<T, P extends IBaseWellPickerProps<T>> extends BaseComponent<P, IBaseWellPickerState>
  implements IBaseWellPicker<T> {

  protected selection: Selection;

  protected root: HTMLElement;
  protected input: BaseAutoFill;
  protected focusZone: FocusZone;
  protected floatingPicker: BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);
    this.state = {
      items: items ? items : [],
      suggestedDisplayValue: '',
    };
  }

  // tslint:disable-next-line:no-any
  public get items(): any {
    return this.state.items;
  }

  public forceResolve(): void {
    return;
  }

  public componentWillUpdate(newProps: P, newState: IBaseWellPickerState): void {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  }

  public componentDidMount(): void {
    this.selection.setItems(this.state.items as IObjectWithKey[]);
    this.forceUpdate();
  }

  public componentWillReceiveProps(newProps: P): void {
    let newItems: T[] = newProps.selectedItems ? newProps.selectedItems : [];

    if (newItems) {
      let focusIndex: number;

      // If there are less new items than old items then something was removed and we
      // should try to keep focus consistent
      if (newItems.length < this.state.items.length) {
        focusIndex = this.state.items.indexOf(this.selection.getSelection()[0] as T);
      }

      this.setState({
        items: newProps.selectedItems
      }, () => {
        if (focusIndex >= 0) {
          this.resetFocus(focusIndex);
        }
      });
    }
  }

  public focus(): void {
    this.focusZone.focus();
  }

  public render(): JSX.Element {
    let { suggestedDisplayValue } = this.state;
    let {
        className,
      inputProps,
      disabled
      } = this.props;

    const selectedSuggestionAlert = this.floatingPicker ? this.floatingPicker.selectedSuggestionAlert : undefined;

    return (
      <div
        ref={ this._resolveRef('root') }
        className={ css(
          'ms-BasePicker',
          className ? className : '') }
      >
        <FocusZone
          ref={ this._resolveRef('focusZone') }
          direction={ FocusZoneDirection.bidirectional }
          isInnerZoneKeystroke={ this._isFocusZoneInnerKeystroke }
          onKeyDown={ this.onBackspace }
        >
          { <div className={ styles.screenReaderOnly } role='alert' id='selected-suggestion-alert' aria-live='assertive'>
            { selectedSuggestionAlert } </div> }
          <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
            <div className={ css('ms-BasePicker-text', styles.pickerText) } role={ 'list' }>
              { this.renderItems() }
              { this.canAddItems() && (<BaseAutoFill
                { ...inputProps as IInputProps }
                className={ css('ms-BasePicker-input', styles.pickerInput) }
                ref={ this._resolveRef('input') }
                onFocus={ this.onInputFocus }
                onInputValueChange={ this.onInputChange }
                suggestedDisplayValue={ suggestedDisplayValue }
                aria-activedescendant={ 'sug-' + this.items.length }
                aria-owns='suggestion-list'
                aria-expanded='true'
                aria-haspopup='true'
                autoCapitalize='off'
                autoComplete='off'
                role='combobox'
                disabled={ disabled }
                aria-controls='selected-suggestion-alert'
              />) }
            </div>
          </SelectionZone>
        </FocusZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected canAddItems(): boolean {
    const { items } = this.state;
    const { itemLimit } = this.props;
    return itemLimit === undefined || items.length < itemLimit;
  }

  protected renderSuggestions(): JSX.Element | null {
    let TypedFloatingPicker = this.props.floatingPickerType as (new (props: IBaseFloatingPickerProps<T>) =>
      BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>);
    return (
      <TypedFloatingPicker
        // tslint:disable-next-line:no-any
        { ...this.props.floatingPickerProps as any }
        ref={ this._resolveRef('floatingPicker') }
        onChange={ this.addItem }
        inputElement={ this.input ? this.input.inputElement : null }
        selectedItems={ this.state.items }
      />
    );
  }

  protected renderItems(): JSX.Element[] {
    let { disabled, removeButtonAriaLabel } = this.props;
    let onRenderItem = this.props.onRenderItem as (props: IPickerItemProps<T>) => JSX.Element;

    let { items } = this.state;
    // tslint:disable-next-line:no-any
    return items.map((item: any, index: number) => onRenderItem({
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      disabled: disabled,
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel
    }));
  }

  protected resetFocus(index?: number): void {
    let { items } = this.state;

    if (items.length && index! >= 0) {
      let newEl: HTMLElement = this.root.querySelectorAll('[data-selection-index]')[Math.min(index!, items.length - 1)] as HTMLElement;
      if (newEl) {
        this.focusZone.focusElement(newEl);
      }
    } else if (!this.canAddItems()) {
      (items[items.length - 1] as IPickerItemProps<T>).selected = true;
      this.resetFocus(items.length - 1);
    } else {
      this.input.focus();
    }
  }

  protected onSelectionChange(): void {
    this.forceUpdate();
  }

  protected onChange(items?: T[]): void {
    if (this.props.onChange) {
      (this.props.onChange as ((items?: T[]) => void))(items);
    }
  }

  @autobind
  protected onInputChange(value: string): void {
    this.floatingPicker.onQueryStringChanged(value);
  }

  @autobind
  protected onInputFocus(ev: React.FocusEvent<HTMLInputElement | BaseAutoFill>): void {
    this.selection.setAllSelected(false);
    this.floatingPicker.showPicker();

    if (this.props.inputProps && this.props.inputProps.onFocus) {
      this.props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  }

  @autobind
  protected onItemChange(changedItem: T, index: number): void {
    let { items } = this.state;

    if (index >= 0) {
      let newItems: T[] = items;
      newItems[index] = changedItem;

      this._updateSelectedItems(newItems);
    }
  }

  @autobind
  protected addItem(item: T): void {
    let processedItem: T | PromiseLike<T> = this.props.onItemSelected ?
      (this.props.onItemSelected as ((selectedItem?: T) => T | PromiseLike<T>))(item) :
      item;

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
    this.input.clear();
    this.setState({ suggestedDisplayValue: '' });
  }

  @autobind
  protected removeItem(item: IPickerItemProps<T>): void {
    let { items } = this.state;
    let index: number = items.indexOf(item);

    if (index >= 0) {
      let newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));
      this._updateSelectedItems(newItems);
    }
  }

  @autobind
  // tslint:disable-next-line:no-any
  protected removeItems(itemsToRemove: any[]): void {
    let { items } = this.state;
    let newItems: T[] = items.filter((item: T) => itemsToRemove.indexOf(item) === -1);
    let firstItemToRemove = itemsToRemove[0];
    let index: number = items.indexOf(firstItemToRemove);

    this._updateSelectedItems(newItems, index);
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  @autobind
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }
    if (this.state.items.length && !this.input || !this.input.isValueSelected) {
      if (this.selection.getSelectedCount() > 0) {
        ev.preventDefault();
        this.removeItems(this.selection.getSelection());
        this.input.focus();
      } else if ((this.input as BaseAutoFill).cursorLocation === 0) {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  }

  @autobind
  protected _isFocusZoneInnerKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
    // If suggestions are shown let up/down keys control them, otherwise allow them through to control the focusZone.
    if (this.floatingPicker.isSuggestionsShown) {
      switch (ev.which) {
        case KeyCodes.up:
        case KeyCodes.down:
          return true;
      }
    }

    if (ev.which === KeyCodes.enter) {
      return true;
    }

    return false;
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
  */
  private _updateSelectedItems(items: T[], focusIndex?: number): void {
    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need
      this.onChange(items);
    } else {
      this.setState({ items: items }, () => {
        this._onSelectedItemsUpdated(items, focusIndex);
      });
    }
  }

  private _onSelectedItemsUpdated(items?: T[], focusIndex?: number): void {
    this.resetFocus(focusIndex);
    this.onChange(items);
  }
}