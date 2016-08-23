import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { KeyCodes } from '../../utilities/KeyCodes';
import { ISelection, Selection, SelectionZone } from '../../utilities/selection/index';
import './BasePicker.scss';

export interface IBasePickerProps {
  onRenderItem: (item: IPickerItemProps) => JSX.Element;
  onRenderSuggestions: (props: IPickerSuggestionsProps) => JSX.Element;

  defaultItems?: any;
  onChange?: (items: any[]) => void;
}

export interface IBasePickerState {
  items?: any;
  suggestions?: JSX.Element;
  value?: string;
  suggestedText?: string;
  suggestedItem?: any;
}

export interface IPickerItemProps {
  item: any;
  index: number;
  isSelected: boolean;
  onRemoveItem?: () => void;
}

export interface IPickerSuggestionsProps {
  text?: string;
  items?: any[];
  selectedIndex?: number;
  onSuggestionAvailable?: (text?: string, item?: any) => void;
  onDismiss?: () => void;
  onAddItem?: (item: any) => void;
  onRemoveItem: (item: any) => void;
}

export interface IPickerSuggestions<T> {
  selectedItem?: T;
}

export class BasePicker<P extends IBasePickerProps, S extends IBasePickerState> extends React.Component<P, IBasePickerState> {
  public refs: {
    [ key: string ]: React.ReactInstance;
    root: HTMLElement;
    input: HTMLInputElement;
    focusZone: FocusZone;
  };

  private _selection: Selection;

  constructor(props: P) {
    super(props);

    let items = props.defaultItems || [];

    this._selection = new Selection({ onSelectionChanged: () => this._onSelectionChange() });
    this._selection.setItems(items);

    this.state = {
      items: items,
      value: ''
    };

    this._onSuggestionAvailable = this._onSuggestionAvailable.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onInputFocus = this._onInputFocus.bind(this);
    this.dismissSuggestions = this.dismissSuggestions.bind(this);
    this.addItem = this.addItem.bind(this);

    this.removeItem = this.removeItem.bind(this);
  }

  public componentWillReceiveProps(newProps: IBasePickerProps, newState: IBasePickerState) {
    if (newState.items !== this.state.items) {
      this._selection.setItems(newState.items);
    }
  }

  public render() {
    let { onRenderItem = () => undefined } = this.props;
    let { items, suggestions, value } = this.state;

    return (
      <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection }>
          <FocusZone ref='focusZone' className='ms-BasePicker-text'>
            { items.map((item, index) => onRenderItem({
              item,
              index,
              isSelected: this._selection.isIndexSelected(index),
              onRemoveItem: () => this.removeItem(item)
            })) }
            <input ref='input' className='ms-BasePicker-input' onFocus={ this._onInputFocus } onChange={ this._onInputChange } value={ value } />
          </FocusZone>
        </SelectionZone>
        { suggestions && (
        <Callout isBeakVisible={ false } gapSpace={ 0 } targetElement={ this.refs.root } onDismiss={ this.dismissSuggestions }>
          { suggestions }
        </Callout>
        ) }
      </div>
    );
  }

  public focus() {
    this.refs.focusZone.focus();
  }

  public showSuggestions(text: string) {
    let { onRenderSuggestions } = this.props;
    let { items } = this.state;

    this.setState({
      suggestions: onRenderSuggestions({
        text,
        items,
        onDismiss: this.dismissSuggestions,
        onAddItem: this.addItem,
        onRemoveItem: this.removeItem,
        onSuggestionAvailable: this._onSuggestionAvailable
      })
    });
  }

  public dismissSuggestions() {
    this.setState({ suggestions: undefined });
  }

  public completeSuggestion() {
    this.addItem(this.state.suggestedItem);
    this.setState({
      value: '',
      suggestedText: '',
      suggestedItem: undefined,
      suggestions: undefined
    });
  }

  public completeEntry() {

  }

  public addItem(item: any) {
    let newItems = this.state.items.concat([ item ]);
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

  private _resetFocus(index: number) {
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

  private _onSuggestionAvailable(text: string, item: any) {
    let differenceIndex = 0;
    let { value } = this.state;

    if (text) {
      while (differenceIndex < text.length && value[differenceIndex] === text[differenceIndex]) {
        differenceIndex++;
      }
    }

    this.setState({
      value: text || value,
      suggestedText: text,
      suggestedItem: item
    }, () => {
      if (text && differenceIndex < text.length) {
        this.refs.input.setSelectionRange(differenceIndex, text.length);
      }
    });
  }

  private _onSelectionChange() {
    this.forceUpdate();
  }

  private _onInputChange(ev: React.FormEvent) {
    let { onRenderSuggestions } = this.props;
    let { items, suggestedText } = this.state;
    let value = (ev.target as HTMLInputElement).value;

    if (value !== suggestedText) {
      if (value) {
        this.showSuggestions(value);
      } else {
        this.dismissSuggestions();
      }
    }

    this.setState({ value: value });
  }

  private _onInputFocus(ev: React.FocusEvent) {
    this._selection.setAllSelected(false);
  }

  private _onKeyDown(ev: React.KeyboardEvent) {
    let { value, suggestedItem } = this.state;

    switch (ev.which) {
      case KeyCodes.escape:
        this.dismissSuggestions();
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (value && suggestedItem) {
          this.completeSuggestion();
          ev.preventDefault();
          ev.stopPropagation();
        }

        break;

      case KeyCodes.backspace:
        if (ev.target === this.refs.input) {
          if (value && value === this.state.suggestedText && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
            this.setState({
              value: value.substring(0, this.refs.input.selectionStart)
            });
          } else if (!value && this.state.items.length) {
            this.removeItem(this.state.items[this.state.items.length - 1]);
          }
        } else if (this._selection.getSelectedCount() > 0) {
          this.removeItems(this._selection.getSelection());
        }
        break;

      case KeyCodes.enter:
        this.completeEntry();
        break;

      default:
    }
  }
}

