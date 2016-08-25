import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { Callout } from '../../Callout';
import { KeyCodes } from '../../utilities/KeyCodes';
import { ISelection, Selection, SelectionZone } from '../../utilities/selection/index';
import './BasePicker.scss';

export interface IBasePickerProps extends React.Props<any> {
  onRenderItem: (item: IPickerItemProps) => JSX.Element;
  onRenderSuggestions: (props: IPickerSuggestionsProps) => JSX.Element;

  defaultItems?: any;
  onChange?: (items: any[]) => void;
}

export interface IBasePickerState {
  items?: any;
  suggestions?: JSX.Element;
  value?: string;
  suggestionAvailable?: ISuggestionAvailable;
}

export interface IPickerItemProps extends React.Props<any> {
  item: any;
  index: number;
  isSelected: boolean;
  onRemoveItem?: () => void;
}

export interface ISuggestionAvailable {
  text?: string;
  item?: any;
  onNextSuggestion?: () => boolean;
  onPreviousSuggestion?: () => boolean;
  onSuggestionClick?: (ev: React.MouseEvent, index: number) => ISuggestionAvailable;
}

export interface IPickerSuggestionsProps extends React.Props<any> {
  text?: string;
  items?: any[];
  selectedIndex?: number;
  onSuggestionAvailable?: (props: ISuggestionAvailable) => void;
  onDismiss?: () => void;
  onAddItem?: (item: any) => void;
  onRemoveItem: (item: any) => void;
  onRenderSuggestion?: (props: any, index: number) => JSX.Element;
  onSuggestionClick?: (ev: React.MouseEvent, index: number) => void;
}

export interface IPickerSuggestions<T> {
  selectedItem?: T;
}

export class BasePicker<S extends IBasePickerProps> extends React.Component<S, IBasePickerState> {
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
    this._onSuggestionClick = this._onSuggestionClick.bind(this);

    this.removeItem = this.removeItem.bind(this);
  }

  public componentWillReceiveProps(newProps: IBasePickerProps, newState: IBasePickerState) {
    if (newState.items && newState.items !== this.state.items) {
      this._selection.setItems(newState.items);
    }
  }

  public render() {
    let { value } = this.state;

    return (
      <div ref='root' className='ms-BasePicker' onKeyDown={ this._onKeyDown }>
        <SelectionZone selection={ this._selection }>
          <FocusZone ref='focusZone' className='ms-BasePicker-text'>
            { this.renderItems() }
            <input ref='input' className='ms-BasePicker-input' onFocus={ this._onInputFocus } onChange={ this._onInputChange } value={ value } />
          </FocusZone>
        </SelectionZone>
        { this.renderSuggestions() }
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
        onSuggestionAvailable: this._onSuggestionAvailable,
        onSuggestionClick: this._onSuggestionClick
      })
    });
  }

  public dismissSuggestions() {
    this.setState({ suggestions: undefined });
  }

  public completeSuggestion() {
    let { suggestionAvailable } = this.state;

    if (suggestionAvailable) {
      this.addItem(suggestionAvailable.item);

      this.setState({
        value: '',
        suggestionAvailable: undefined,
        suggestions: undefined
      });
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

  protected renderSuggestions(): JSX.Element {
    let { suggestions } = this.state
    return suggestions ? (
      <Callout isBeakVisible={ false } gapSpace={ 0 } targetElement={ this.refs.root } onDismiss={ this.dismissSuggestions }>
        { suggestions }
      </Callout>
    ) : (null);
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

  protected _onSuggestionAvailable(props: ISuggestionAvailable) {
    let differenceIndex = 0;
    let { value } = this.state;
    let { text, item } = props;

    if (text) {
      while (differenceIndex < text.length && value[differenceIndex] === text[differenceIndex]) {
        differenceIndex++;
      }
    }

    this.setState({
      value: text || value,
      suggestionAvailable: props
    }, () => {
      if (text && differenceIndex < text.length) {
        this.refs.input.setSelectionRange(differenceIndex, text.length);
      }
    });
  }

  protected _onSelectionChange() {
    this.forceUpdate();
  }

  protected _onInputChange(ev: React.FormEvent) {
    let { onRenderSuggestions } = this.props;
    let { items, suggestionAvailable } = this.state;
    let value = (ev.target as HTMLInputElement).value;

    if (!suggestionAvailable || value !== suggestionAvailable.text) {
      if (value) {
        this.showSuggestions(value);
      } else {
        this.dismissSuggestions();
      }
    }

    this.setState({ value: value });
  }

  protected _onInputFocus(ev: React.FocusEvent) {
    this._selection.setAllSelected(false);
  }

  protected _onKeyDown(ev: React.KeyboardEvent) {
    let { value, suggestionAvailable } = this.state;

    switch (ev.which) {
      case KeyCodes.escape:
        this.dismissSuggestions();
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (value && suggestionAvailable) {
          this.completeSuggestion();
          ev.preventDefault();
          ev.stopPropagation();
        }

        break;

      case KeyCodes.backspace:
        this._onBackSpace(ev);
        break;

      case KeyCodes.up:
        if (ev.target === this.refs.input && suggestionAvailable && suggestionAvailable.onPreviousSuggestion()) {
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      case KeyCodes.down:
        if (ev.target === this.refs.input && suggestionAvailable && suggestionAvailable.onNextSuggestion()) {
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;
    }
  }

  protected _onSuggestionClick(ev: React.MouseEvent, index: number): void {
    let { suggestionAvailable } = this.state
    if (suggestionAvailable) {
      let props = suggestionAvailable.onSuggestionClick(ev, index)
      let differenceIndex = 0;
      let { value } = this.state;
      let { text, item } = props;

      if (text) {
        while (differenceIndex < text.length && value[differenceIndex] === text[differenceIndex]) {
          differenceIndex++;
        }
      }

      this.setState({
        value: text || value,
        suggestionAvailable: props
      }, () => {
        if (text && differenceIndex < text.length) {
          this.refs.input.setSelectionRange(differenceIndex, text.length);
        }
        this.completeSuggestion();
      });
    }
  }


  protected _onBackSpace(ev: React.KeyboardEvent) {
    let { value, suggestionAvailable } = this.state;
    if (ev.target === this.refs.input) {
      if (value && suggestionAvailable && value === suggestionAvailable.text && this.refs.input.selectionStart !== this.refs.input.selectionEnd) {
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

