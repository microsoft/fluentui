import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Callout } from '../../Callout';
import { KeyCodes } from '../../utilities/KeyCodes';
import { ISelection, Selection, SelectionZone } from '../../utilities/selection/index';
import { SuggestionElement, ISuggestionElementProps } from './SuggestionElement';
import { Suggestions } from './Suggestions';
import { IBasePickerProps, IPickerItemProps } from './BasePickerProps';
import './BasePicker.scss';

export interface IBasePickerState {
  items?: any;
  value?: string;
}

export class BasePicker<T, S extends IBasePickerProps<T>> extends React.Component<S, IBasePickerState> {
  private suggestionManager: Suggestions<T>;
  private SuggestionOfProperType = SuggestionElement as new (props: ISuggestionElementProps<T>) => SuggestionElement<T>;
  public refs: {
    [key: string]: React.ReactInstance;
    root: HTMLElement;
    input: HTMLInputElement;
    focusZone: FocusZone;
  };

  protected _selection: Selection;

  constructor(props: S) {
    super(props);

    let items = props.defaultItems || [];

    this._selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });
    this._selection.setItems(items);
    this.suggestionManager = new Suggestions(items);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this.dismissSuggestions = this.dismissSuggestions.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addItemByIndex = this.addItemByIndex.bind(this);
    this.removeItem = this.removeItem.bind(this);
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
  }

  public render() {
    let { value } = this.state;
    let { input } = this.refs;
    let ghostDivStyle = {};
    if (input) {
      let style = window.getComputedStyle(input);
      let tryMargin = parseFloat(style.paddingLeft)
      let margin = tryMargin && !isNaN(tryMargin) ? tryMargin : 0;
      ghostDivStyle = { left: this.refs.input.offsetLeft + this._calculateStringWidthInPixels(value) + margin + 'px' };
    }
    return (
      <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection }>
          <FocusZone ref='focusZone' className='ms-BasePicker-text'>
            { this.renderItems() }
            <input ref='input' className='ms-BasePicker-input' onFocus={ this._onInputFocus } onChange={ this._onInputChange } value={ value }/>
            { this.suggestionManager.currentSuggestion ?
              <div className='ms-CurrentSuggestion' style={ ghostDivStyle }>
                { this.props.onRenderItem({
                  item: this.suggestionManager.currentSuggestion.item,
                  index: this.suggestionManager.currentIndex,
                  isSelected: false
                }) }
              </div> : null }
          </FocusZone>
        </SelectionZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected renderSuggestions(): JSX.Element {
    let suggestions = this.suggestionManager.getSuggestions();
    let TypedSuggestionElement = this.SuggestionOfProperType
    return suggestions && suggestions.length > 0 ? (
      <Callout isBeakVisible={ false } gapSpace={ 0 } targetElement={ this.refs.root } onDismiss={ this.dismissSuggestions }>
        <TypedSuggestionElement
          onRenderSuggestion={this.props.onRenderSuggestion}
          onSuggestionClick={(ev: React.MouseEvent, index: number) => this.addItemByIndex(index) }
          suggestions={this.suggestionManager.getSuggestions() }
          suggestionLimit={ 2 }
          />
      </Callout>
    ) : (null);
  }

  public focus() {
    this.refs.focusZone.focus();
  }

  public dismissSuggestions() {
    this._updateSuggestions('');
  }

  public completeSuggestion() {

    if (this.suggestionManager.hasSelectedSuggestion()) {
      this.addItem(this.suggestionManager.currentSuggestion.item);
      this._updateSuggestions('');
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
    this._updateSuggestions('');
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

  protected _onSelectionChange() {
    this.forceUpdate();
  }

  protected _onInputChange(ev: React.FormEvent) {
    let value = (ev.target as HTMLInputElement).value;
    this._updateSuggestions(value);

  }

  protected _updateSuggestions(value: string) {
    if (!this.suggestionManager.currentIndex || value !== this.state.value) {
      let newValue: string = value ? value : '';
      let newSuggestions: T[] = this.props.onResolveSuggestions(value);
      this.suggestionManager.updateSuggestions(newSuggestions);
      this.setState({ value: newValue });
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
          this.forceUpdate();
        }
        break;

      case KeyCodes.down:
        if (ev.target === this.refs.input && this.suggestionManager.nextSuggestion()) {
          ev.preventDefault();
          ev.stopPropagation();
          this.forceUpdate();
        }
        break;
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

  protected _calculateStringWidthInPixels(value: string): number {

    let spanElement: HTMLElement = document.createElement('span');
    spanElement.style.setProperty('width', 'auto');
    spanElement.style.setProperty('visibility', 'hidden');
    spanElement.style.setProperty('top', '-9999px');
    spanElement.style.setProperty('left', '-9999px');
    spanElement.style.setProperty('position', 'absolute');
    spanElement.innerHTML = this.state.value;
    document.body.appendChild(spanElement);
    let spanWidth = spanElement.clientWidth;
    document.body.removeChild(spanElement);
    return spanWidth;
  }


}