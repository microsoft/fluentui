import * as React from 'react';
import { BaseComponent, KeyCodes, css } from '../../Utilities';
import { Autofill } from '../../Autofill';
import { IInputProps } from '../../Pickers';
import * as stylesImport from './BaseExtendedPicker.scss';
import { IBaseExtendedPickerProps, IBaseExtendedPicker } from './BaseExtendedPicker.types';
import { IBaseFloatingPickerProps, BaseFloatingPicker } from '../../FloatingPicker';
import { BaseSelectedItemsList, IBaseSelectedItemsListProps } from '../../SelectedItemsList';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Selection, SelectionMode, SelectionZone } from '../../Selection';
// tslint:disable-next-line:no-any
const styles: any = stylesImport;

export interface IBaseExtendedPickerState<T> {
  queryString: string | null;
  selectedItems: T[] | null;
  suggestionItems: T[] | null;
}

export class BaseExtendedPicker<T, P extends IBaseExtendedPickerProps<T>> extends BaseComponent<P, IBaseExtendedPickerState<T>>
  implements IBaseExtendedPicker<T> {
  public floatingPicker = React.createRef<BaseFloatingPicker<T, IBaseFloatingPickerProps<T>>>();
  public selectedItemsList = React.createRef<BaseSelectedItemsList<T, IBaseSelectedItemsListProps<T>>>();

  protected root = React.createRef<HTMLDivElement>();
  protected input = React.createRef<Autofill>();
  protected selection: Selection;
  protected floatingPickerProps: IBaseFloatingPickerProps<T>;
  protected selectedItemsListProps: IBaseSelectedItemsListProps<T>;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });

    this.state = {
      queryString: '',
      suggestionItems: this.props.suggestionItems ? (this.props.suggestionItems as T[]) : null,
      selectedItems: this.props.defaultSelectedItems
        ? (this.props.defaultSelectedItems as T[])
        : this.props.selectedItems
        ? (this.props.selectedItems as T[])
        : null
    };

    this.floatingPickerProps = this.props.floatingPickerProps;
    this.selectedItemsListProps = this.props.selectedItemsListProps;
  }

  // tslint:disable-next-line:no-any
  public get items(): any {
    return this.state.selectedItems
      ? this.state.selectedItems
      : this.selectedItemsList.current
      ? this.selectedItemsList.current.items
      : null;
  }

  public componentDidMount(): void {
    this.forceUpdate();
  }

  public componentWillReceiveProps(newProps: P): void {
    if (newProps.floatingPickerProps) {
      this.floatingPickerProps = newProps.floatingPickerProps;
    }

    if (newProps.selectedItemsListProps) {
      this.selectedItemsListProps = newProps.selectedItemsListProps;
    }

    if (newProps.selectedItems) {
      this.setState({ selectedItems: newProps.selectedItems });
    }
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

  public get highlightedItems(): T[] {
    return this.selectedItemsList.current ? this.selectedItemsList.current.highlightedItems() : [];
  }

  public render(): JSX.Element {
    const { className, inputProps, disabled, focusZoneProps } = this.props;
    const activeDescendant =
      this.floatingPicker.current && this.floatingPicker.current.currentSelectedSuggestionIndex !== -1
        ? 'sug-' + this.floatingPicker.current.currentSelectedSuggestionIndex
        : undefined;

    return (
      <div
        ref={this.root}
        className={css('ms-BasePicker ms-BaseExtendedPicker', className ? className : '')}
        onKeyDown={this.onBackspace}
        onCopy={this.onCopy}
      >
        <FocusZone direction={FocusZoneDirection.bidirectional} {...focusZoneProps}>
          <SelectionZone selection={this.selection} selectionMode={SelectionMode.multiple}>
            <div className={css('ms-BasePicker-text', styles.pickerText)} role={'list'}>
              {this.props.headerComponent}
              {this.renderSelectedItemsList()}
              {this.canAddItems() && (
                <Autofill
                  {...inputProps as IInputProps}
                  className={css('ms-BasePicker-input', styles.pickerInput)}
                  ref={this.input}
                  onFocus={this.onInputFocus}
                  onClick={this.onInputClick}
                  onInputValueChange={this.onInputChange}
                  aria-activedescendant={activeDescendant}
                  aria-owns="suggestion-list"
                  aria-expanded={this.floatingPicker.current ? this.floatingPicker.current.isSuggestionsShown : false}
                  aria-haspopup="true"
                  autoCapitalize="off"
                  autoComplete="off"
                  role="combobox"
                  disabled={disabled}
                  onPaste={this.onPaste}
                />
              )}
            </div>
          </SelectionZone>
        </FocusZone>
        {this.renderFloatingPicker()}
      </div>
    );
  }

  protected onSelectionChange = (): void => {
    this.forceUpdate();
  };

  protected canAddItems(): boolean {
    const { itemLimit } = this.props;
    return itemLimit === undefined || this.items.length < itemLimit;
  }

  protected renderFloatingPicker(): JSX.Element {
    const FloatingPicker: React.ComponentType<IBaseFloatingPickerProps<T>> = this.props.onRenderFloatingPicker;
    return (
      <FloatingPicker
        componentRef={this.floatingPicker}
        onChange={this._onSuggestionSelected}
        inputElement={this.input.current ? this.input.current.inputElement : undefined}
        selectedItems={this.items}
        suggestionItems={this.props.suggestionItems ? this.props.suggestionItems : undefined}
        {...this.floatingPickerProps}
      />
    );
  }

  protected renderSelectedItemsList(): JSX.Element {
    const SelectedItems: React.ComponentType<IBaseSelectedItemsListProps<T>> = this.props.onRenderSelectedItems;
    return (
      <SelectedItems
        componentRef={this.selectedItemsList}
        selection={this.selection}
        selectedItems={this.props.selectedItems ? this.props.selectedItems : undefined}
        onItemsDeleted={this.props.selectedItems ? this.props.onItemsRemoved : undefined}
        {...this.selectedItemsListProps}
      />
    );
  }

  protected onInputChange = (value: string): void => {
    this.setState({ queryString: value });
    if (this.floatingPicker.current) {
      this.floatingPicker.current.onQueryStringChanged(value);
    }
  };

  protected onInputFocus = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    if (this.selectedItemsList.current) {
      this.selectedItemsList.current.unselectAll();
    }

    if (this.props.inputProps && this.props.inputProps.onFocus) {
      this.props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
    }
  };

  protected onInputClick = (ev: React.MouseEvent<HTMLInputElement | Autofill>): void => {
    if (this.selectedItemsList.current) {
      this.selectedItemsList.current.unselectAll();
    }

    if (this.floatingPicker.current && this.inputElement) {
      // Update the value if the input value is empty or it is different than the current inputText from the floatingPicker
      const shoudUpdateValue = this.inputElement.value === '' || this.inputElement.value !== this.floatingPicker.current.inputText;
      this.floatingPicker.current.showPicker(shoudUpdateValue);
    }
  };

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.which !== KeyCodes.backspace) {
      return;
    }

    if (this.selectedItemsList.current && this.items.length) {
      if (
        this.input.current &&
        !this.input.current.isValueSelected &&
        this.input.current.inputElement === document.activeElement &&
        (this.input.current as Autofill).cursorLocation === 0
      ) {
        if (this.floatingPicker.current) {
          this.floatingPicker.current.hidePicker();
        }
        ev.preventDefault();
        this.selectedItemsList.current.removeItemAt(this.items.length - 1);
        this._onSelectedItemsChanged();
      } else if (this.selectedItemsList.current.hasSelectedItems()) {
        if (this.floatingPicker.current) {
          this.floatingPicker.current.hidePicker();
        }
        ev.preventDefault();
        this.selectedItemsList.current.removeSelectedItems();
        this._onSelectedItemsChanged();
      }
    }
  };

  protected onCopy = (ev: React.ClipboardEvent<HTMLElement>): void => {
    if (this.selectedItemsList.current) {
      // Pass it down into the selected items list
      this.selectedItemsList.current.onCopy(ev);
    }
  };

  protected onPaste = (ev: React.ClipboardEvent<Autofill | HTMLInputElement>): void => {
    if (this.props.onPaste) {
      const inputText = ev.clipboardData.getData('Text');
      ev.preventDefault();
      this.props.onPaste(inputText);
    }
  };

  protected _onSuggestionSelected = (item: T): void => {
    const currentRenderedQueryString = this.props.currentRenderedQueryString;
    const queryString = this.state.queryString;
    if (currentRenderedQueryString === undefined || currentRenderedQueryString === queryString) {
      const processedItem: T | PromiseLike<T> | null = this.props.onItemSelected ? (this.props.onItemSelected as any)(item) : item;

      if (processedItem === null) {
        return;
      }

      const processedItemObject: T = processedItem as T;
      const processedItemPromiseLike: PromiseLike<T> = processedItem as PromiseLike<T>;

      let newItem: T;
      if (processedItemPromiseLike && processedItemPromiseLike.then) {
        processedItemPromiseLike.then((resolvedProcessedItem: T) => {
          newItem = resolvedProcessedItem;
          this._addProcessedItem(newItem);
        });
      } else {
        newItem = processedItemObject;
        this._addProcessedItem(newItem);
      }
    }
  };

  protected _onSelectedItemsChanged = (): void => {
    this.focus();
  };

  private _addProcessedItem(newItem: T) {
    // If this is a controlled component, call the on item selected callback
    // Otherwise add it to the selectedItemsList
    if (this.props.onItemAdded) {
      this.props.onItemAdded(newItem);
    }

    if (this.selectedItemsList.current) {
      this.selectedItemsList.current.addItems([newItem]);
    }

    if (this.input.current) {
      this.input.current.clear();
    }

    if (this.floatingPicker.current) {
      this.floatingPicker.current.hidePicker();
    }

    this.focus();
  }
}
