import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { KeyCodes } from '../../utilities/KeyCodes';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { Suggestions, SuggestionsController, ISuggestionsProps } from './Suggestions/index';
import { IBasePickerProps } from './BasePicker.Props';
import { IPickerItemProps } from './PickerItem.Props';
import { BaseComponent } from '../../common/BaseComponent';
import { css } from '../../utilities/css';
import { autobind } from '../../utilities/autobind';
import './BasePicker.scss';

export interface IBasePickerState {
  items?: any;
  displayValue?: string;
  value?: string;
  moreSuggestionsAvailable?: boolean;
  suggestionsVisible?: boolean;
}

// This interface is because selection direction is not currently supported by the typedefinitions even
// though it works in IE (9 and later), Chrome, and Firefox.
export interface IHTMLInputElementWithSelectionDirection extends HTMLInputElement {
  setSelectionRange(start: number, end: number, direction?: string): void;
}

export class BasePicker<T, P extends IBasePickerProps<T>> extends BaseComponent<P, IBasePickerState> {

  protected _selection: Selection;

  protected _root: HTMLElement;
  protected _input: HTMLInputElement;
  protected _focusZone: FocusZone;
  protected _suggestionElement: Suggestions<T>;

  protected _suggestionStore: SuggestionsController<T>;
  protected _SuggestionOfProperType = Suggestions as new (props: ISuggestionsProps<T>) => Suggestions<T>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items: T[] = basePickerProps.defaultSelectedItems || [];

    this._suggestionStore = new SuggestionsController<T>();
    this._selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });
    this._selection.setItems(items);
    this.state = {
      items: items,
      displayValue: '',
      value: '',
      moreSuggestionsAvailable: false
    };
  }

  public componentWillReceiveProps(newProps: IBasePickerProps<T>, newState: IBasePickerState) {
    if (newState.items && newState.items !== this.state.items) {
      this._selection.setItems(newState.items);
    }
  }

  public componentDidMount() {
    this._selection.setItems(this.state.items);
  }

  public focus() {
    this._focusZone.focus();
  }
  @autobind
  public dismissSuggestions() {
    this.setState({ suggestionsVisible: false });
  }

  public completeSuggestion() {
    if (this._suggestionStore.hasSelectedSuggestion()) {
      this._addItem(this._suggestionStore.currentSuggestion.item);
      this._updateValue('');
    }
  }

  public render() {
    let { displayValue } = this.state;
    return (
      <div ref={ this._resolveRef('_root') } className={ css('ms-BasePicker', this.props.className ? this.props.className : '') } onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection } selectionMode={ SelectionMode.multiple }>
          <FocusZone ref={ this._resolveRef('_focusZone') } className='ms-BasePicker-text'>
            { this._renderItems() }
            <input
              ref={ this._resolveRef('_input') }
              className='ms-BasePicker-input'
              onFocus={ this._onInputFocus }
              onChange={ this._onInputChange }
              value={ displayValue }
              aria-activedescendant={ 'sug-' + this._suggestionStore.currentIndex }
              aria-owns='suggestion-list'
              aria-expanded='true'
              aria-haspopup='true'
              autoCapitalize='off'
              autoComplete='off'/>
          </FocusZone>
        </SelectionZone>
        { this._renderSuggestions() }
      </div>
    );
  }

  protected _renderSuggestions(): JSX.Element {
    let TypedSuggestion = this._SuggestionOfProperType;
    return this.state.suggestionsVisible ? (
      <Callout isBeakVisible={ false } gapSpace={ 0 } targetElement={ this._root } onDismiss={ this.dismissSuggestions }>
        <TypedSuggestion
          onRenderSuggestion={ this.props.onRenderSuggestionsItem }
          onSuggestionClick={ this._onSuggestionClick }
          suggestions={ this._suggestionStore.getSuggestions() }
          ref={ this._resolveRef('_suggestionElement') }
          onGetMoreResults={ this._onGetMoreResults }
          moreSuggestionsAvailable={ this.state.moreSuggestionsAvailable }
          { ...this.props.pickerSuggestionsProps }
          />
      </Callout>
    ) : (null);
  }

  protected _renderItems(): JSX.Element[] {
    let { onRenderItem = () => undefined } = this.props;
    let { items } = this.state;
    return items.map((item, index) => onRenderItem({
      item,
      index,
      isSelected: this._selection.isIndexSelected(index),
      onRemoveItem: () => this._removeItem(item)
    }));
  }

  protected _resetFocus(index: number) {
    let { items } = this.state;

    if (items.length) {
      let newEl: HTMLElement = this._root.querySelectorAll('[data-selection-index]')[Math.min(index, items.length - 1)] as HTMLElement;

      if (newEl) {
        this._focusZone.focusElement(newEl);
      }
    } else {
      this._input.focus();
    }
  }

  protected _onSuggestionSelect() {
    if (this._suggestionStore.currentSuggestion) {
      let currentValue: string = this.state.value;
      let itemValue: string = this.props.getTextFromItem(this._suggestionStore.currentSuggestion.item);
      this._updateDisplayValue(currentValue, itemValue);
      this.setState({ displayValue: itemValue }, () => this._suggestionElement.scrollSelected());
    }
  }

  protected _onSelectionChange() {
    this.forceUpdate();
  }

  protected _updateSuggestions(suggestions: any[]) {
    this._suggestionStore.updateSuggestions(suggestions);
    this.forceUpdate();
  }

  protected _updateValue(updatedValue: string) {
    let { value } = this.state;

    if (!this._suggestionStore.currentIndex || updatedValue !== value) {
      let suggestions: T[] | PromiseLike<T[]> = this.props.onResolveSuggestions(updatedValue, this.state.items);
      let suggestionsArray: T[] = suggestions as T[];
      let suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

      // Check to see if the returned value is an array, if it is then just pass it into the next function.
      // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
      if (Array.isArray(suggestionsArray)) {
        this._resolveNewValue(updatedValue, suggestionsArray);
      } else if (suggestionsPromiseLike.then) {
        suggestionsPromiseLike.then((newSuggestions: T[]) => this._resolveNewValue(updatedValue, newSuggestions));
      }
    }
  }

  protected _resolveNewValue(updatedValue: string, suggestions: T[]) {

    this._suggestionStore.updateSuggestions(suggestions);
    let itemValue: string = undefined;
    if (this._suggestionStore.currentSuggestion) {
      itemValue = this.props.getTextFromItem(this._suggestionStore.currentSuggestion.item);
    }
    this._updateDisplayValue(updatedValue, itemValue);
  }

  protected _updateDisplayValue(updatedValue: string, itemValue?: string) {
    let differenceIndex: number = 0;

    if (updatedValue) {
      while (differenceIndex < updatedValue.length && updatedValue[differenceIndex].toLocaleLowerCase() === updatedValue[differenceIndex].toLocaleLowerCase()) {
        differenceIndex++;
      }
    }

    this.setState({
      displayValue: itemValue || updatedValue,
      value: updatedValue,
      suggestionsVisible: updatedValue && updatedValue !== ''
    }, () => {
      if (itemValue && differenceIndex < itemValue.length) {
        (this._input as IHTMLInputElementWithSelectionDirection).setSelectionRange(differenceIndex, itemValue.length, 'backward');
      }
    });
  }

  protected _onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.items);
    }
  }

  @autobind
  protected _onInputChange(ev: React.FormEvent) {
    let value: string = (ev.target as HTMLInputElement).value;

    this._updateValue(value);
    this.setState({ moreSuggestionsAvailable: true });
  }

  @autobind
  protected _onSuggestionClick(ev: React.MouseEvent, item: any, index: number) {
    this._addItemByIndex(index);
  }

  @autobind
  protected _onInputFocus(ev: React.FocusEvent) {
    this._selection.setAllSelected(false);
    if (this.state.value) {
      this.setState({ suggestionsVisible: true });
    }
  }

  @autobind
  protected _onKeyDown(ev: React.KeyboardEvent) {
    let { value } = this.state;

    switch (ev.which) {
      case KeyCodes.escape:
        this.dismissSuggestions();
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (value && this._suggestionStore.hasSelectedSuggestion()) {
          this.completeSuggestion();
          ev.preventDefault();
          ev.stopPropagation();
        }

        break;

      case KeyCodes.backspace:
        this._onBackspace(ev);
        break;

      case KeyCodes.up:
        if (ev.target === this._input && this._suggestionStore.previousSuggestion()) {
          ev.preventDefault();
          ev.stopPropagation();
          this._onSuggestionSelect();
        }
        break;

      case KeyCodes.down:
        if (ev.target === this._input) {
          if (this._suggestionStore.nextSuggestion()) {
            ev.preventDefault();
            ev.stopPropagation();
            this._onSuggestionSelect();
          }
        }
        break;
    }
  }

  @autobind
  protected _onGetMoreResults() {
    if (this.props.onGetMoreResults) {
      let suggestions: T[] | PromiseLike<T[]> = this.props.onGetMoreResults(this.state.value, this.state.items);
      let suggestionsArray: T[] = suggestions as T[];
      let suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

      if (Array.isArray(suggestionsArray)) {
        this._updateSuggestions(suggestionsArray);
      } else if (suggestionsPromiseLike.then) {
        suggestionsPromiseLike.then((newSuggestions: T[]) => this._updateSuggestions(newSuggestions));
      }
    }
    this._input.focus();
    this.setState({ moreSuggestionsAvailable: false });
  }

  @autobind
  protected _addItemByIndex(index: number): void {
    this._addItem(this._suggestionStore.getSuggestionAtIndex(index).item);
    this._updateValue('');
  }

  @autobind
  protected _addItem(item: T) {
    let newItems: T[] = this.state.items.concat([item]);
    this._selection.setItems(newItems);
    this.setState({ items: newItems }, () => this._onChange());
  }

  @autobind
  protected _removeItem(item: IPickerItemProps<T>) {
    let { items } = this.state;
    let index: number = items.indexOf(item);

    if (index >= 0) {
      let newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));

      this._selection.setItems(newItems);
      this.setState({ items: newItems }, () => this._onChange());
    }
  }

  @autobind
  protected _removeItems(itemsToRemove: any[]) {
    let { items } = this.state;
    let newItems: T[] = items.filter(item => itemsToRemove.indexOf(item) === -1);
    let firstItemToRemove = this._selection.getSelection()[0];
    let index: number = items.indexOf(firstItemToRemove);

    this._selection.setItems(newItems);

    this.setState({ items: newItems }, () => this._resetFocus(index));
  }

  protected _onBackspace(ev: React.KeyboardEvent) {
    let { displayValue } = this.state;
    if (ev.target === this._input) {
      if (displayValue && this._suggestionStore.hasSelectedSuggestion() && this._input.selectionStart !== this._input.selectionEnd) {
        this._updateValue(displayValue.substr(0, this._input.selectionStart - 1));
        // Since this effectively deletes a letter from the string we need to preventDefault so that
        // the backspace doesn't try to delete a letter that's already been deleted. If a letter is deleted
        // it can trigger the onChange event again which can have unintended consequences.
        ev.preventDefault();
      } else if (!displayValue && this.state.items.length) {
        this._removeItem(this.state.items[this.state.items.length - 1]);
      }
    } else if (this._selection.getSelectedCount() > 0) {
      this._removeItems(this._selection.getSelection());
    }
  }
}