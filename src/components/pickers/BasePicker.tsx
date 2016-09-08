import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { KeyCodes } from '../../utilities/KeyCodes';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { SuggestionElement, ISuggestionElementProps } from './SuggestionElement';
import { SuggestionController } from './SuggestionController';
import { IBasePickerProps } from './BasePickerProps';
import { css } from '../../utilities/css';
import './BasePicker.scss';

export interface IBasePickerState {
  items?: any;
  value?: string;
}

export class BasePicker<T, S extends IBasePickerProps<T>> extends React.Component<S, IBasePickerState> {

  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
    input: HTMLInputElement;
    focusZone: FocusZone;
    suggestionElement: SuggestionElement<T>
  };

  protected _selection: Selection;

  private suggestionManager: SuggestionController<T>;
  private SuggestionOfProperType = SuggestionElement as new (props: ISuggestionElementProps<T>) => SuggestionElement<T>;

  constructor(basePickerProps: S) {
    super(basePickerProps);

    let items = basePickerProps.defaultItems || [];

    this.suggestionManager = new SuggestionController(items);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this.dismissSuggestions = this.dismissSuggestions.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addItemByIndex = this.addItemByIndex.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this._onGetMoreResults = this._onGetMoreResults.bind(this);
    this.state = {
      items: items,
      value: ''
    };
  }

  public componentWillReceiveProps(newProps: IBasePickerProps<T>, newState: IBasePickerState) {
    if (newState.items && newState.items !== this.state.items) {
      this._selection.setItems(newState.items);
    }
  }

  public componentDidMount() {
    this._selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });
    this._selection.setItems(this.state.items);
  }

  public render() {
    let { value } = this.state;
    return (
      <div ref='root' className={ css('ms-BasePicker', this.props.className ? this.props.className : '') } onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection } selectionMode={ SelectionMode.multiple }>
          <FocusZone ref='focusZone' className='ms-BasePicker-text'>
            { this.renderItems() }
            <input ref='input' className='ms-BasePicker-input ms-autocomplete-top' onFocus={ this._onInputFocus } onChange={ this._onInputChange } value={ value } />
          </FocusZone>
        </SelectionZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected renderSuggestions(): JSX.Element {
    let suggestions = this.suggestionManager.getSuggestions();
    let TypedSuggestionElement = this.SuggestionOfProperType;
    return suggestions && suggestions.length > 0 ? (
      <Callout isBeakVisible={ false } gapSpace={ 0 } targetElement={ this.refs.root } onDismiss={ this.dismissSuggestions }>
        <TypedSuggestionElement
          onRenderSuggestion={ this.props.onRenderSuggestion }
          onSuggestionClick={ (ev: React.MouseEvent, index: number) => this.addItemByIndex(index) }
          suggestions={ this.suggestionManager.getSuggestions() }
          suggestionsHeaderText={ this.props.suggestionsHeaderText }
          ref='suggestionElement'
          searchForMoreText={'searchForMoreText'}
          onGetMoreResults={ this._onGetMoreResults }
          className={ this.props.suggestionsClassName }
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

  public addItem(item: any) {
    let newItems = this.state.items.concat([item]);
    this._selection.setItems(newItems);
    this.setState({ items: newItems });
  }

  public removeItem(item: any) {
    let { items } = this.state;
    let index = items.indexOf(item);

    if (index >= 0) {
      let newItems = items.slice(0, index).concat(items.slice(index + 1));

      this._selection.setItems(newItems);
      this.setState({ items: newItems });
    }
  }

  public removeItems(itemsToRemove: any[]) {
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
      this.setState({ value: this.props.getTextFromItem(this.suggestionManager.currentSuggestion.item) }, () => this.refs.suggestionElement.scrollSelected());
    }
  }

  protected _onSelectionChange() {
    this.forceUpdate();
  }

  protected _onInputChange(ev: React.FormEvent) {
    let value = (ev.target as HTMLInputElement).value;
    this._updateValue(value);

  }

  protected _updateSuggestions(suggestions: T[]) {
    this.suggestionManager.updateSuggestions(suggestions);
    this.forceUpdate();
  }

  protected _updateValue(updatedValue: string) {
    let differenceIndex = 0;
    let { value } = this.state;

    if (!this.suggestionManager.currentIndex || updatedValue !== value) {
      let newSuggestions: T[] = this.props.onResolveSuggestions(updatedValue);

      this.suggestionManager.updateSuggestions(newSuggestions);
      let text: string = undefined;
      if (this.suggestionManager.currentSuggestion) {
        text = this.props.getTextFromItem(this.suggestionManager.currentSuggestion.item);
      }

      if (updatedValue) {
        while (differenceIndex < updatedValue.length && updatedValue[differenceIndex].toLocaleLowerCase() === updatedValue[differenceIndex].toLocaleLowerCase()) {
          differenceIndex++;
        }
      }

      this.setState({
        value: text || updatedValue
      }, () => {
        if (text && differenceIndex < text.length) {
          this.refs.input.setSelectionRange(differenceIndex, text.length);
        }
      });
    }
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
          } else {
            // this.refs.suggestionElement.focusSearchForMoreButton();
          }

        }
        break;
    }
  }

  protected _onGetMoreResults() {
    if (this.props.onGetMoreResults) {
      this._updateSuggestions(this.props.onGetMoreResults(this.state.value));
    }
  }

  protected _onBackSpace(ev: React.KeyboardEvent) {
    let { value } = this.state;
    if (ev.target === this.refs.input) {
      if (value && this.suggestionManager.hasSelectedSuggestion() && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
        this.setState({
          value: value.substring(0, this.refs.input.selectionStart)
        });
      } else if (!value && this.state.items.length) {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    } else if (this._selection.getSelectedCount() > 0) {
      this.removeItems(this._selection.getSelection());
    }
  }
}