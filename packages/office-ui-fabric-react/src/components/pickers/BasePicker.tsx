import * as React from 'react';
import { BaseComponent, KeyCodes, css, elementContains, getId, classNamesFunction, styled } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Callout, DirectionalHint } from '../../Callout';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { Suggestions } from './Suggestions/Suggestions';
import { ISuggestions, ISuggestionsProps, ISuggestionsStyleProps, ISuggestionsStyles } from './Suggestions/Suggestions.types';
import { getStyles as suggestionsStyles } from './Suggestions/Suggestions.styles';
import { SuggestionsController } from './Suggestions/SuggestionsController';
import { IBasePicker, IBasePickerProps, ValidationState, IBasePickerStyleProps, IBasePickerStyles } from './BasePicker.types';
import { IAutofill, Autofill } from '../Autofill/index';
import { IPickerItemProps } from './PickerItem.types';
import { IPersonaProps } from '../Persona/Persona.types';
import * as stylesImport from './BasePicker.scss';
const legacyStyles: any = stylesImport;

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
  selectedIndices?: number[];
}

/**
 * Aria id's for internal picker components
 */
export type IPickerAriaIds = {
  /**
   * Aria id for selected suggestion alert component
   */
  selectedSuggestionAlert: string;
  /**
   * Aria id for selected items container component
   */
  selectedItems: string;
  /**
   * Aria id for suggestions list component
   */
  suggestionList: string;
};

const getClassNames = classNamesFunction<IBasePickerStyleProps, IBasePickerStyles>();

export class BasePicker<T, P extends IBasePickerProps<T>> extends BaseComponent<P, IBasePickerState> implements IBasePicker<T> {
  // Refs
  protected root = React.createRef<HTMLDivElement>();
  protected input = React.createRef<IAutofill>();
  protected focusZone = React.createRef<IFocusZone>();
  protected suggestionElement = React.createRef<ISuggestions<T>>();

  protected selection: Selection;
  protected suggestionStore: SuggestionsController<T>;
  protected SuggestionOfProperType = Suggestions as new (props: ISuggestionsProps<T>) => Suggestions<T>;
  protected currentPromise: PromiseLike<any> | undefined;
  protected _ariaMap: IPickerAriaIds;
  private _id: string;

  constructor(basePickerProps: P) {
    super(basePickerProps);

    const items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    this._id = getId();
    this._ariaMap = {
      selectedItems: `selected-items-${this._id}`,
      selectedSuggestionAlert: `selected-suggestion-alert-${this._id}`,
      suggestionList: `suggestion-list-${this._id}`
    };
    this.suggestionStore = new SuggestionsController<T>();
    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);
    this.state = {
      items: items,
      suggestedDisplayValue: '',
      isMostRecentlyUsedVisible: false,
      moreSuggestionsAvailable: false,
      isFocused: false,
      isSearching: false,
      selectedIndices: []
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

      this.setState(
        {
          items: newProps.selectedItems
        },
        () => {
          // Only update the focus if this component is currently focused to ensure that the basepicker
          // doesn't steal focus from something else.
          if (this.state.isFocused) {
            // Need to reset focus in the same that way that we do if an item is selected by a non-controlled component
            // See _onSelectedItemsUpdated.
            this.resetFocus(focusIndex);
          }
        }
      );
    }
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
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
        this.props.onDismiss(ev, this.suggestionStore.currentSuggestion ? this.suggestionStore.currentSuggestion.item : undefined);
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
  };

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
  };

  public render(): JSX.Element {
    const { suggestedDisplayValue, isFocused } = this.state;
    const { className, inputProps, disabled, theme, styles } = this.props;

    const selectedSuggestionAlertId = this.props.enableSelectedSuggestionAlert ? this._ariaMap.selectedSuggestionAlert : '';
    const suggestionsAvailable = this.state.suggestionsVisible ? this._ariaMap.suggestionList : '';

    // TODO
    // Clean this up by leaving only the first part after removing support for SASS.
    // Currently we can not remove the SASS styles from BasePicker class because it
    // might be used by consumers who created custom pickers from extending from
    // this base class and have not used the new 'styles' prop.
    // We check for 'styles' prop which is going to be injected by the 'styled' HOC
    // for every other already existing picker variant (PeoplePicker, TagPicker)
    // so that we can use the CSS-in-JS styles. If the check fails (ex: custom picker),
    // then we just use the old SASS styles instead.
    const classNames: Partial<IProcessedStyleSet<IBasePickerStyles>> = styles
      ? getClassNames(styles, {
          theme,
          className,
          isFocused,
          disabled,
          inputClassName: inputProps && inputProps.className
        })
      : {
          root: css('ms-BasePicker', className ? className : ''),
          text: css('ms-BasePicker-text', legacyStyles.pickerText, this.state.isFocused && legacyStyles.inputFocused),
          itemsWrapper: legacyStyles.pickerItems,
          input: css('ms-BasePicker-input', legacyStyles.pickerInput, inputProps && inputProps.className),
          screenReaderText: legacyStyles.screenReaderOnly
        };

    return (
      <div ref={this.root} className={classNames.root} onKeyDown={this.onKeyDown} onBlur={this.onBlur}>
        <FocusZone
          componentRef={this.focusZone}
          direction={FocusZoneDirection.bidirectional}
          isInnerZoneKeystroke={this._isFocusZoneInnerKeystroke}
        >
          {this.getSuggestionsAlert(classNames.screenReaderText)}
          <SelectionZone selection={this.selection} selectionMode={SelectionMode.multiple}>
            <div className={classNames.text}>
              <span id={this._ariaMap.selectedItems} className={classNames.itemsWrapper} role={'list'}>
                {this.renderItems()}
              </span>
              {this.canAddItems() && (
                <Autofill
                  spellCheck={false}
                  {...inputProps as any}
                  className={classNames.input}
                  componentRef={this.input}
                  onFocus={this.onInputFocus}
                  onBlur={this.onInputBlur}
                  onInputValueChange={this.onInputChange}
                  suggestedDisplayValue={suggestedDisplayValue}
                  aria-activedescendant={this.getActiveDescendant()}
                  aria-expanded={!!this.state.suggestionsVisible}
                  aria-haspopup="true"
                  aria-describedby={this._ariaMap.selectedItems}
                  autoCapitalize="off"
                  autoComplete="off"
                  role={'combobox'}
                  disabled={disabled}
                  aria-controls={`${suggestionsAvailable} ${selectedSuggestionAlertId}` || undefined}
                  aria-owns={suggestionsAvailable || undefined}
                  aria-autocomplete={'both'}
                  onInputChange={this.props.onInputChange}
                />
              )}
            </div>
          </SelectionZone>
        </FocusZone>
        {this.renderSuggestions()}
      </div>
    );
  }

  protected canAddItems(): boolean {
    const { items } = this.state;
    const { itemLimit } = this.props;
    return itemLimit === undefined || items.length < itemLimit;
  }

  protected renderSuggestions(): JSX.Element | null {
    const TypedSuggestions = this.SuggestionOfProperType;

    // TODO:
    // Move this styled component in a separate file and make it available to the public API.
    // This should be done after rewriting pickers to use a composition pattern instead of inheritance.
    const StyledTypedSuggestions = styled<ISuggestionsProps<T>, ISuggestionsStyleProps, ISuggestionsStyles>(
      TypedSuggestions,
      suggestionsStyles,
      undefined,
      { scope: 'Suggestions' }
    );

    return this.state.suggestionsVisible && this.input ? (
      <Callout
        isBeakVisible={false}
        gapSpace={5}
        target={this.input.current ? this.input.current.inputElement : undefined}
        onDismiss={this.dismissSuggestions}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintForRTL={DirectionalHint.bottomRightEdge}
        {...this.props.pickerCalloutProps}
      >
        <StyledTypedSuggestions
          onRenderSuggestion={this.props.onRenderSuggestionsItem}
          onSuggestionClick={this.onSuggestionClick}
          onSuggestionRemove={this.onSuggestionRemove}
          suggestions={this.suggestionStore.getSuggestions()}
          componentRef={this.suggestionElement}
          onGetMoreResults={this.onGetMoreResults}
          moreSuggestionsAvailable={this.state.moreSuggestionsAvailable}
          isLoading={this.state.suggestionsLoading}
          isSearching={this.state.isSearching}
          isMostRecentlyUsedVisible={this.state.isMostRecentlyUsedVisible}
          isResultsFooterVisible={this.state.isResultsFooterVisible}
          refocusSuggestions={this.refocusSuggestions}
          removeSuggestionAriaLabel={this.props.removeButtonAriaLabel}
          suggestionsListId={this._ariaMap.suggestionList}
          {...this.props.pickerSuggestionsProps}
        />
      </Callout>
    ) : null;
  }

  protected renderItems(): JSX.Element[] {
    const { disabled, removeButtonAriaLabel } = this.props;
    const onRenderItem = this.props.onRenderItem as (props: IPickerItemProps<T>) => JSX.Element;

    const { items, selectedIndices } = this.state;
    return items.map((item: any, index: number) =>
      onRenderItem({
        item,
        index,
        key: item.key ? item.key : index,
        selected: selectedIndices!.indexOf(index) !== -1,
        onRemoveItem: () => this.removeItem(item, true),
        disabled: disabled,
        onItemChange: this.onItemChange,
        removeButtonAriaLabel: removeButtonAriaLabel
      })
    );
  }

  protected resetFocus(index?: number) {
    const { items } = this.state;

    if (items.length && index! >= 0) {
      const newEl: HTMLElement | null =
        this.root.current &&
        (this.root.current.querySelectorAll('[data-selection-index]')[Math.min(index!, items.length - 1)] as HTMLElement | null);
      if (newEl && this.focusZone.current) {
        this.focusZone.current.focusElement(newEl);
      }
    } else if (!this.canAddItems()) {
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
    this.setState({
      selectedIndices: this.selection.getSelectedIndices()
    });
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

    // Check to see if the returned value is an array, if it is then just pass it into the next function .
    // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
    if (Array.isArray(suggestionsArray)) {
      this._updateAndResolveValue(updatedValue, suggestionsArray);
    } else if (suggestionsPromiseLike && suggestionsPromiseLike.then) {
      this.setState({
        suggestionsLoading: true
      });

      // Clear suggestions
      this.suggestionStore.updateSuggestions([]);

      if (updatedValue !== undefined) {
        this.setState({
          suggestionsVisible: this.input.current
            ? this.input.current.value !== '' && this.input.current.inputElement === document.activeElement
            : false
        });
      } else {
        this.setState({
          suggestionsVisible: this.input.current ? this.input.current.inputElement === document.activeElement : false
        });
      }

      // Ensure that the promise will only use the callback if it was the most recent one.
      const promise: PromiseLike<T[]> = (this.currentPromise = suggestionsPromiseLike);
      promise.then((newSuggestions: T[]) => {
        if (promise === this.currentPromise) {
          this._updateAndResolveValue(updatedValue, newSuggestions);
        }
      });
    }
  }

  protected resolveNewValue(updatedValue: string, suggestions: T[]) {
    this.updateSuggestions(suggestions);
    let itemValue: string | undefined = undefined;

    if (this.suggestionStore.currentSuggestion) {
      itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, updatedValue);
    }

    // Only set suggestionloading to false after there has been time for the new suggestions to flow
    // to the suggestions list. This is to ensure that the suggestions are available before aria-activedescendant
    // is set so that screen readers will read out the first selected option.
    this.setState(
      {
        suggestedDisplayValue: itemValue,
        suggestionsVisible: this.input.current
          ? this.input.current.value !== '' && this.input.current.inputElement === document.activeElement
          : false
      },
      () => this.setState({ suggestionsLoading: false })
    );
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
  };

  protected onSuggestionClick = (ev: React.MouseEvent<HTMLElement>, item: any, index: number): void => {
    this.addItemByIndex(index);
    this.setState({ suggestionsVisible: false });
  };

  protected onSuggestionRemove = (ev: React.MouseEvent<HTMLElement>, item: IPersonaProps, index: number): void => {
    if (this.props.onRemoveSuggestion) {
      (this.props.onRemoveSuggestion as any)(item);
    }
    this.suggestionStore.removeSuggestion(index);
  };

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
  };

  protected onInputBlur = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    if (this.props.inputProps && this.props.inputProps.onBlur) {
      this.props.inputProps.onBlur(ev as React.FocusEvent<HTMLInputElement>);
    }
  };

  protected onBlur = (ev: React.FocusEvent<HTMLElement | Autofill>): void => {
    if (this.state.isFocused) {
      // Only blur the entire component if an unrelated element gets focus. Otherwise treat it as though it still has focus.
      // Do nothing if the blur is coming from something
      // inside the comboBox root or the comboBox menu since
      // it we are not really bluring from the whole comboBox
      let relatedTarget: EventTarget | null = ev.relatedTarget;

      if (ev.relatedTarget === null) {
        // In IE11, due to lack of support, event.relatedTarget is always
        // null making every onBlur call to be "outside" of the ComboBox
        // even when it's not. Using document.activeElement is another way
        // for us to be able to get what the relatedTarget without relying
        // on the event
        relatedTarget = document.activeElement;
      }
      if (relatedTarget && !elementContains(this.root.current!, relatedTarget as HTMLElement)) {
        this.setState({ isFocused: false });
        if (this.props.onBlur) {
          this.props.onBlur(ev as React.FocusEvent<HTMLInputElement>);
        }
      }
    }
  };

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
          if (
            this.input.current &&
            ev.target === this.input.current.inputElement &&
            this.state.suggestionsVisible &&
            this.suggestionStore.currentIndex !== -1
          ) {
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
          if (
            this.suggestionElement.current &&
            this.suggestionElement.current.tryHandleKeyDown(keyCode, this.suggestionStore.currentIndex)
          ) {
            ev.preventDefault();
            ev.stopPropagation();
          } else {
            if (
              this.suggestionElement.current &&
              this.suggestionElement.current.hasSuggestedAction() &&
              this.suggestionStore.currentIndex === 0
            ) {
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
          if (
            this.suggestionElement.current &&
            this.suggestionElement.current.tryHandleKeyDown(keyCode, this.suggestionStore.currentIndex)
          ) {
            ev.preventDefault();
            ev.stopPropagation();
          } else {
            if (
              this.suggestionElement.current &&
              this.suggestionElement.current.hasSuggestedAction() &&
              this.suggestionStore.currentIndex + 1 === this.suggestionStore.suggestions.length
            ) {
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
  };

  protected onItemChange = (changedItem: T, index: number): void => {
    const { items } = this.state;

    if (index >= 0) {
      const newItems: T[] = items;
      newItems[index] = changedItem;

      this._updateSelectedItems(newItems);
    }
  };

  protected onGetMoreResults = (): void => {
    this.setState(
      {
        isSearching: true
      },
      () => {
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
      }
    );
  };

  protected addItemByIndex = (index: number): void => {
    this.addItem(this.suggestionStore.getSuggestionAtIndex(index).item);
    if (this.input.current) {
      this.input.current.clear();
    }
    this.updateValue('');
  };

  protected addItem = (item: T): void => {
    const processedItem: T | PromiseLike<T> | null = this.props.onItemSelected ? (this.props.onItemSelected as any)(item) : item;

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
  };

  protected removeItem = (item: IPickerItemProps<T>, focusNextItem?: boolean): void => {
    const { items } = this.state;
    const index: number = items.indexOf(item);

    if (index >= 0) {
      const newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));
      this._updateSelectedItems(newItems, focusNextItem ? index : undefined);
    }
  };

  protected removeItems = (itemsToRemove: any[]): void => {
    const { items } = this.state;
    const newItems: T[] = items.filter((item: any) => itemsToRemove.indexOf(item) === -1);
    const firstItemToRemove = itemsToRemove[0];
    const index: number = items.indexOf(firstItemToRemove);

    this._updateSelectedItems(newItems, index);
  };

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    if (
      (this.state.items.length && !this.input.current) ||
      (this.input.current && (!this.input.current.isValueSelected && this.input.current.cursorLocation === 0))
    ) {
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
  };

  protected getActiveDescendant() {
    const currentIndex = this.suggestionStore.currentIndex;
    return currentIndex > -1 && !this.state.suggestionsLoading ? 'sug-' + currentIndex : undefined;
  }

  protected getSuggestionsAlert(suggestionAlertClassName: string = legacyStyles.screenReaderOnly) {
    const currentIndex = this.suggestionStore.currentIndex;
    if (this.props.enableSelectedSuggestionAlert) {
      const selectedSuggestion =
        currentIndex > -1 ? this.suggestionStore.getSuggestionAtIndex(this.suggestionStore.currentIndex) : undefined;
      const selectedSuggestionAlertText = selectedSuggestion ? selectedSuggestion.ariaLabel : undefined;
      return (
        <div className={suggestionAlertClassName} role="alert" id={this._ariaMap.selectedSuggestionAlert} aria-live="assertive">
          {selectedSuggestionAlertText}{' '}
        </div>
      );
    }
  }
  /**
   * Takes in the current updated value and either resolves it with the new suggestions
   * or if updated value is undefined then it clears out currently suggested items
   */
  private _updateAndResolveValue(updatedValue: string | undefined, newSuggestions: T[]) {
    if (updatedValue !== undefined) {
      this.resolveNewValue(updatedValue, newSuggestions);
    } else {
      this.suggestionStore.updateSuggestions(newSuggestions, -1);
      if (this.state.suggestionsLoading) {
        this.setState({
          suggestionsLoading: false
        });
      }
    }
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If selectedItems is provided as a property then this will act as a controlled component and it will not update it's own state.
   */
  private _updateSelectedItems(items: T[], focusIndex?: number): void {
    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need to add or remove the items.
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
    if (
      this.props.onValidateInput &&
      this.input.current &&
      (this.props.onValidateInput as any)(this.input.current.value) !== ValidationState.invalid &&
      this.props.createGenericItem
    ) {
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
    const { suggestedDisplayValue, isFocused } = this.state;
    const { className, inputProps, disabled, theme, styles } = this.props;

    const selectedSuggestionAlertId: string | undefined = this.props.enableSelectedSuggestionAlert
      ? this._ariaMap.selectedSuggestionAlert
      : '';
    const suggestionsAvailable: string | undefined = this.state.suggestionsVisible ? this._ariaMap.suggestionList : '';

    // TODO
    // Clean this up by leaving only the first part after removing support for SASS.
    // Currently we can not remove the SASS styles from BasePicker class because it
    // might be used by consumers who created custom pickers from extending from
    // this base class and have not used the new 'styles' prop.
    // We check for 'styles' prop which is going to be injected by the 'styled' HOC
    // for every other already existing picker variant (PeoplePicker, TagPicker)
    // so that we can use the CSS-in-JS styles. If the check fails (ex: custom picker),
    // then we just use the old SASS styles instead.
    const classNames: Partial<IProcessedStyleSet<IBasePickerStyles>> = styles
      ? getClassNames(styles, {
          theme,
          className,
          isFocused,
          inputClassName: inputProps && inputProps.className
        })
      : {
          root: css('ms-BasePicker', className ? className : ''),
          text: css('ms-BasePicker-text', legacyStyles.pickerText, this.state.isFocused && legacyStyles.inputFocused),
          input: css('ms-BasePicker-input', legacyStyles.pickerInput, inputProps && inputProps.className),
          screenReaderText: legacyStyles.screenReaderOnly
        };

    return (
      <div ref={this.root} onBlur={this.onBlur}>
        <div className={classNames.root} onKeyDown={this.onKeyDown}>
          {this.getSuggestionsAlert(classNames.screenReaderText)}
          <div className={classNames.text}>
            <Autofill
              {...inputProps as any}
              className={classNames.input}
              componentRef={this.input}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              onInputValueChange={this.onInputChange}
              suggestedDisplayValue={suggestedDisplayValue}
              aria-activedescendant={this.getActiveDescendant()}
              aria-expanded={!!this.state.suggestionsVisible}
              aria-haspopup="true"
              autoCapitalize="off"
              autoComplete="off"
              role="combobox"
              disabled={disabled}
              aria-controls={`${suggestionsAvailable} ${selectedSuggestionAlertId}` || undefined}
              aria-owns={suggestionsAvailable || undefined}
              onInputChange={this.props.onInputChange}
            />
          </div>
        </div>
        {this.renderSuggestions()}
        <SelectionZone selection={this.selection} selectionMode={SelectionMode.single}>
          <FocusZone
            componentRef={this.focusZone}
            className="ms-BasePicker-selectedItems" // just a className hook without any styles applied to it.
            isCircularNavigation={true}
            direction={FocusZoneDirection.bidirectional}
            isInnerZoneKeystroke={this._isFocusZoneInnerKeystroke}
            id={this._ariaMap.selectedItems}
          >
            {this.renderItems()}
          </FocusZone>
        </SelectionZone>
      </div>
    );
  }

  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    // override the existing backspace method to not do anything because the list items appear below.
  }
}
