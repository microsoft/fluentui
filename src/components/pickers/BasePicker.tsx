import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { KeyCodes } from '../../utilities/KeyCodes';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { Suggestion, SuggestionController, ISuggestionProps } from './Suggestion/index';
import { IBasePickerProps } from './BasePicker.Props';
import { IPickerItemProps } from './PickerItem.Props';
import { css } from '../../utilities/css';
import './BasePicker.scss';

export interface IBasePickerState {
  items?: any;
  displayValue?: string;
  value?: string;
  searchForMoreText?: string;
}

export class BasePicker<T, P extends IBasePickerProps<T>> extends React.Component<P, IBasePickerState> {

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
    input: HTMLInputElement;
    focusZone: FocusZone;
    suggestionElement: Suggestion<T>
  };

  protected _selection: Selection;

  private suggestionManager: SuggestionController<T>;
  private SuggestionOfProperType = Suggestion as new (props: ISuggestionProps<T>) => Suggestion<T>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    let items = basePickerProps.startingItems || [];

    this.suggestionManager = new SuggestionController<T>();
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this.dismissSuggestions = this.dismissSuggestions.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addItemByIndex = this.addItemByIndex.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this._onGetMoreResults = this._onGetMoreResults.bind(this);
    this._onSuggestionClick = this._onSuggestionClick.bind(this);
    this._selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });
    this._selection.setItems(items);
    this.state = {
      items: items,
      displayValue: '',
      value: '',
      searchForMoreText: basePickerProps.searchForMoreText
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

  public render() {
    let { displayValue } = this.state;
    return (
      <div ref='root' className={ css('ms-BasePicker', this.props.className ? this.props.className : '') } onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection } selectionMode={ SelectionMode.multiple }>
          <FocusZone ref='focusZone' className='ms-BasePicker-text'>
            { this.renderItems() }
            <input ref='input' className='ms-BasePicker-input ms-autocomplete-top' onFocus={ this._onInputFocus } onChange={ this._onInputChange } value={ displayValue }
            aria-activedescendant={ 'sug-' + this.suggestionManager.currentIndex }
            aria-owns={ 'sug-' + this.suggestionManager.currentIndex } />
          </FocusZone>
        </SelectionZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected renderSuggestions(): JSX.Element {
    let TypedSuggestion = this.SuggestionOfProperType;
    return this.state.value && this.state.value !== '' ? (
      <Callout isBeakVisible={ false } gapSpace={ 0 } targetElement={ this.refs.root } onDismiss={ this.dismissSuggestions }>
        <TypedSuggestion
          onRenderSuggestion={ this.props.onRenderSuggestion }
          onSuggestionClick={ this._onSuggestionClick }
          suggestions={ this.suggestionManager.getSuggestions() }
          suggestionsHeaderText={ this.props.suggestionsHeaderText }
          ref='suggestionElement'
          searchForMoreText={ this.state.searchForMoreText }
          onGetMoreResults={ this._onGetMoreResults }
          noResultsFoundText= { this.props.noResultsText }
          className={ this.props.suggestionsClassName }
          suggestionItemClassName={ this.props.suggestionItemClassName }
          />
      </Callout>
    ) : (null);
  }

  public focus() {
    this.refs.focusZone.focus();
  }

  public dismissSuggestions() {
    this._updateValue('');
  }

  public completeSuggestion() {
    if (this.suggestionManager.hasSelectedSuggestion()) {
      this.addItem(this.suggestionManager.currentSuggestion.item);
      this._updateValue('');
    }
  }

  protected addItem(item: T) {
    let newItems = this.state.items.concat([item]);
    this._selection.setItems(newItems);
    this.setState({ items: newItems }, () => this._onChange());
  }

  protected removeItem(item: IPickerItemProps<T>) {
    let { items } = this.state;
    let index = items.indexOf(item);

    if (index >= 0) {
      let newItems = items.slice(0, index).concat(items.slice(index + 1));

      this._selection.setItems(newItems);
      this.setState({ items: newItems }, () => this._onChange());
    }
  }

  protected _onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.items);
    }
  }

  protected removeItems(itemsToRemove: any[]) {
    let { items } = this.state;
    let newItems = items.filter(item => itemsToRemove.indexOf(item) === -1);
    let firstItemToRemove = this._selection.getSelection()[0];
    let index = items.indexOf(firstItemToRemove);

    this._selection.setItems(newItems);

    this.setState({ items: newItems }, () => this._resetFocus(index));
  }

  protected renderItems(): JSX.Element[] {
    let { onRenderItem = () => undefined } = this.props;
    let { items } = this.state;
    return items.map((item, index) => onRenderItem({
      item,
      index,
      isSelected: this._selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item)
    }));
  }

  protected addItemByIndex(index: number): void {
    this.addItem(this.suggestionManager.getSuggestionAtIndex(index).item);
    this._updateValue('');
  }

  protected _resetFocus(index: number) {
    let { items } = this.state;

    if (items.length) {
      let newEl = this.refs.root.querySelectorAll('[data-selection-index]')[Math.min(index, items.length - 1)] as HTMLElement;

      if (newEl) {
        this.refs.focusZone.focusElement(newEl);
      }
    } else {
      this.refs.input.focus();
    }
  }

  protected _onSuggestionSelect() {
    if (this.suggestionManager.currentSuggestion) {
      let currentValue = this.state.value;
      let itemValue: string = this.props.getTextFromItem(this.suggestionManager.currentSuggestion.item);
      this._updateDisplayValue(currentValue, itemValue);
      this.setState({ displayValue: itemValue }, () => this.refs.suggestionElement.scrollSelected());
    }
  }

  protected _onSelectionChange() {
    this.forceUpdate();
  }

  protected _onInputChange(ev: React.FormEvent) {
    let value = (ev.target as HTMLInputElement).value;

    this._updateValue(value);
    this.setState({ searchForMoreText: this.props.searchForMoreText });
  }

  protected _updateSuggestions(suggestions: any[]) {
    this.suggestionManager.updateSuggestions(suggestions);
    this.forceUpdate();
  }

  protected _updateValue(updatedValue: string) {
    let { value } = this.state;

    if (!this.suggestionManager.currentIndex || updatedValue !== value) {
      let newSuggestions: any[] = this.props.onResolveSuggestions(updatedValue);

      this.suggestionManager.updateSuggestions(newSuggestions);
      let itemValue: string = undefined;
      if (this.suggestionManager.currentSuggestion) {
        itemValue = this.props.getTextFromItem(this.suggestionManager.currentSuggestion.item);
      }
      this._updateDisplayValue(updatedValue, itemValue);
    }
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
      value: updatedValue
    }, () => {
      if (itemValue && differenceIndex < itemValue.length) {
        this.refs.input.setSelectionRange(differenceIndex, itemValue.length);
      }
    });
  }

  protected _onSuggestionClick(ev: React.MouseEvent, item: any, index: number) {
    this.addItemByIndex(index);
  }

  protected _onInputFocus(ev: React.FocusEvent) {
    this._selection.setAllSelected(false);
  }

  protected _onKeyDown(ev: React.KeyboardEvent) {
    let { value } = this.state;

    switch (ev.which) {
      case KeyCodes.escape:
        this.dismissSuggestions();
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (value && this.suggestionManager.hasSelectedSuggestion()) {
          this.completeSuggestion();
          ev.preventDefault();
          ev.stopPropagation();
        }

        break;

      case KeyCodes.backspace:
        this._onBackSpace(ev);
        ev.preventDefault();
        ev.stopPropagation();
        break;

      case KeyCodes.up:
        if (ev.target === this.refs.input && this.suggestionManager.previousSuggestion()) {
          ev.preventDefault();
          ev.stopPropagation();
          this._onSuggestionSelect();
        }
        break;

      case KeyCodes.down:
        if (ev.target === this.refs.input) {
          if (this.suggestionManager.nextSuggestion()) {
            ev.preventDefault();
            ev.stopPropagation();
            this._onSuggestionSelect();
          }
        }
        break;
    }
  }

  protected _onGetMoreResults() {
    if (this.props.onGetMoreResults) {
      this._updateSuggestions(this.props.onGetMoreResults(this.state.value));
    }
    this.refs.input.focus();
    this.setState({ searchForMoreText: undefined });
  }

  protected _onBackSpace(ev: React.KeyboardEvent) {
    let { value } = this.state;
    if (ev.target === this.refs.input) {
      if (value && this.suggestionManager.hasSelectedSuggestion() && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
        this.setState({
          displayValue: value.substring(0, this.refs.input.selectionStart)
        });
      } else if (!value && this.state.items.length) {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    } else if (this._selection.getSelectedCount() > 0) {
      this.removeItems(this._selection.getSelection());
    }
  }
}