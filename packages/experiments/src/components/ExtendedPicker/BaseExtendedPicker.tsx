import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  autobind,
  css,
} from '../../Utilities';
import {
  FocusZone,
  FocusZoneDirection
} from 'office-ui-fabric-react/lib/FocusZone';
import { Autofill } from 'office-ui-fabric-react/lib/components/Autofill/Autofill';
import { IPickerItemProps, IInputProps } from 'office-ui-fabric-react/lib/Pickers';
import * as stylesImport from './BaseExtendedPicker.scss';
import { IBaseExtendedPickerProps, IBaseExtendedPicker } from './BaseExtendedPicker.types';
import { IBaseFloatingPickerProps, BaseFloatingPicker } from '../../FloatingPicker';
import { BaseSelectedItemsList, IBaseSelectedItemsListProps } from '../../SelectedItemsList';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface IBaseExtendedPickerState {
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

export class BaseExtendedPicker<T, P extends IBaseExtendedPickerProps<T>> extends BaseComponent<P, IBaseExtendedPickerState>
  implements IBaseExtendedPicker<T> {
  public floatingPicker: BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>;
  public selectedItemsList: BaseSelectedItemsList<T, IBaseSelectedItemsListProps<T>>;

  protected root: HTMLElement;
  protected input: Autofill;
  protected focusZone: FocusZone;
  protected selection: Selection;
  protected floatingPickerProps: IBaseFloatingPickerProps<T>;
  protected selectedItemsListProps: IBaseSelectedItemsListProps<T>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);

    this.state = {
      items: items ? items : [],
      suggestedDisplayValue: '',
    };

    this.floatingPickerProps = this.props.floatingPickerProps;
    this.selectedItemsListProps = this.props.selectedItemsListProps;
  }

  // tslint:disable-next-line:no-any
  public get items(): any {
    return this.selectedItemsList ? this.selectedItemsList.items : [];
  }

  public componentDidMount(): void {
    this.forceUpdate();
  }

  public focus(): void {
    this.focusZone.focus();
  }

  public get inputElement(): HTMLInputElement {
    return this.input.inputElement;
  }

  public render(): JSX.Element {
    let { suggestedDisplayValue } = this.state;
    let {
      className,
      inputProps,
      disabled
    } = this.props;

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
          onCopy={ this.onCopy }
        >
          <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
            <div className={ css('ms-BasePicker-text', styles.pickerText) } role={ 'list' }>
              { this.props.headerComponent }
              { this.renderSelectedItemsList() }
              { this.canAddItems() && (<Autofill
                { ...inputProps as IInputProps }
                className={ css('ms-BasePicker-input', styles.pickerInput) }
                ref={ this._resolveRef('input') }
                onFocus={ this.onInputFocus }
                onInputValueChange={ this.onInputChange }
                suggestedDisplayValue={ suggestedDisplayValue }
                aria-activedescendant={ 'sug-' + this.state.items.length }
                aria-owns='suggestion-list'
                aria-expanded='true'
                aria-haspopup='true'
                autoCapitalize='off'
                autoComplete='off'
                role='combobox'
                disabled={ disabled }
                aria-controls='selected-suggestion-alert'
                onPaste={ this.onPaste }
              />) }
            </div>
          </SelectionZone>
        </FocusZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  @autobind
  protected onSelectionChange(): void {
    this.forceUpdate();
  }

  protected canAddItems(): boolean {
    const { items } = this.state;
    const { itemLimit } = this.props;
    return itemLimit === undefined || items.length < itemLimit;
  }

  protected renderSuggestions(): JSX.Element {
    let onRenderFloatingPicker = this.props.onRenderFloatingPicker;
    return (onRenderFloatingPicker({
      componentRef: this._resolveRef('floatingPicker'),
      onChange: this._onSuggestionSelected,
      inputElement: this.input ? this.input.inputElement : undefined,
      selectedItems: this.selectedItemsList ? this.selectedItemsList.items : [],
      ...this.floatingPickerProps
    }));
  }

  protected renderSelectedItemsList(): JSX.Element {
    let onRenderSelectedItems = this.props.onRenderSelectedItems;
    return (onRenderSelectedItems({
      componentRef: this._resolveRef('selectedItemsList'),
      ...this.selectedItemsListProps
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

  @autobind
  protected onInputChange(value: string): void {
    this.floatingPicker.onQueryStringChanged(value);
  }

  @autobind
  protected onInputFocus(ev: React.FocusEvent<HTMLInputElement | Autofill>): void {
    this.selectedItemsList.unselectAll();
    this.floatingPicker.showPicker();

    if (this.props.inputProps && this.props.inputProps.onFocus) {
      this.props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  @autobind
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }
    if (this.state.items.length && !this.input || !this.input.isValueSelected) {
      if ((this.input as Autofill).cursorLocation === 0) {
        this.selectedItemsList.removeItemAt(this.items.length - 1);
        this._onSelectedItemsChanged();
      }
    }
  }

  @autobind
  protected onCopy(ev: React.ClipboardEvent<HTMLElement>): void {
    // Pass it down into the selected items list
    this.selectedItemsList.onCopy(ev);
  }

  @autobind
  protected onPaste(ev: React.ClipboardEvent<Autofill | HTMLInputElement>): void {
    if (this.props.onPaste) {
      let inputText = ev.clipboardData.getData('Text');
      ev.preventDefault();
      this.props.onPaste(inputText);
    }
  }

  @autobind
  protected _isFocusZoneInnerKeystroke(ev: React.KeyboardEvent<HTMLElement>): boolean {
    // If suggestions are shown let up/down keys control them, otherwise allow them through to control the focusZone.
    if (this.floatingPicker.isSuggestionsShown) {
      switch (ev.which) {
        case KeyCodes.up:
        case KeyCodes.down:
        case KeyCodes.enter:
          return true;
      }
    }

    if (ev.ctrlKey) {
      return true;
    }

    return false;
  }

  @autobind
  protected _onSuggestionSelected(item: T): void {
    this.selectedItemsList.addItems([item]);
    if (this.props.onItemSelected) {
      this.props.onItemSelected(item);
    }
    this.input.clear();

    this.floatingPicker.hidePicker();
  }

  @autobind
  protected _onSelectedItemsChanged(): void {
    this.input.focus();
  }
}