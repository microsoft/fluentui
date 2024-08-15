import * as React from 'react';
import {
  Async,
  KeyCodes,
  css,
  elementContains,
  format,
  getId,
  classNamesFunction,
  styled,
  initializeComponentRef,
} from '../../Utilities';
import { Callout } from '../../Callout';
import { Selection, SelectionZone, SelectionMode } from '../../utilities/selection/index';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Suggestions } from './Suggestions/Suggestions';
import { getStyles as suggestionsStyles } from './Suggestions/Suggestions.styles';
import { SuggestionsController } from './Suggestions/SuggestionsController';
import { ValidationState } from './BasePicker.types';
import { Autofill } from '../Autofill/index';
import * as stylesImport from './BasePicker.scss';
import type { IProcessedStyleSet } from '../../Styling';
import type {
  ISuggestions,
  ISuggestionsProps,
  ISuggestionsStyleProps,
  ISuggestionsStyles,
} from './Suggestions/Suggestions.types';
import type { IBasePicker, IBasePickerProps, IBasePickerStyleProps, IBasePickerStyles } from './BasePicker.types';
import type { IAutofill } from '../Autofill/index';
import type { IPickerItemProps } from './PickerItem.types';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx } from '../../utilities/dom';

const legacyStyles: any = stylesImport;

const EXTENDED_LOAD_TIME = 3000;

export interface IBasePickerState<T> {
  items?: any;
  suggestedDisplayValue?: string;
  moreSuggestionsAvailable?: boolean;
  isFocused?: boolean;
  isSearching?: boolean;
  isMostRecentlyUsedVisible?: boolean;
  suggestionsVisible?: boolean;
  suggestionsLoading?: boolean;
  suggestionsExtendedLoading?: boolean;
  isResultsFooterVisible?: boolean;
  selectedIndices?: number[];
  selectionRemoved?: T;
}

/**
 * Aria id's for internal picker components
 * {@docCategory Pickers}
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
  /**
   * Aria id for element with role=combobox
   */
  combobox: string;
};

const getClassNames = classNamesFunction<IBasePickerStyleProps, IBasePickerStyles>();

/**
 * Should be removed once new picker without inheritance is created
 */
function getStyledSuggestions<T>(suggestionsType: new (props: ISuggestionsProps<T>) => Suggestions<T>) {
  return styled<ISuggestionsProps<any>, ISuggestionsStyleProps, ISuggestionsStyles>(
    suggestionsType,
    suggestionsStyles,
    undefined,
    {
      scope: 'Suggestions',
    },
  );
}

/**
 * {@docCategory Pickers}
 */
export class BasePicker<T extends {}, P extends IBasePickerProps<T>>
  extends React.Component<P, IBasePickerState<T>>
  implements IBasePicker<T>
{
  public static contextType = WindowContext;

  // Refs
  protected root = React.createRef<HTMLDivElement>();
  protected input = React.createRef<IAutofill>();
  protected suggestionElement = React.createRef<ISuggestions<T>>();
  protected selection: Selection;
  protected suggestionStore: SuggestionsController<T>;
  /**
   * @deprecated this is no longer necessary as typescript now supports generic elements
   */
  protected SuggestionOfProperType = Suggestions as new (props: ISuggestionsProps<T>) => Suggestions<T>;
  protected currentPromise: PromiseLike<any> | undefined;
  protected _ariaMap: IPickerAriaIds;
  // eslint-disable-next-line deprecation/deprecation
  private _styledSuggestions = getStyledSuggestions(this.SuggestionOfProperType);
  private _id: string;
  private _async: Async;
  private _overrideScrollDismiss = false;
  private _overrideScrollDimissTimeout: number;

  public static getDerivedStateFromProps(newProps: IBasePickerProps<any>) {
    if (newProps.selectedItems) {
      return { items: newProps.selectedItems };
    }
    return null;
  }

  constructor(basePickerProps: P) {
    super(basePickerProps);

    initializeComponentRef(this);
    this._async = new Async(this);

    const items: T[] = basePickerProps.selectedItems || basePickerProps.defaultSelectedItems || [];

    this._id = getId();
    this._ariaMap = {
      selectedItems: `selected-items-${this._id}`,
      selectedSuggestionAlert: `selected-suggestion-alert-${this._id}`,
      suggestionList: `suggestion-list-${this._id}`,
      combobox: `combobox-${this._id}`,
    };
    this.suggestionStore = new SuggestionsController<T>();
    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() });
    this.selection.setItems(items);
    this.state = {
      items,
      suggestedDisplayValue: '',
      isMostRecentlyUsedVisible: false,
      moreSuggestionsAvailable: false,
      isFocused: false,
      isSearching: false,
      selectedIndices: [],
      selectionRemoved: undefined,
    };
  }

  public get items(): T[] {
    return this.state.items;
  }

  public componentDidMount(): void {
    this.selection.setItems(this.state.items);
    this._onResolveSuggestions = this._async.debounce(this._onResolveSuggestions, this.props.resolveDelay);
  }

  public componentDidUpdate(oldProps: P, oldState: IBasePickerState<T>) {
    if (this.state.items && this.state.items !== oldState.items) {
      const currentSelectedIndex = this.selection.getSelectedIndices()[0];
      this.selection.setItems(this.state.items);
      if (this.state.isFocused) {
        // Reset focus and selection so that selected item stays in sync if something
        // has been removed
        if (this.state.items.length < oldState.items.length) {
          this.selection.setIndexSelected(currentSelectedIndex, false, true);
          this.resetFocus(currentSelectedIndex);
        }
        // Reset focus to last item if the input is removed
        else if (this.state.items.length > oldState.items.length && !this.canAddItems()) {
          this.resetFocus(this.state.items.length - 1);
        }
      }
    }

    // handle dismiss buffer after suggestions are opened
    if (this.state.suggestionsVisible && !oldState.suggestionsVisible) {
      this._overrideScrollDismiss = true;
      this._async.clearTimeout(this._overrideScrollDimissTimeout);
      this._overrideScrollDimissTimeout = this._async.setTimeout(() => {
        this._overrideScrollDismiss = false;
      }, 100);
    }
  }

  public componentWillUnmount(): void {
    if (this.currentPromise) {
      this.currentPromise = undefined;
    }
    this._async.dispose();
  }

  public focus() {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  public focusInput() {
    if (this.input.current) {
      this.input.current.focus();
    }
  }

  public dismissSuggestions = (ev?: any): void => {
    const selectItemFunction = () => {
      let addItemOnDismiss: boolean | void = true;
      if (this.props.onDismiss) {
        addItemOnDismiss = this.props.onDismiss(
          ev,
          this.suggestionStore.currentSuggestion ? this.suggestionStore.currentSuggestion.item : undefined,
        );
      }

      if (!ev || (ev && !ev.defaultPrevented)) {
        // Select the first suggestion if one is available and permitted by onDismiss when user leaves.
        if (
          addItemOnDismiss !== false &&
          this.canAddItems() &&
          this.suggestionStore.hasSelectedSuggestion() &&
          this.state.suggestedDisplayValue
        ) {
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

  public completeSuggestion(forceComplete?: boolean) {
    if (this.suggestionStore.hasSelectedSuggestion() && this.input.current) {
      this.completeSelection(this.suggestionStore.currentSuggestion!.item);
    } else if (forceComplete) {
      this._completeGenericSuggestion();
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
    const { suggestedDisplayValue, isFocused, items } = this.state;
    const { className, inputProps, disabled, selectionAriaLabel, selectionRole = 'list', theme, styles } = this.props;

    const suggestionsVisible = !!this.state.suggestionsVisible;
    const suggestionsAvailable = suggestionsVisible ? this._ariaMap.suggestionList : undefined;
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
          inputClassName: inputProps && inputProps.className,
        })
      : {
          root: css('ms-BasePicker', className ? className : ''),
          text: css('ms-BasePicker-text', legacyStyles.pickerText, this.state.isFocused && legacyStyles.inputFocused),
          itemsWrapper: legacyStyles.pickerItems,
          input: css('ms-BasePicker-input', legacyStyles.pickerInput, inputProps && inputProps.className),
          screenReaderText: legacyStyles.screenReaderOnly,
        };

    const comboLabel = this.props['aria-label'] || inputProps?.['aria-label'];

    // selectionAriaLabel is contained in a separate <span> rather than an aria-label on the items list
    // because if the items list has an aria-label, the aria-describedby on the input will only read
    // that label instead of all the selected items. Using aria-labelledby instead fixes this, since
    // aria-describedby and aria-labelledby will not follow a second aria-labelledby
    return (
      <div
        ref={this.root}
        className={classNames.root}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.onWrapperClick}
      >
        {this.renderCustomAlert(classNames.screenReaderText)}
        <span id={`${this._ariaMap.selectedItems}-label`} hidden>
          {selectionAriaLabel || comboLabel}
        </span>
        <SelectionZone selection={this.selection} selectionMode={SelectionMode.multiple}>
          <div className={classNames.text} aria-owns={suggestionsAvailable}>
            {items.length > 0 && (
              <span
                id={this._ariaMap.selectedItems}
                className={classNames.itemsWrapper}
                role={selectionRole}
                aria-labelledby={`${this._ariaMap.selectedItems}-label`}
              >
                {this.renderItems()}
              </span>
            )}
            {this.canAddItems() && (
              <Autofill
                spellCheck={false}
                {...(inputProps as any)}
                className={classNames.input}
                componentRef={this.input}
                id={inputProps?.id ? inputProps.id : this._ariaMap.combobox}
                onClick={this.onClick}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                onInputValueChange={this.onInputChange}
                suggestedDisplayValue={suggestedDisplayValue}
                aria-activedescendant={suggestionsVisible ? this.getActiveDescendant() : undefined}
                aria-controls={suggestionsAvailable}
                aria-describedby={items.length > 0 ? this._ariaMap.selectedItems : undefined}
                aria-expanded={suggestionsVisible}
                aria-haspopup="listbox"
                aria-label={comboLabel}
                role="combobox"
                disabled={disabled}
                onInputChange={this.props.onInputChange}
              />
            )}
          </div>
        </SelectionZone>
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
    const StyledTypedSuggestions: React.FunctionComponent<ISuggestionsProps<T>> = this._styledSuggestions;

    return this.state.suggestionsVisible && this.input ? (
      <Callout
        isBeakVisible={false}
        gapSpace={5}
        target={this.input.current ? this.input.current.inputElement : undefined}
        onDismiss={this.dismissSuggestions}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintForRTL={DirectionalHint.bottomRightEdge}
        // eslint-disable-next-line react/jsx-no-bind
        preventDismissOnEvent={(ev: Event) => this._preventDismissOnScrollOrResize(ev)}
        {...this.props.pickerCalloutProps}
      >
        <StyledTypedSuggestions
          // Assumed to set in derived component's defaultProps
          onRenderSuggestion={this.props.onRenderSuggestionsItem!}
          onSuggestionClick={this.onSuggestionClick}
          onSuggestionRemove={this.onSuggestionRemove}
          suggestions={this.suggestionStore.getSuggestions()}
          componentRef={this.suggestionElement}
          onGetMoreResults={this.onGetMoreResults}
          moreSuggestionsAvailable={this.state.moreSuggestionsAvailable}
          isLoading={this.state.suggestionsLoading}
          isExtendedLoading={this.state.suggestionsExtendedLoading}
          isSearching={this.state.isSearching}
          isMostRecentlyUsedVisible={this.state.isMostRecentlyUsedVisible}
          isResultsFooterVisible={this.state.isResultsFooterVisible}
          refocusSuggestions={this.refocusSuggestions}
          removeSuggestionAriaLabel={this.props.removeButtonAriaLabel}
          suggestionsListId={this._ariaMap.suggestionList}
          createGenericItem={this._completeGenericSuggestion}
          {...this.props.pickerSuggestionsProps}
        />
      </Callout>
    ) : null;
  }

  protected renderItems(): JSX.Element[] {
    const { disabled, removeButtonAriaLabel, removeButtonIconProps } = this.props;
    const onRenderItem = this.props.onRenderItem as (props: IPickerItemProps<T>) => JSX.Element;

    const { items, selectedIndices } = this.state;
    return items.map((item: any, index: number) =>
      onRenderItem({
        item,
        index,
        key: item.key ? item.key : index,
        selected: selectedIndices!.indexOf(index) !== -1,
        onRemoveItem: () => this.removeItem(item),
        disabled,
        onItemChange: this.onItemChange,
        removeButtonAriaLabel,
        removeButtonIconProps,
      }),
    );
  }

  protected resetFocus(index?: number) {
    const { items } = this.state;

    if (items.length) {
      // default to focusing the last item
      index = index ?? items.length - 1;
      const newEl: HTMLElement | null =
        this.root.current &&
        (this.root.current.querySelectorAll('[data-selection-index] > button')[
          Math.min(index!, items.length - 1)
        ] as HTMLElement | null);
      if (newEl) {
        newEl.focus();
      }
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
      selectedIndices: this.selection.getSelectedIndices(),
    });
  }

  protected updateSuggestions(suggestions: any[]) {
    const maxSuggestionsCount = this.props.pickerSuggestionsProps?.resultsMaximumNumber;
    this.suggestionStore.updateSuggestions(suggestions, 0, maxSuggestionsCount);
    this.forceUpdate();
  }

  /**
   * Only to be called when there is nothing in the input. Checks to see if the consumer has
   * provided a function to resolve suggestions
   */
  protected onEmptyInputFocus() {
    const emptyResolveSuggestions = this.props.onEmptyResolveSuggestions
      ? this.props.onEmptyResolveSuggestions
      : // eslint-disable-next-line deprecation/deprecation
        this.props.onEmptyInputFocus;

    // Only attempt to resolve suggestions if it exists
    if (emptyResolveSuggestions) {
      const suggestions = emptyResolveSuggestions(this.state.items);

      this.updateSuggestionsList(suggestions);

      this.setState({
        isMostRecentlyUsedVisible: true,
        suggestionsVisible: true,
        moreSuggestionsAvailable: false,
      });
    }
  }

  protected updateValue(updatedValue: string) {
    this._onResolveSuggestions(updatedValue);
  }

  protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>, updatedValue?: string) {
    // Check to see if the returned value is an array, if it is then just pass it into the next function .
    // If the returned value is not an array then check to see if it's a promise or PromiseLike.
    // If it is then resolve it asynchronously.
    if (Array.isArray(suggestions)) {
      this._updateAndResolveValue(updatedValue, suggestions);
    } else if (suggestions && (suggestions as PromiseLike<T[]>).then) {
      this.setState({
        suggestionsLoading: true,
      });
      this._startLoadTimer();

      // Clear suggestions
      this.suggestionStore.updateSuggestions([]);

      if (updatedValue !== undefined) {
        this.setState({
          suggestionsVisible: this._getShowSuggestions(),
        });
      } else {
        this.setState({
          suggestionsVisible:
            this.input.current! && this.input.current!.inputElement === getDocumentEx(this.context)?.activeElement,
        });
      }

      // Ensure that the promise will only use the callback if it was the most recent one.
      this.currentPromise = suggestions;
      suggestions.then((newSuggestions: T[]) => {
        if (suggestions === this.currentPromise) {
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
        suggestionsVisible: this._getShowSuggestions(),
      },
      () => this.setState({ suggestionsLoading: false, suggestionsExtendedLoading: false }),
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
      isMostRecentlyUsedVisible: false,
    });
  };

  protected onSuggestionClick = (ev: React.MouseEvent<HTMLElement>, item: any, index: number): void => {
    this.addItemByIndex(index);
  };

  protected onSuggestionRemove = (ev: React.MouseEvent<HTMLElement>, item: T, index: number): void => {
    if (this.props.onRemoveSuggestion) {
      this.props.onRemoveSuggestion(item);
    }
    this.suggestionStore.removeSuggestion(index);
  };

  protected onInputFocus = (ev: React.FocusEvent<HTMLInputElement | Autofill>): void => {
    this.selection.setAllSelected(false);
    // Only trigger all of the focus if this component isn't already focused.
    // For example when an item is selected or removed from the selected list it should be treated
    // as though the input is still focused.
    if (!this.state.isFocused) {
      this._userTriggeredSuggestions();

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
      // Only blur the entire component if an unrelated element gets focus.
      // Otherwise treat it as though it still has focus.
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
        relatedTarget = getDocumentEx(this.context)!.activeElement;
      }
      if (relatedTarget && !elementContains(this.root.current!, relatedTarget as HTMLElement)) {
        this.setState({ isFocused: false });
        if (this.props.onBlur) {
          this.props.onBlur(ev as React.FocusEvent<HTMLInputElement>);
        }
      }
    }
  };

  /**
   * Resets focus to last element in wrapper div if clicking back into Picker that has hit item limit
   */
  protected onWrapperClick = (ev: React.MouseEvent<HTMLInputElement>): void => {
    if (this.state.items.length && !this.canAddItems()) {
      this.resetFocus(this.state.items.length - 1);
    }
  };

  /**
   * Reveals suggestions any time the user clicks on the input element
   * without shifting focus.
   */
  protected onClick = (ev: React.MouseEvent<HTMLInputElement>): void => {
    if (this.props.inputProps !== undefined && this.props.inputProps.onClick !== undefined) {
      this.props.inputProps.onClick(ev);
    }

    // Only primary (left) clicks show suggestions.
    if (ev.button === 0) {
      this._userTriggeredSuggestions();
    }
  };

  protected onFocus = () => {
    if (!this.state.isFocused) {
      this.setState({ isFocused: true });
    }
  };

  protected onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    // eslint-disable-next-line deprecation/deprecation
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
          this._completeGenericSuggestion();
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
              this.props.onRemoveSuggestion(this.suggestionStore.currentSuggestion!.item);
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
            this.forceUpdate();
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
            this.forceUpdate();
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
        isSearching: true,
      },
      () => {
        if (this.props.onGetMoreResults && this.input.current) {
          const suggestions: T[] | PromiseLike<T[]> = (this.props.onGetMoreResults as any)(
            this.input.current.value,
            this.state.items,
          );
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
          isResultsFooterVisible: true,
        });
      },
    );
  };

  protected completeSelection = (item: T) => {
    this.addItem(item);
    this.updateValue('');
    if (this.input.current) {
      this.input.current.clear();
    }
    this.setState({ suggestionsVisible: false });
  };

  protected addItemByIndex = (index: number): void => {
    this.completeSelection(this.suggestionStore.getSuggestionAtIndex(index).item);
  };

  protected addItem = (item: T): void => {
    const processedItem: T | PromiseLike<T> | null = this.props.onItemSelected
      ? (this.props.onItemSelected as any)(item)
      : item;

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
    this.setState({ suggestedDisplayValue: '', selectionRemoved: undefined });
  };

  protected removeItem = (item: T): void => {
    const { items } = this.state;
    const index: number = items.indexOf(item);

    if (index >= 0) {
      const newItems: T[] = items.slice(0, index).concat(items.slice(index + 1));
      this.setState({ selectionRemoved: item });
      this._updateSelectedItems(newItems);

      // reset selection removed text after a timeout so it isn't reached by screen reader virtual cursor.
      // the exact timing isn't important, the live region will fully read even if the text is removed.
      this._async.setTimeout(() => {
        this.setState({ selectionRemoved: undefined });
      }, 1000);
    }
  };

  protected removeItems = (itemsToRemove: any[]): void => {
    const { items } = this.state;
    const newItems: T[] = items.filter((item: any) => itemsToRemove.indexOf(item) === -1);

    this._updateSelectedItems(newItems);
  };

  // This is protected because we may expect the backspace key to work differently in a different kind of picker.
  // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    if (
      (this.state.items.length && !this.input.current) ||
      (this.input.current && !this.input.current.isValueSelected && this.input.current.cursorLocation === 0)
    ) {
      if (this.selection.getSelectedCount() > 0) {
        this.removeItems(this.selection.getSelection());
      } else {
        this.removeItem(this.state.items[this.state.items.length - 1]);
      }
    }
  }

  /**
   * @deprecated this is no longer necessary as focuszone has been removed
   */
  protected _shouldFocusZoneEnterInnerZone = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
    // If suggestions are shown const up/down keys control them, otherwise allow them through to control the focusZone.
    if (this.state.suggestionsVisible) {
      // eslint-disable-next-line deprecation/deprecation
      switch (ev.which) {
        case KeyCodes.up:
        case KeyCodes.down:
          return true;
      }
    }

    // eslint-disable-next-line deprecation/deprecation
    if (ev.which === KeyCodes.enter) {
      return true;
    }

    return false;
  };

  protected getActiveDescendant() {
    if (this.state.suggestionsLoading) {
      return undefined;
    }

    const currentIndex = this.suggestionStore.currentIndex;

    if (currentIndex < 0) {
      // if the suggestions element has actions and the currentIndex does not point to a suggestion,
      // return the action id
      if (this.suggestionElement.current?.hasSuggestedAction()) {
        return 'sug-selectedAction';
      }

      // If there are no suggestions and no action suggested, then return the ID for the no results found.
      if (this.suggestionStore.suggestions.length === 0) {
        return 'sug-noResultsFound';
      }

      return undefined;
    } else {
      return `sug-${currentIndex}`;
    }
  }

  /** @deprecated use renderCustomAlert instead */
  protected getSuggestionsAlert(suggestionAlertClassName: string = legacyStyles.screenReaderOnly) {
    const currentIndex = this.suggestionStore.currentIndex;
    if (this.props.enableSelectedSuggestionAlert) {
      const selectedSuggestion =
        currentIndex > -1 ? this.suggestionStore.getSuggestionAtIndex(this.suggestionStore.currentIndex) : undefined;
      const selectedSuggestionAlertText = selectedSuggestion ? selectedSuggestion.ariaLabel : undefined;
      // keeping the id/className here for legacy support
      return (
        <div id={this._ariaMap.selectedSuggestionAlert} className={suggestionAlertClassName}>
          {`${selectedSuggestionAlertText} `}
        </div>
      );
    }
  }

  protected renderCustomAlert(alertClassName: string = legacyStyles.screenReaderOnly) {
    const { suggestionRemovedText = 'removed {0}' } = this.props;
    let removedItemText = '';

    if (this.state.selectionRemoved) {
      const itemName = this._getTextFromItem(this.state.selectionRemoved, '');
      removedItemText = format(suggestionRemovedText, itemName);
    }

    return (
      <div className={alertClassName} id={this._ariaMap.selectedSuggestionAlert} aria-live="assertive">
        {
          // eslint-disable-next-line deprecation/deprecation
          this.getSuggestionsAlert(alertClassName)
        }
        {removedItemText}
      </div>
    );
  }

  // do not dismiss if the window resizes or scrolls within 100ms of opening
  // this prevents the Android issue where pickers immediately dismiss on open, because the keyboard appears
  private _preventDismissOnScrollOrResize(ev: Event) {
    if (this._overrideScrollDismiss && (ev.type === 'scroll' || ev.type === 'resize')) {
      return true;
    }

    return false;
  }

  /** If suggestions are still loading after a predefined amount of time, set state to show user alert */
  private _startLoadTimer() {
    this._async.setTimeout(() => {
      if (this.state.suggestionsLoading) {
        this.setState({ suggestionsExtendedLoading: true });
      }
    }, EXTENDED_LOAD_TIME);
  }

  /**
   * Takes in the current updated value and either resolves it with the new suggestions
   * or if updated value is undefined then it clears out currently suggested items
   */
  private _updateAndResolveValue(updatedValue: string | undefined, newSuggestions: T[]) {
    if (updatedValue !== undefined) {
      this.resolveNewValue(updatedValue, newSuggestions);
    } else {
      const maxSuggestionsCount = this.props.pickerSuggestionsProps?.resultsMaximumNumber;
      this.suggestionStore.updateSuggestions(newSuggestions, -1, maxSuggestionsCount);
      if (this.state.suggestionsLoading) {
        this.setState({
          suggestionsLoading: false,
          suggestionsExtendedLoading: false,
        });
      }
    }
  }

  /**
   * Controls what happens whenever there is an action that impacts the selected items.
   * If `selectedItems` is provided, this will act as a controlled component and it will not update its own state.
   */
  private _updateSelectedItems(items: T[]): void {
    if (this.props.selectedItems) {
      // If the component is a controlled component then the controlling component will need to add or remove the items.
      this.onChange(items);
    } else {
      this.setState({ items }, () => {
        this._onSelectedItemsUpdated(items);
      });
    }
  }

  private _onSelectedItemsUpdated(items?: T[]): void {
    this.onChange(items);
  }

  /**
   * Suggestions are normally shown after the user updates text and the text
   * is non-empty, but also when the user clicks on the input element.
   * @returns True if suggestions should be shown.
   */
  private _getShowSuggestions(): boolean {
    const areSuggestionsVisible =
      this.input.current !== undefined &&
      this.input.current !== null &&
      this.input.current.inputElement === getDocumentEx(this.context)?.activeElement &&
      this.input.current.value !== '';

    return areSuggestionsVisible;
  }

  private _onResolveSuggestions = (updatedValue: string): void => {
    const suggestions: T[] | PromiseLike<T[]> | null = this.props.onResolveSuggestions(updatedValue, this.state.items);

    if (suggestions !== null) {
      this.updateSuggestionsList(suggestions, updatedValue);
    }
  };

  private _completeGenericSuggestion = (): void => {
    if (
      this.props.onValidateInput &&
      this.input.current &&
      (this.props.onValidateInput as any)(this.input.current.value) !== ValidationState.invalid &&
      this.props.createGenericItem
    ) {
      const itemToConvert = this.props.createGenericItem(
        this.input.current.value,
        this.props.onValidateInput(this.input.current.value),
      );
      this.suggestionStore.createGenericSuggestion(itemToConvert);
      this.completeSuggestion();
    }
  };

  private _getTextFromItem(item: T, currentValue?: string): string {
    if (this.props.getTextFromItem) {
      return (this.props.getTextFromItem as any)(item, currentValue);
    } else {
      return '';
    }
  }

  /**
   * This should be called when the user does something other than use text entry to trigger suggestions.
   *
   */
  private _userTriggeredSuggestions = () => {
    if (!this.state.suggestionsVisible) {
      const input = this.input.current ? this.input.current.value : '';
      if (!input) {
        this.onEmptyInputFocus();
      } else {
        if (this.suggestionStore.suggestions.length === 0) {
          this._onResolveSuggestions(input);
        } else {
          this.setState({
            isMostRecentlyUsedVisible: false,
            suggestionsVisible: true,
          });
        }
      }
    }
  };
}

export class BasePickerListBelow<T extends {}, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
  public render(): JSX.Element {
    const { suggestedDisplayValue, isFocused } = this.state;
    const { className, inputProps, disabled, selectionAriaLabel, selectionRole = 'list', theme, styles } = this.props;

    const suggestionsVisible = !!this.state.suggestionsVisible;

    const suggestionsAvailable: string | undefined = suggestionsVisible ? this._ariaMap.suggestionList : undefined;
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
          inputClassName: inputProps && inputProps.className,
        })
      : {
          root: css('ms-BasePicker', legacyStyles.picker, className ? className : ''),
          text: css(
            'ms-BasePicker-text',
            legacyStyles.pickerText,
            this.state.isFocused && legacyStyles.inputFocused,
            disabled && legacyStyles.inputDisabled,
          ),
          itemsWrapper: legacyStyles.pickerItems,
          input: css('ms-BasePicker-input', legacyStyles.pickerInput, inputProps && inputProps.className),
          screenReaderText: legacyStyles.screenReaderOnly,
        };

    const comboLabel = this.props['aria-label'] || inputProps?.['aria-label'];

    return (
      <div ref={this.root} onBlur={this.onBlur} onFocus={this.onFocus}>
        <div className={classNames.root} onKeyDown={this.onKeyDown}>
          {this.renderCustomAlert(classNames.screenReaderText)}
          <span id={`${this._ariaMap.selectedItems}-label`} hidden>
            {selectionAriaLabel || comboLabel}
          </span>
          <div className={classNames.text} aria-owns={suggestionsAvailable}>
            <Autofill
              {...(inputProps as any)}
              className={classNames.input}
              componentRef={this.input}
              onFocus={this.onInputFocus}
              onBlur={this.onInputBlur}
              onClick={this.onClick}
              onInputValueChange={this.onInputChange}
              suggestedDisplayValue={suggestedDisplayValue}
              aria-activedescendant={suggestionsVisible ? this.getActiveDescendant() : undefined}
              aria-controls={suggestionsAvailable}
              aria-expanded={suggestionsVisible}
              aria-haspopup="listbox"
              aria-label={comboLabel}
              aria-describedby={this.state.items.length > 0 ? this._ariaMap.selectedItems : undefined}
              role="combobox"
              id={inputProps?.id ? inputProps.id : this._ariaMap.combobox}
              disabled={disabled}
              onInputChange={this.props.onInputChange}
            />
          </div>
        </div>
        {this.renderSuggestions()}
        <SelectionZone selection={this.selection} selectionMode={SelectionMode.single}>
          <div
            id={this._ariaMap.selectedItems}
            className="ms-BasePicker-selectedItems" // just a className hook without any styles applied to it.
            role={selectionRole}
            aria-labelledby={`${this._ariaMap.selectedItems}-label`}
          >
            {this.renderItems()}
          </div>
        </SelectionZone>
      </div>
    );
  }

  protected onBackspace(ev: React.KeyboardEvent<HTMLElement>) {
    // override the existing backspace method to not do anything because the list items appear below.
  }
}
