import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { KeyCodes } from '../../utilities/KeyCodes';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { Suggestions } from './Suggestions/Suggestions';
import { ISuggestionsProps } from './Suggestions/Suggestions.Props';
import { SuggestionsController } from './Suggestions/SuggestionsController';
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

  protected selection: Selection;

  protected root: HTMLElement;
  protected input: HTMLInputElement;
  protected focusZone: FocusZone;
  protected suggestionElement: Suggestions<T>;

  protected suggestionStore: SuggestionsController<T>;
  protected SuggestionOfProperType = Suggestions as new (props: ISuggestionsProps<T>) => Suggestions<T>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items: T[] = basePickerProps.defaultSelectedItems || [];

    this.suggestionStore = new SuggestionsController<T>();
    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);
    this.state = {
      items: items,
      displayValue: '',
      value: '',
      moreSuggestionsAvailable: false
    };
  }

  public componentWillReceiveProps(newProps: IBasePickerProps<T>, newState: IBasePickerState) {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  }

  public componentDidMount() {
    this.selection.setItems(this.state.items);
  }

  public focus() {
    this.focusZone.focus();
  }
  @autobind
  public dismissSuggestions() {
    this.setState({ suggestionsVisible: false });
  }

  public completeSuggestion() {
    if (this.suggestionStore.hasSelectedSuggestion()) {
      this.addItem(this.suggestionStore.currentSuggestion.item);
      this.updateValue('');
    }
  }

  public render() {
    let { displayValue } = this.state;
    return (
      <div ref={ this._resolveRef('root') } className={ css('ms-BasePicker', this.props.className ? this.props.className : '') } onKeyDown={ this.onKeyDown }>
        <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
          <FocusZone ref={ this._resolveRef('focusZone') } className='ms-BasePicker-text'>
            { this.renderItems() }
            <input
              ref={ this._resolveRef('input') }
              className='ms-BasePicker-input'
              onFocus={ this.onInputFocus }
              onChange={ this.onInputChange }
              value={ displayValue }
              aria-activedescendant={ 'sug-' + this.suggestionStore.currentIndex }
              aria-owns='suggestion-list'
              aria-expanded='true'
              aria-haspopup='true'
              autoCapitalize='off'
              autoComplete='off'/>
          </FocusZone>
        </SelectionZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected renderSuggestions(): JSX.Element {
    let TypedSuggestion = this.SuggestionOfProperType;
    return this.state.suggestionsVisible ? (
      <Callout isBeakVisible={ false } gapSpace={ 0 } targetElement={ this.root } onDismiss={ this.dismissSuggestions }>
        <TypedSuggestion
          onRenderSuggestion={ this.props.onRenderSuggestionsItem }
          onSuggestionClick={ this.onSuggestionClick }
          suggestions={ this.suggestionStore.getSuggestions() }
          ref={ this._resolveRef('suggestionElement') }
          onGetMoreResults={ this.onGetMoreResults }
          moreSuggestionsAvailable={ this.state.moreSuggestionsAvailable }
          { ...this.props.pickerSuggestionsProps }
          />
      </Callout>
    ) : (null);
  }

  protected renderItems(): JSX.Element[] {
    let { onRenderItem = () => undefined } = this.props;
    let { items } = this.state;
    return items.map((item, index) => onRenderItem({
      item,
      index,
      isSelected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item)
    }));
  }

  protected resetFocus(index: number) {
    let { items } = this.state;

    if (items.length) {
      let newEl: HTMLElement = this.root.querySelectorAll('[data-selection-index]')[Math.min(index, items.length - 1)] as HTMLElement;

      if (newEl) {
        this.focusZone.focusElement(newEl);
      }
    } else {
      this.input.focus();
    }
  }

  protected onSuggestionSelect() {
    if (this.suggestionStore.currentSuggestion) {
      let currentValue: string = this.state.value;
      let itemValue: string = this.props.getTextFromItem(this.suggestionStore.currentSuggestion.item, currentValue);
      this.updateDisplayValue(currentValue, itemValue, () => this.suggestionElement.scrollSelected());
    }
  }

  protected onSelectionChange() {
    this.forceUpdate();
  }

  protected updateSuggestions(suggestions: any[]) {
    this.suggestionStore.updateSuggestions(suggestions);
    this.forceUpdate();
  }

  protected updateValue(updatedValue: string) {
    let { value } = this.state;

    if (!this.suggestionStore.currentIndex || updatedValue !== value) {
      let suggestions: T[] | PromiseLike<T[]> = this.props.onResolveSuggestions(updatedValue, this.state.items);
      let suggestionsArray: T[] = suggestions as T[];
      let suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

      // Check to see if the returned value is an array, if it is then just pass it into the next function.
      // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
      if (Array.isArray(suggestionsArray)) {
        this.resolveNewValue(updatedValue, suggestionsArray);
      } else if (suggestionsPromiseLike.then) {
        this.updateDisplayValue(updatedValue);
        suggestionsPromiseLike.then((newSuggestions: T[]) => this.resolveNewValue(updatedValue, newSuggestions));
      }
    }
  }

  protected resolveNewValue(updatedValue: string, suggestions: T[]) {

    this.suggestionStore.updateSuggestions(suggestions);
    let itemValue: string = undefined;
    if (this.suggestionStore.currentSuggestion) {
      itemValue = this.props.getTextFromItem(this.suggestionStore.currentSuggestion.item, updatedValue);
    }
    this.updateDisplayValue(updatedValue, itemValue);
  }

  protected updateDisplayValue(updatedValue: string, itemValue?: string, afterUpdateCallback?: () => void) {
    let differenceIndex: number = 0;

    if (updatedValue && itemValue) {
      while (differenceIndex < updatedValue.length && updatedValue[differenceIndex].toLocaleLowerCase() === itemValue[differenceIndex].toLocaleLowerCase()) {
        differenceIndex++;
      }
    }

    this.setState({
      displayValue: itemValue || updatedValue,
      value: updatedValue,
      suggestionsVisible: updatedValue && updatedValue !== ''
    }, () => {
      if (afterUpdateCallback) {
        afterUpdateCallback();
      }
      if (itemValue && differenceIndex < itemValue.length && differenceIndex === updatedValue.length) {
        (this.input as IHTMLInputElementWithSelectionDirection).setSelectionRange(differenceIndex, itemValue.length, 'backward');
      }
    });
  }

  protected onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.items);
    }
  }

  @autobind
  protected onInputChange(ev: React.FormEvent) {
    let value: string = (ev.target as HTMLInputElement).value;

    this.updateValue(value);
    this.setState({ moreSuggestionsAvailable: true });
  }

  @autobind
  protected onSuggestionClick(ev: React.MouseEvent, item: any, index: number) {
    this.addItemByIndex(index);
  }

  @autobind
  protected onInputFocus(ev: React.FocusEvent) {
    this.selection.setAllSelected(false);
    if (this.state.value) {
      this.setState({ suggestionsVisible: true });
    }
  }

  @autobind
  protected onKeyDown(ev: React.KeyboardEvent) {
    let { value } = this.state;

    switch (ev.which) {
      case KeyCodes.escape:
        this.dismissSuggestions();
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (value && this.suggestionStore.hasSelectedSuggestion()) {
          this.completeSuggestion();
          ev.preventDefault();
          ev.stopPropagation();
        }

        break;

      case KeyCodes.backspace:
        this.onBackspace(ev);
        break;

      case KeyCodes.up:
        if (ev.target === this.input && this.suggestionStore.previousSuggestion()) {
          ev.preventDefault();
          ev.stopPropagation();
          this.onSuggestionSelect();
        }
        break;

      case KeyCodes.down:
        if (ev.target === this.input) {
          if (this.suggestionStore.nextSuggestion()) {
            ev.preventDefault();
            ev.stopPropagation();
            this.onSuggestionSelect();
          }
        }
        break;
    }
  }

  @autobind
  protected onGetMoreResults() {
    if (this.props.onGetMoreResults) {
      let suggestions: T[] | PromiseLike<T[]> = this.props.onGetMoreResults(this.state.value, this.state.items);
      let suggestionsArray: T[] = suggestions as T[];
      let suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

      if (Array.isArray(suggestionsArray)) {
        this.updateSuggestions(suggestionsArray);
      } else if (suggestionsPromiseLike.then) {
        suggestionsPromiseLike.then((newSuggestions: T[]) => this.updateSuggestions(newSuggestions));
      }
    }
    this.input.focus();
    this.setState({ moreSuggestionsAvailable: false });
  }

  @autobind
  protected addItemByIndex(index: number): void {
    this.addItem(this.suggestionStore.getSuggestionAtIndex(index).item);
    this.updateValue('');
  }

  @autobind
  protected addItem(item: T) {
    let newItems: T[] = this.state.items.concat([item]);
    this.selection.setItems(newItems);
    this.setState({ items: newItems }, () => this.onChange());
  }

  @autobind
  protected removeItem(item: IPickerItemProps<T>) {
    let { items } = this.state;
    let index: number = items.indexOf(item);

    if (index >= 0) {
      let newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));

      this.selection.setItems(newItems);
      this.setState({ items: newItems }, () => this.onChange());
    }
  }

  @autobind
  protected removeItems(itemsToRemove: any[]) {
    let { items } = this.state;
    let newItems: T[] = items.filter(item => itemsToRemove.indexOf(item) === -1);
    let firstItemToRemove = this.selection.getSelection()[0];
    let index: number = items.indexOf(firstItemToRemove);

    this.selection.setItems(newItems);

    this.setState({ items: newItems }, () => this.resetFocus(index));
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace(ev: React.KeyboardEvent) {
    let { displayValue } = this.state;
    if (ev.target === this.input) {
      if (displayValue && this.suggestionStore.hasSelectedSuggestion() && this.input.selectionStart !== this.input.selectionEnd) {
        this.updateValue(displayValue.substr(0, this.input.selectionStart - 1));
        // Since this effectively deletes a letter from the string we need to preventDefault so that
        // the backspace doesn't try to delete a letter that's already been deleted. If a letter is deleted
        // it can trigger the onChange event again which can have unintended consequences.
        ev.preventDefault();
      } else if (!displayValue && this.state.items.length) {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    } else if (this.selection.getSelectedCount() > 0) {
      this.removeItems(this.selection.getSelection());
    }
  }
}

export class BasePickerListBelow<T, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
  public render() {
    let { displayValue } = this.state;

    return (
      <div>
        <div ref={ this._resolveRef('root') }
          className={ css('ms-BasePicker', this.props.className ? this.props.className : '') }
          onKeyDown={ this.onKeyDown }>
          <SelectionZone selection={ this.selection }
            selectionMode={ SelectionMode.multiple }>
            <div className='ms-BasePicker-text'>
              <input ref={ this._resolveRef('input') }
                onFocus={ this.onInputFocus }
                onChange={ this.onInputChange }
                value={ displayValue }
                className='ms-BasePicker-input'
                />
            </div>
          </SelectionZone>
        </div>
        { this.renderSuggestions() }
        <FocusZone ref={ this._resolveRef('focusZone') } className='ms-BasePicker-selectedItems'>
          { this.renderItems() }
        </FocusZone>

      </div>
    );
  }

  protected onBackspace(ev: React.KeyboardEvent) {
    let { value } = this.state;
    if (ev.target === this.input) {
      if (value && this.input.selectionStart !== this.input.selectionEnd) {
        this.updateValue(value.substring(0, this.input.selectionStart));
        // Since this effectively deletes a letter from the string we need to preventDefault so that
        // the backspace doesn't try to delete a letter that's already been deleted. If a letter is deleted
        // it can trigger the onChange event again which can have unintended consequences.
        ev.preventDefault();
      }
    }
  }
}
