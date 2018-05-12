import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  createRef
} from '../../Utilities';
import { Autofill } from '../../Autofill';
import { IInputProps } from '../../Pickers';
import * as stylesImport from './BaseExtendedPicker.scss';
import { IBaseExtendedPickerProps, IBaseExtendedPicker } from './BaseExtendedPicker.types';
import { IBaseFloatingPickerProps, BaseFloatingPicker } from '../../FloatingPicker';
import { BaseSelectedItemsList, IBaseSelectedItemsListProps } from '../../SelectedItemsList';
import { Selection, SelectionMode, SelectionZone } from '../../Selection';
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
  public floatingPicker = createRef<BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>>();
  public selectedItemsList = createRef<BaseSelectedItemsList<T, IBaseSelectedItemsListProps<T>>>();

  protected root = createRef<HTMLDivElement>();
  protected input = createRef<Autofill>();
  protected selection: Selection;
  protected floatingPickerProps: IBaseFloatingPickerProps<T>;
  protected selectedItemsListProps: IBaseSelectedItemsListProps<T>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });

    this.state = {
      items: this.props.selectedItemsListProps.selectedItems ? this.props.selectedItemsListProps.selectedItems : [],
      suggestedDisplayValue: '',
    };

    this.floatingPickerProps = this.props.floatingPickerProps;
    this.selectedItemsListProps = this.props.selectedItemsListProps;
  }

  // tslint:disable-next-line:no-any
  public get items(): any {
    return this.selectedItemsList.current ? this.selectedItemsList.current.items : [];
  }

  public componentDidMount(): void {
    this.forceUpdate();
  }

  public focus(): void {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  public clearInput(): void {
    if (this.input.current) {
      this.input.current.clear();
    }
  }

  public get inputElement(): HTMLInputElement | null {
    return this.input.current && this.input.current.inputElement;
  }

  public render(): JSX.Element {
    const { suggestedDisplayValue } = this.state;
    const {
      className,
      inputProps,
      disabled
    } = this.props;

    return (
      <div
        ref={ this.root }
        className={ css(
          'ms-BasePicker',
          className ? className : '') }
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
              ref={ this.input }
              onFocus={ this.onInputFocus }
              onClick={ this.onInputClick }
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
        { this.renderSuggestions() }
      </div>
    );
  }

  protected onSelectionChange = (): void => {
    this.forceUpdate();
  }

  protected canAddItems(): boolean {
    const { items } = this.state;
    const { itemLimit } = this.props;
    return itemLimit === undefined || items.length < itemLimit;
  }

  protected renderSuggestions(): JSX.Element {
    const onRenderFloatingPicker = this.props.onRenderFloatingPicker;
    return (onRenderFloatingPicker({
      componentRef: this.floatingPicker,
      onChange: this._onSuggestionSelected,
      inputElement: this.input.current ? this.input.current.inputElement : undefined,
      selectedItems: this.selectedItemsList.current ? this.selectedItemsList.current.items : [],
      ...this.floatingPickerProps
    }));
  }

  protected renderSelectedItemsList(): JSX.Element {
    const onRenderSelectedItems = this.props.onRenderSelectedItems;
    return (onRenderSelectedItems({
      componentRef: this.selectedItemsList,
      ...this.selectedItemsListProps
    }));
  }

  protected onInputChange = (value: string): void => {
    if (this.floatingPicker.current) {
      this.floatingPicker.current.onQueryStringChanged(value);
    }
  }

  protected onInputFocus = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    if (this.selectedItemsList.current) {
      this.selectedItemsList.current.unselectAll();
    }

    if (this.props.inputProps && this.props.inputProps.onFocus) {
      this.props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  }

  protected onInputClick = (ev: React.MouseEvent<HTMLInputElement | Autofill>): void => {
    if (this.selectedItemsList.current) {
      this.selectedItemsList.current.unselectAll();
    }

    if (this.floatingPicker.current) {
      this.floatingPicker.current.showPicker(true /*updateValue*/);
    }
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }
    if ((this.state.items.length && !this.input.current) || (this.input.current && !this.input.current.isValueSelected)) {
      if (this.selectedItemsList.current && (this.input.current as Autofill).cursorLocation === 0) {
        this.selectedItemsList.current.removeItemAt(this.items.length - 1);
        this._onSelectedItemsChanged();
      }
    }
  }

  protected onCopy = (ev: React.ClipboardEvent<HTMLElement>): void => {
    if (this.selectedItemsList.current) {
      // Pass it down into the selected items list
      this.selectedItemsList.current.onCopy(ev);
    }
  }

  protected onPaste = (ev: React.ClipboardEvent<Autofill | HTMLInputElement>): void => {
    if (this.props.onPaste) {
      const inputText = ev.clipboardData.getData('Text');
      ev.preventDefault();
      this.props.onPaste(inputText);
    }
  }

  protected _onSuggestionSelected = (item: T): void => {
    if (this.selectedItemsList.current) {
      this.selectedItemsList.current.addItems([item]);
    }

    if (this.props.onItemSelected) {
      this.props.onItemSelected(item);
    }

    if (this.input.current) {
      this.input.current.clear();
    }

    if (this.floatingPicker.current) {
      this.floatingPicker.current.hidePicker();
    }

    this.focus();
  }

  protected _onSelectedItemsChanged = (): void => {
    this.focus();
  }
}