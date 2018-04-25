import * as React from 'react';
import {
  BaseComponent,
  KeyCodes,
  css,
  createRef,
  elementContains
} from '../../Utilities';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Callout, DirectionalHint } from '../../Callout';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { Suggestions } from './Suggestions/Suggestions';
import { ISuggestionsProps } from './Suggestions/Suggestions.types';
import { SuggestionsController } from './Suggestions/SuggestionsController';
import { IBasePicker, IBasePickerProps, ValidationState } from './BasePicker.types';
import { IAutofill, Autofill } from '../Autofill/index';
import { IPickerItemProps } from './PickerItem.types';
import { IPersonaProps } from '../Persona/Persona.types';
import * as stylesImport from './BasePicker.scss';
const styles: any = stylesImport;

export interface IBasePickerState {
  items?: any;
  suggestedDisplayValue?: string;
  moreSuggestionsAvailable?: boolean;
  isFocused?: boolean;
  isSearching?: boolean;
  isMostRecentlyUsedVisible?: boolean;
  suggestionsVisible?: boolean;
  suggestionsLoading?: boolean;
  isResultsFooterVisible?: boolean;
}

export class BasePicker<T, P extends IBasePickerProps<T>> extends BaseComponent<P, IBasePickerState> implements IBasePicker<T> {

  protected selection: Selection;

  protected root = createRef<HTMLDivElement>();
  protected input = createRef<IAutofill>();
  protected focusZone = createRef<IFocusZone>();
  protected suggestionElement = createRef<Suggestions<T>>();

  protected suggestionStore: SuggestionsController<T>;
  protected SuggestionOfProperType = Suggestions as new (props: ISuggestionsProps<T>) => Suggestions<T>;
  protected loadingTimer: number | undefined;
  protected currentPromise: PromiseLike<any> | undefined;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    const items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    this.suggestionStore = new SuggestionsController<T>();
    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);
    this.state = {
      items: items,
      suggestedDisplayValue: '',
      isMostRecentlyUsedVisible: false,
      moreSuggestionsAvailable: false,
      isFocused: false,
      isSearching: false
    };
  }

  public get items(): T[] {
    return this.state.items;
  }

  public componentWillUpdate(newProps: P, newState: IBasePickerState): void {
    if (newState.items && newState.items !== this.state.items) {
      this.selection.setItems(newState.items);
    }
  }

  public componentDidMount(): void {
    this.selection.setItems(this.state.items);
    this._onResolveSuggestions = this._async.debounce(this._onResolveSuggestions, this.props.resolveDelay);
  }

  public componentWillReceiveProps(newProps: P): void {
    const newItems = newProps.selectedItems;

    if (newItems) {
      let focusIndex: number;

      // If there are less new items than old items then something was removed and we
      // should try to keep focus consistent
      if (newItems.length < this.state.items.length) {
        focusIndex = this.state.items.indexOf(this.selection.getSelection()[0]);
      }

      this.setState({
        items: newProps.selectedItems
      }, () => {
        if (focusIndex >= 0) {
          this.resetFocus(focusIndex);
        }
      });
    }
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    if (this.loadingTimer) {
      this._async.clearTimeout(this.loadingTimer);
    }
    if (this.currentPromise) {
      this.currentPromise = undefined;
    }
  }

  public focus() {
    if (this.focusZone.current) {
      this.focusZone.current.focus();
    }
  }

  public focusInput() {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  public dismissSuggestions = (ev?: any): void => {
    const selectItemFunction = () => {
      if (this.props.onDismiss) {
        this.props.onDismiss(
          ev,
          this.suggestionStore.currentSuggestion ? this.suggestionStore.currentSuggestion.item : undefined
        );
      }

      if (!ev || (ev && !ev.defaultPrevented)) {
        // Select the first suggestion if one is available when user leaves.
        if (this.canAddItems() && this.suggestionStore.hasSelectedSuggestion() && this.state.suggestedDisplayValue) {
          this.addItemByIndex(0);
        }
      }
    };

    if (this.currentPromise) {
      this.currentPromise.then(() => selectItemFunction());
    } else {
      selectItemFunction();
    }
    this.setState({ suggestionsVisible: false });
  }

  public completeSuggestion() {
    if (this.suggestionStore.hasSelectedSuggestion() && this.input.current) {
      this.addItem(this.suggestionStore.currentSuggestion!.item);
      this.updateValue('');
      this.input.current.clear();
    }
  }

  public refocusSuggestions = (keyCode: KeyCodes): void => {
    this.resetFocus();
    if (this.suggestionStore.suggestions && this.suggestionStore.suggestions.length > 0) {
      if (keyCode === KeyCodes.up) {
        this.suggestionStore.setSelectedSuggestion(this.suggestionStore.suggestions.length - 1);
      } else if (keyCode === KeyCodes.down) {
        this.suggestionStore.setSelectedSuggestion(0);
      }
    }
  }

  public render(): JSX.Element {
    const { suggestedDisplayValue } = this.state;
    const {
      className,
      inputProps,
      disabled
    } = this.props;

    const currentIndex = this.suggestionStore.currentIndex;
    const selectedSuggestion = currentIndex > -1 ? this.suggestionStore.getSuggestionAtIndex(this.suggestionStore.currentIndex) : undefined;
    const selectedSuggestionAlert = selectedSuggestion ? selectedSuggestion.ariaLabel : undefined;
    const activeDescendant = currentIndex > -1 ? 'sug-' + currentIndex : undefined;

    return (
      <div
        ref={ this.root }
        className={ css(
          'ms-BasePicker',
          className ? className : '') }
        onKeyDown={ this.onKeyDown }
      >
        <FocusZone
          componentRef={ this.focusZone }
          direction={ FocusZoneDirection.bidirectional }
          isInnerZoneKeystroke={ this._isFocusZoneInnerKeystroke }
        >
          <div className={ styles.screenReaderOnly } role='alert' id='selected-suggestion-alert' aria-live='assertive'>{ selectedSuggestionAlert } </div>
          <SelectionZone selection={ this.selection } selectionMode={ SelectionMode.multiple }>
            <div className={ css('ms-BasePicker-text', styles.pickerText, this.state.isFocused && styles.inputFocused) } role={ 'list' }>
              { this.renderItems() }
              { this.canAddItems() && (<Autofill
                { ...inputProps as any }
                className={ css('ms-BasePicker-input', styles.pickerInput) }
                ref={ this.input }
                onFocus={ this.onInputFocus }
                onBlur={ this.onInputBlur }
                onInputValueChange={ this.onInputChange }
                suggestedDisplayValue={ suggestedDisplayValue }
                aria-activedescendant={ activeDescendant }
                aria-owns={ this.state.suggestionsVisible ? 'suggestion-list' : undefined }
                aria-expanded={ !!this.state.suggestionsVisible }
                aria-haspopup='true'
                autoCapitalize='off'
                autoComplete='off'
                role='combobox'
                disabled={ disabled }
                aria-controls='selected-suggestion-alert'
                onInputChange={ this.props.onInputChange }
              />) }
            </div>
          </SelectionZone>
        </FocusZone>
        { this.renderSuggestions() }
      </div>
    );
  }

  protected canAddItems(): boolean {
    const { items } = this.state;
    const { itemLimit } = this.props;
    return itemLimit === undefined || items.length < itemLimit;
  }

  protected renderSuggestions(): JSX.Element | null {
    const TypedSuggestion = this.SuggestionOfProperType;
    return this.state.suggestionsVisible && this.input ? (
      <Callout
        isBeakVisible={ false }
        gapSpace={ 5 }
        target={ this.input.current ? this.input.current.inputElement : undefined }
        onDismiss={ this.dismissSuggestions }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        directionalHintForRTL={ DirectionalHint.bottomRightEdge }
      >
        <TypedSuggestion
          onRenderSuggestion={ this.props.onRenderSuggestionsItem }
          onSuggestionClick={ this.onSuggestionClick }
          onSuggestionRemove={ this.onSuggestionRemove }
          suggestions={ this.suggestionStore.getSuggestions() }
          ref={ this.suggestionElement }
          onGetMoreResults={ this.onGetMoreResults }
          moreSuggestionsAvailable={ this.state.moreSuggestionsAvailable }
          isLoading={ this.state.suggestionsLoading }
          isSearching={ this.state.isSearching }
          isMostRecentlyUsedVisible={ this.state.isMostRecentlyUsedVisible }
          isResultsFooterVisible={ this.state.isResultsFooterVisible }
          refocusSuggestions={ this.refocusSuggestions }
          removeSuggestionAriaLabel={ this.props.removeButtonAriaLabel }
          { ...this.props.pickerSuggestionsProps as any }
        />
      </Callout>
    ) : (null);
  }

  protected renderItems(): JSX.Element[] {
    const { disabled, removeButtonAriaLabel } = this.props;
    const onRenderItem = this.props.onRenderItem as (props: IPickerItemProps<T>) => JSX.Element;

    const { items } = this.state;
    return items.map((item: any, index: number) => onRenderItem({
      item,
      index,
      key: item.key ? item.key : index,
      selected: this.selection.isIndexSelected(index),
      onRemoveItem: () => this.removeItem(item),
      disabled: disabled,
      onItemChange: this.onItemChange,
      removeButtonAriaLabel: removeButtonAriaLabel
    }));
  }

  protected resetFocus(index?: number) {
    const { items } = this.state;

    if (items.length && index! >= 0) {
      const newEl: HTMLElement | null = this.root.current && this.root.current.querySelectorAll('[data-selection-index]')[Math.min(index!, items.length - 1)] as HTMLElement | null;
      if (newEl && this.focusZone.current) {
        this.focusZone.current.focusElement(newEl);
      }
    } else if (!this.canAddItems()) {
      (items[items.length - 1] as IPickerItemProps<T>).selected = true;
      this.resetFocus(items.length - 1);
    } else {
      if (this.input.current) {
        this.input.current.focus();
      }
    }
  }

  protected onSuggestionSelect() {
    if (this.suggestionStore.currentSuggestion) {
      const currentValue: string = this.input.current ? this.input.current.value : '';
      const itemValue: string = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, currentValue);
      this.setState({ suggestedDisplayValue: itemValue });
    }
  }

  protected onSelectionChange() {
    this.forceUpdate();
  }

  protected updateSuggestions(suggestions: any[]) {
    this.suggestionStore.updateSuggestions(suggestions, 0);
    this.forceUpdate();
  }

  protected onEmptyInputFocus() {
    const onEmptyInputFocus = this.props.onEmptyInputFocus as (selectedItems?: T[]) => T[] | PromiseLike<T[]>;
    const suggestions: T[] | PromiseLike<T[]> = onEmptyInputFocus(this.state.items);
    this.updateSuggestionsList(suggestions);
  }

  protected updateValue(updatedValue: string) {
    this._onResolveSuggestions(updatedValue);
  }

  protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>, updatedValue?: string) {
    const suggestionsArray: T[] = suggestions as T[];
    const suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

    // Check to see if the returned value is an array, if it is then just pass it into the next function.
    // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
    if (Array.isArray(suggestionsArray)) {
      if (updatedValue !== undefined) {
        this.resolveNewValue(updatedValue, suggestionsArray);
      } else {
        this.suggestionStore.updateSuggestions(suggestionsArray, 0);
      }
    } else if (suggestionsPromiseLike && suggestionsPromiseLike.then) {
      if (!this.loadingTimer) {
        this.loadingTimer = this._async.setTimeout(() => {
          this.setState({
            suggestionsLoading: true
          });
        }, 500);
      }

      // Clear suggestions
      this.suggestionStore.updateSuggestions([]);

      if (updatedValue !== undefined) {
        this.setState({
          suggestionsVisible: this.input.current ? (this.input.current.value !== '' && this.input.current.inputElement === document.activeElement) : false
        });
      } else {
        this.setState({
          suggestionsVisible: this.input.current ? this.input.current.inputElement === document.activeElement : false
        });
      }

      // Ensure that the promise will only use the callback if it was the most recent one.
      const promise: PromiseLike<T[]> = this.currentPromise = suggestionsPromiseLike;
      promise.then((newSuggestions: T[]) => {
        if (promise === this.currentPromise) {
          if (updatedValue !== undefined) {
            this.resolveNewValue(updatedValue, newSuggestions);
          } else {
            this.suggestionStore.updateSuggestions(newSuggestions);
            this.setState({
              suggestionsLoading: false
            });
          }
          if (this.loadingTimer) {
            this._async.clearTimeout(this.loadingTimer);
            this.loadingTimer = undefined;
          }
        }
      });
    }
  }

  protected resolveNewValue(updatedValue: string, suggestions: T[]) {
    this.suggestionStore.updateSuggestions(suggestions, 0);
    let itemValue: string | undefined = undefined;

    if (this.suggestionStore.currentSuggestion) {
      itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, updatedValue);
    }

    this.setState({
      suggestionsLoading: false,
      suggestedDisplayValue: itemValue,
      suggestionsVisible: this.input.current ? (this.input.current.value !== '' && this.input.current.inputElement === document.activeElement) : false
    });
  }

  protected onChange(items?: T[]) {
    if (this.props.onChange) {
      (this.props.onChange as any)(items);
    }
  }

  protected onInputChange = (value: string): void => {
    this.updateValue(value);
    this.setState({
      moreSuggestionsAvailable: true,
      isMostRecentlyUsedVisible: false
    });
  }

  protected onSuggestionClick = (ev: React.MouseEvent<HTMLElement>, item: any, index: number): void => {
    this.addItemByIndex(index);
    this.setState({ suggestionsVisible: false });
  }

  protected onSuggestionRemove = (ev: React.MouseEvent<HTMLElement>, item: IPersonaProps, index: number): void => {
    if (this.props.onRemoveSuggestion) {
      (this.props.onRemoveSuggestion as any)(item);
    }
    this.suggestionStore.removeSuggestion(index);
  }

  protected onInputFocus = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    // Only trigger all of the focus if this component isn't already focused.
    // For example when an item is selected or removed from the selected list it should be treated
    // as though the input is still focused.
    if (!this.state.isFocused) {
      this.setState({ isFocused: true });
      this.selection.setAllSelected(false);
      if (this.input.current && this.input.current.value === '' && this.props.onEmptyInputFocus) {
        this.onEmptyInputFocus();
        this.setState({
          isMostRecentlyUsedVisible: true,
          moreSuggestionsAvailable: false,
          suggestionsVisible: true
        });
      } else if (this.input.current && this.input.current.value) {
        this.setState({
          isMostRecentlyUsedVisible: false,
          suggestionsVisible: true
        });
      }
      if (this.props.inputProps && this.props.inputProps.onFocus) {
        this.props.inputProps.onFocus(ev as React.FocusEvent<HTMLInputElement>);
      }
    }
  }

  protected onInputBlur = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    if (this.props.inputProps && this.props.inputProps.onBlur) {
      this.props.inputProps.onBlur(ev as React.FocusEvent<HTMLInputElement>);
    }
    // Only blur the entire component if an unrelated element gets focus. Otherwise treat it as though it still has focus.
    if (!elementContains(this.root.value!, ev.relatedTarget as HTMLElement)) {
      this.setState({ isFocused: false });
      if (this.props.onBlur) {
        this.props.onBlur(ev as React.FocusEvent<HTMLInputElement>);
      }
    }
  }

  protected onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const keyCode = ev.which;
    switch (keyCode) {
      case KeyCodes.escape:
        if (this.state.suggestionsVisible) {
          this.setState({ suggestionsVisible: false });
          ev.preventDefault();
          ev.stopPropagation();
        }
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (this.suggestionElement.current && this.suggestionElement.current.hasSuggestedActionSelected()) {
          this.suggestionElement.current.executeSelectedAction();
        } else if (!ev.shiftKey && this.suggestionStore.hasSelectedSuggestion() && this.state.suggestionsVisible) {
          this.completeSuggestion();
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          this._onValidateInput();
        }

        break;

      case KeyCodes.backspace:
        if (!this.props.disabled) {
          this.onBackspace(ev);
        }
        ev.stopPropagation();
        break;

      case KeyCodes.del:
        if (!this.props.disabled) {
          if (this.input.current && ev.target === this.input.current.inputElement && this.state.suggestionsVisible && this.suggestionStore.currentIndex !== -1) {
            if (this.props.onRemoveSuggestion) {
              (this.props.onRemoveSuggestion as any)(this.suggestionStore.currentSuggestion!.item);
            }
            this.suggestionStore.removeSuggestion(this.suggestionStore.currentIndex);
            this.forceUpdate();
          } else {
            this.onBackspace(ev);
          }
        }
        ev.stopPropagation();
        break;

      case KeyCodes.up:
        if (this.input.current && ev.target === this.input.current.inputElement && this.state.suggestionsVisible) {
          if (this.suggestionElement.current && this.suggestionElement.current.tryHandleKeyDown(keyCode, this.suggestionStore.currentIndex)) {
            ev.preventDefault();
            ev.stopPropagation();
          } else {
            if (this.suggestionElement.current && this.suggestionElement.current.hasSuggestedAction() && this.suggestionStore.currentIndex === 0) {
              ev.preventDefault();
              ev.stopPropagation();
              this.suggestionElement.current.focusAboveSuggestions();
              this.suggestionStore.deselectAllSuggestions();
              this.forceUpdate();
            } else {
              if (this.suggestionStore.previousSuggestion()) {
                ev.preventDefault();
                ev.stopPropagation();
                this.onSuggestionSelect();
              }
            }
          }
        }
        break;

      case KeyCodes.down:
        if (this.input.current && ev.target === this.input.current.inputElement && this.state.suggestionsVisible) {
          if (this.suggestionElement.current && this.suggestionElement.current.tryHandleKeyDown(keyCode, this.suggestionStore.currentIndex)) {
            ev.preventDefault();
            ev.stopPropagation();
          } else {
            if (this.suggestionElement.current && this.suggestionElement.current.hasSuggestedAction() && (this.suggestionStore.currentIndex + 1) === this.suggestionStore.suggestions.length) {
              ev.preventDefault();
              ev.stopPropagation();
              this.suggestionElement.current.focusBelowSuggestions();
              this.suggestionStore.deselectAllSuggestions();
              this.forceUpdate();
            } else {
              if (this.suggestionStore.nextSuggestion()) {
                ev.preventDefault();
                ev.stopPropagation();
                this.onSuggestionSelect();
              }
            }
          }
        }
        break;
    }
  }

  protected onItemChange = (changedItem: T, index: number): void => {
    const { items } = this.state;

    if (index >= 0) {
      const newItems: T[] = items;
      newItems[index] = changedItem;

      this._updateSelectedItems(newItems);
    }
  }

  protected onGetMoreResults = (): void => {
    this.setState({
      isSearching: true
    }, () => {
      if (this.props.onGetMoreResults && this.input.current) {
        const suggestions: T[] | PromiseLike<T[]> = (this.props.onGetMoreResults as any)(this.input.current.value, this.state.items);
        const suggestionsArray: T[] = suggestions as T[];
        const suggestionsPromiseLike: PromiseLike<T[]> = suggestions as PromiseLike<T[]>;

        if (Array.isArray(suggestionsArray)) {
          this.updateSuggestions(suggestionsArray);
          this.setState({ isSearching: false });
        } else if (suggestionsPromiseLike.then) {
          suggestionsPromiseLike.then((newSuggestions: T[]) => {
            this.updateSuggestions(newSuggestions);
            this.setState({ isSearching: false });
          });
        }
      } else {
        this.setState({ isSearching: false });
      }

      if (this.input.current) {
        this.input.current.focus();
      }

      this.setState({
        moreSuggestionsAvailable: false,
        isResultsFooterVisible: true
      });
    });
  }

  protected addItemByIndex = (index: number): void => {
    this.addItem(this.suggestionStore.getSuggestionAtIndex(index).item);
    if (this.input.current) {
      this.input.current.clear();
    }
    this.updateValue('');
  }

  protected addItem = (item: T): void => {
    const processedItem: T | PromiseLike<T> | null =
      this.props.onItemSelected ? (this.props.onItemSelected as any)(item) : item;

    if (processedItem === null) {
      return;
    }

    const processedItemObject: T = processedItem as T;
    const processedItemPromiseLike: PromiseLike<T> = processedItem as PromiseLike<T>;

    if (processedItemPromiseLike && processedItemPromiseLike.then) {
      processedItemPromiseLike.then((resolvedProcessedItem: T) => {
        const newItems: T[] = this.state.items.concat([resolvedProcessedItem]);
        this._updateSelectedItems(newItems);
      });
    } else {
      const newItems: T[] = this.state.items.concat([processedItemObject]);
      this._updateSelectedItems(newItems);
    }
    this.setState({ suggestedDisplayValue: '' });
  }

  protected removeItem = (item: IPickerItemProps<T>): void => {
    const { items } = this.state;
    const index: number = items.indexOf(item);

    if (index >= 0) {
      const newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));
      this._updateSelectedItems(newItems);
    }
  }

  protected removeItems = (itemsToRemove: any[]): void => {
    const { items } = this.state;
    const newItems: T[] = items.filter((item: any) => itemsToRemove.indexOf(item) === -1);
    const firstItemToRemove = itemsToRemove[0];
    const index: number = items.indexOf(firstItemToRemove);

    this._updateSelectedItems(newItems, index);
  }

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    if (this.state.items.length && !this.input.current || this.input.current && (!this.input.current.isValueSelected && this.input.current.cursorLocation === 0)) {
      if (this.selection.getSelectedCount() > 0) {
        this.removeItems(this.selection.getSelection());
      } else {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  }

  protected _isFocusZoneInnerKeystroke = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    // If suggestions are shown const up/down keys control them, otherwise allow them through to control the focusZone.
    if (this.state.suggestionsVisible) {
      switch (ev.which) {
        case KeyCodes.up:
        case KeyCodes.down:
          return true;
      }
    }

    if (ev.which === KeyCodes.enter) {
      return true;
    }

    return false;
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
   */
  private _updateSelectedItems(items: T[], focusIndex?: number): void {
    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need
      this.onChange(items);
    } else {
      this.setState({ items: items }, () => {
        this._onSelectedItemsUpdated(items, focusIndex);
      });
    }
  }

  private _onSelectedItemsUpdated(items?: T[], focusIndex?: number): void {
    this.resetFocus(focusIndex);
    this.onChange(items);
  }

  private _onResolveSuggestions(updatedValue: string): void {
    const suggestions: T[] | PromiseLike<T[]> | null = this.props.onResolveSuggestions(updatedValue, this.state.items);

    if (suggestions !== null) {
      this.updateSuggestionsList(suggestions, updatedValue);
    }
  }

  private _onValidateInput(): void {
    if (this.props.onValidateInput && this.input.current && (this.props.onValidateInput as any)(this.input.current.value) !== ValidationState.invalid && this.props.createGenericItem) {
      const itemToConvert = this.props.createGenericItem(this.input.current.value, this.props.onValidateInput(this.input.current.value));
      this.suggestionStore.createGenericSuggestion(itemToConvert);
      this.completeSuggestion();
    }
  }

  private _getTextFromItem(item: T, currentValue?: string): string {
    if (this.props.getTextFromItem) {
      return (this.props.getTextFromItem as any)(item, currentValue);
    } else {
      return '';
    }
  }
}

export class BasePickerListBelow<T, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
  public render(): JSX.Element {
    const { suggestedDisplayValue } = this.state;
    const {
      className,
      inputProps,
      disabled
    } = this.props;

    return (
      <div>
        <div
          ref={ this.root }
          className={ css('ms-BasePicker', className ? className : '') }
          onKeyDown={ this.onKeyDown }
        >
          <SelectionZone
            selection={ this.selection }
            selectionMode={ SelectionMode.multiple }
          >
            <div className={ css('ms-BasePicker-text', styles.pickerText, this.state.isFocused && styles.inputFocused) }>
              <Autofill
                { ...inputProps as any }
                className={ css('ms-BasePicker-input', styles.pickerInput) }
                ref={ this.input }
                onFocus={ this.onInputFocus }
                onBlur={ this.onInputBlur }
                onInputValueChange={ this.onInputChange }
                suggestedDisplayValue={ suggestedDisplayValue }
                aria-activedescendant={ this.state.suggestionsVisible ? 'sug-' + this.suggestionStore.currentIndex : undefined }
                aria-owns={ this.state.suggestionsVisible ? 'suggestion-list' : undefined }
                aria-expanded={ !!this.state.suggestionsVisible }
                aria-haspopup='true'
                autoCapitalize='off'
                autoComplete='off'
                role='combobox'
                disabled={ disabled }
              />
            </div>
          </SelectionZone>
        </div>
        { this.renderSuggestions() }
        <FocusZone
          componentRef={ this.focusZone }
          className='ms-BasePicker-selectedItems'
          isCircularNavigation={ true }
          direction={ FocusZoneDirection.bidirectional }
          isInnerZoneKeystroke={ this._isFocusZoneInnerKeystroke }
        >
          { this.renderItems() }
        </FocusZone>

      </div>
    );
  }

  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    // override the existing backspace method to not do anything because the list items appear below.
  }
}
