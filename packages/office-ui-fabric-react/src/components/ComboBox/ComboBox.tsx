import * as React from 'react';
import { Autofill, IAutofill } from '../Autofill/index';
import {
  BaseComponent,
  css,
  customizable,
  divProperties,
  findElementRecursive,
  findIndex,
  focusAsync,
  getId,
  getNativeProps,
  isIOS,
  isMac,
  KeyCodes,
  shallowCompare
} from '../../Utilities';
import { Callout } from '../../Callout';
import { Checkbox } from '../../Checkbox';
import { CommandButton, IButtonStyles, IconButton } from '../../Button';
import { DirectionalHint } from '../../common/DirectionalHint';
import { getCaretDownButtonStyles, getOptionStyles, getStyles } from './ComboBox.styles';
import { getClassNames, getComboBoxOptionClassNames, IComboBoxClassNames } from './ComboBox.classNames';
import { IComboBoxOption, IComboBoxOptionStyles, IComboBoxProps } from './ComboBox.types';
import { KeytipData } from '../../KeytipData';
import { Label } from '../../Label';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';

export interface IComboBoxState {
  /** The open state */
  isOpen?: boolean;

  /** The currently selected indices */
  selectedIndices?: number[];

  /** The focused state of the comboBox */
  focused?: boolean;

  /** This value is used for the autocomplete hint value */
  suggestedDisplayValue?: string;

  /** The options currently available for the callout */
  currentOptions: IComboBoxOption[];

  /**
   * When taking input, this will store the index that the options input matches
   * (-1 if no input or match)
   */
  currentPendingValueValidIndex: number;

  /**
   * Stores the hovered over value in the dropdown
   * (used for styling the options without updating the input)
   */
  currentPendingValueValidIndexOnHover: number;

  /** When taking input, this will store the actual text that is being entered */
  currentPendingValue?: string;
}

enum SearchDirection {
  backward = -1,
  none = 0,
  forward = 1
}

enum HoverStatus {
  /** Used when the user was hovering and has since moused out of the menu items */
  clearAll = -2,
  /** Default "normal" state, when no hover has happened or a hover is in progress */
  default = -1
}

const ScrollIdleDelay = 250 /* ms */;
const TouchIdleDelay = 500; /* ms */

/**
 * This is used to clear any pending autocomplete text (used when autocomplete is true and
 * allowFreeform is false)
 */
const ReadOnlyPendingAutoCompleteTimeout = 1000 /* ms */;

interface IComboBoxOptionWrapperProps extends IComboBoxOption {
  /** True if the option is currently selected */
  isSelected: boolean;

  /**
   * A function that returns the children of the OptionWrapper. We pass this in as a function to ensure that
   * children methods don't get called unnecessarily if the component doesn't need to be updated. This leads
   * to a significant performance increase in ComboBoxes with many options and/or complex onRenderOption functions
   */
  render: () => JSX.Element;
}

/**
 * Internal class that is used to wrap all ComboBox options.
 * This is used to customize when we want to rerender components,
 * so we don't rerender every option every time render is executed.
 */
class ComboBoxOptionWrapper extends React.Component<IComboBoxOptionWrapperProps, {}> {
  public render(): React.ReactNode {
    return this.props.render();
  }

  public shouldComponentUpdate(newProps: IComboBoxOptionWrapperProps): boolean {
    // The render function will always be different, so we ignore that prop
    return !shallowCompare({ ...this.props, render: undefined }, { ...newProps, render: undefined });
  }
}

@customizable('ComboBox', ['theme', 'styles'], true)
export class ComboBox extends BaseComponent<IComboBoxProps, IComboBoxState> {
  public static defaultProps: IComboBoxProps = {
    options: [],
    allowFreeform: false,
    autoComplete: 'on',
    buttonIconProps: { iconName: 'ChevronDown' }
  };

  private _root = React.createRef<HTMLDivElement>();

  /** The input aspect of the comboBox */
  private _autofill = React.createRef<IAutofill>();

  /** The wrapping div of the input and button */
  private _comboBoxWrapper = React.createRef<HTMLDivElement>();

  /** The callout element */
  private _comboBoxMenu = React.createRef<HTMLDivElement>();

  /** The menu item element that is currently selected */
  private _selectedElement = React.createRef<HTMLSpanElement>();

  /** The base id for the comboBox */
  private _id: string;

  /**
   * After a character is inserted when autocomplete is true and allowFreeform is false,
   * remember the task that will clear the pending string of characters.
   */
  private _lastReadOnlyAutoCompleteChangeTimeoutId: number | undefined;

  /** Promise used when resolving the comboBox options */
  private _currentPromise: PromiseLike<IComboBoxOption[]>;

  /** The current visible value sent to the auto fill on render */
  private _currentVisibleValue: string | undefined;
  private _classNames: IComboBoxClassNames;
  private _isScrollIdle: boolean;
  private _hasPendingValue: boolean;
  private _scrollIdleTimeoutId: number | undefined;
  private _processingTouch: boolean;
  private _lastTouchTimeoutId: number | undefined;
  /** True if the most recent keydown event was for alt (option) or meta (command). */
  private _lastKeyDownWasAltOrMeta: boolean | undefined;

  /**
   * Determines if we should be setting focus back to the input when the menu closes.
   * The general rule of thumb is if the menu was launched via the keyboard focus should go back
   * to the input, if it was dropped via the mouse focus should not be forced back to the input.
   */
  private _focusInputAfterClose: boolean;

  /** Flag for when we get the first mouseMove */
  private _gotMouseMove: boolean;

  private _processingClearPendingInfo: boolean;

  constructor(props: IComboBoxProps) {
    super(props);

    this._warnMutuallyExclusive({
      defaultSelectedKey: 'selectedKey',
      text: 'defaultSelectedKey',
      value: 'defaultSelectedKey',
      selectedKey: 'value',
      dropdownWidth: 'useComboBoxAsMenuWidth'
    });

    this._warnDeprecations({
      value: 'text',
      onChanged: 'onChange'
    });

    this._id = props.id || getId('ComboBox');
    const selectedKeys: string[] | number[] = this._buildDefaultSelectedKeys(props.defaultSelectedKey, props.selectedKey);

    this._isScrollIdle = true;
    this._processingTouch = false;
    this._gotMouseMove = false;
    this._processingClearPendingInfo = false;

    const initialSelectedIndices: number[] = this._getSelectedIndices(props.options, selectedKeys);

    this.state = {
      isOpen: false,
      selectedIndices: initialSelectedIndices,
      focused: false,
      suggestedDisplayValue: undefined,
      currentOptions: this.props.options,
      currentPendingValueValidIndex: -1,
      currentPendingValue: undefined,
      currentPendingValueValidIndexOnHover: HoverStatus.default
    };
  }

  public componentDidMount(): void {
    if (this._comboBoxWrapper.current) {
      // hook up resolving the options if needed on focus
      this._events.on(this._comboBoxWrapper.current, 'focus', this._onResolveOptions, true);
      if ('onpointerdown' in this._comboBoxWrapper.current) {
        // For ComboBoxes, touching anywhere in the combo box should drop the dropdown, including the input element.
        // This gives more hit target space for touch environments. We're setting the onpointerdown here, because React
        // does not support Pointer events yet.
        this._events.on(this._comboBoxWrapper.current, 'pointerdown', this._onPointerDown, true);
      }
    }
  }

  public componentWillReceiveProps(newProps: IComboBoxProps): void {
    // Update the selectedIndex and currentOptions state if
    // the selectedKey, value, or options have changed
    if (
      newProps.selectedKey !== this.props.selectedKey ||
      newProps.text !== this.props.text ||
      newProps.value !== this.props.value ||
      newProps.options !== this.props.options
    ) {
      const selectedKeys: string[] | number[] = this._buildSelectedKeys(newProps.selectedKey);
      const indices: number[] = this._getSelectedIndices(newProps.options, selectedKeys);

      this.setState({
        selectedIndices: indices,
        currentOptions: newProps.options
      });
    }
  }

  public componentDidUpdate(prevProps: IComboBoxProps, prevState: IComboBoxState) {
    const { allowFreeform, text, value, onMenuOpen, onMenuDismissed } = this.props;
    const { isOpen, focused, selectedIndices, currentPendingValueValidIndex } = this.state;

    // If we are newly open or are open and the pending valid index changed,
    // make sure the currently selected/pending option is scrolled into view
    if (isOpen && (!prevState.isOpen || prevState.currentPendingValueValidIndex !== currentPendingValueValidIndex)) {
      // Need this timeout so that the selectedElement ref is correctly updated
      this._async.setTimeout(() => this._scrollIntoView(), 0);
    }

    // if an action is taken that put focus in the ComboBox
    // and If we are open or we are just closed, shouldFocusAfterClose is set,
    // but we are not the activeElement set focus on the input
    if (
      focused &&
      (isOpen ||
        (prevState.isOpen &&
          !isOpen &&
          this._focusInputAfterClose &&
          this._autofill.current &&
          document.activeElement !== this._autofill.current.inputElement))
    ) {
      this.focus(undefined /*shouldOpenOnFocus*/, true /*useFocusAsync*/);
    }

    // If we should focusAfterClose AND
    //   just opened/closed the menu OR
    //   are focused AND
    //     updated the selectedIndex with the menu closed OR
    //     are not allowing freeform OR
    //     the value changed
    // we need to set selection
    if (
      this._focusInputAfterClose &&
      ((prevState.isOpen && !isOpen) ||
        (focused &&
          ((!isOpen &&
            !this.props.multiSelect &&
            prevState.selectedIndices &&
            selectedIndices &&
            prevState.selectedIndices[0] !== selectedIndices[0]) ||
            !allowFreeform ||
            text !== prevProps.text ||
            value !== prevProps.value)))
    ) {
      this._select();
    }

    this._notifyPendingValueChanged(prevState);

    if (isOpen && !prevState.isOpen && onMenuOpen) {
      onMenuOpen();
    }

    if (!isOpen && prevState.isOpen && onMenuDismissed) {
      onMenuDismissed();
    }
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();

    // remove the eventHanlder that was added in componentDidMount
    this._events.off(this._comboBoxWrapper.current);
  }

  // Primary Render
  public render(): JSX.Element {
    const id = this._id;
    const {
      className,
      label,
      disabled,
      ariaLabel,
      required,
      errorMessage,
      onRenderContainer = this._onRenderContainer,
      onRenderList = this._onRenderList,
      onRenderItem = this._onRenderItem,
      onRenderOption = this._onRenderOptionContent,
      allowFreeform,
      buttonIconProps,
      isButtonAriaHidden = true,
      styles: customStyles,
      theme,
      title,
      keytipProps,
      placeholder,
      tabIndex
    } = this.props;
    const { isOpen, focused, suggestedDisplayValue } = this.state;
    this._currentVisibleValue = this._getVisibleValue();

    const divProps = getNativeProps(this.props, divProperties, ['onChange', 'value']);

    const hasErrorMessage = errorMessage && errorMessage.length > 0 ? true : false;

    this._classNames = this.props.getClassNames
      ? this.props.getClassNames(theme!, !!isOpen, !!disabled, !!required, !!focused, !!allowFreeform, !!hasErrorMessage, className)
      : getClassNames(
          getStyles(theme!, customStyles),
          className!,
          !!isOpen,
          !!disabled,
          !!required,
          !!focused,
          !!allowFreeform,
          !!hasErrorMessage
        );

    return (
      <div {...divProps} ref={this._root} className={this._classNames.container}>
        {label && (
          <Label id={id + '-label'} disabled={disabled} required={required} htmlFor={id + '-input'} className={this._classNames.label}>
            {label}
          </Label>
        )}
        <KeytipData keytipProps={keytipProps} disabled={disabled}>
          {(keytipAttributes: any): JSX.Element => (
            <div
              data-ktp-target={keytipAttributes['data-ktp-target']}
              ref={this._comboBoxWrapper}
              id={id + 'wrapper'}
              className={this._classNames.root}
            >
              <Autofill
                data-ktp-execute-target={keytipAttributes['data-ktp-execute-target']}
                data-is-interactable={!disabled}
                componentRef={this._autofill}
                id={id + '-input'}
                className={this._classNames.input}
                type="text"
                onFocus={this._select}
                onBlur={this._onBlur}
                onKeyDown={this._onInputKeyDown}
                onKeyUp={this._onInputKeyUp}
                onClick={this._onAutofillClick}
                onTouchStart={this._onTouchStart}
                onInputValueChange={this._onInputChange}
                aria-expanded={isOpen}
                aria-autocomplete={this._getAriaAutoCompleteValue()}
                role="combobox"
                readOnly={disabled || !allowFreeform}
                aria-labelledby={label && id + '-label'}
                aria-label={ariaLabel && !label ? ariaLabel : undefined}
                aria-describedby={keytipAttributes['aria-describedby']}
                aria-activedescendant={this._getAriaActiveDescentValue()}
                aria-disabled={disabled}
                aria-owns={isOpen ? id + '-list' : undefined}
                spellCheck={false}
                defaultVisibleValue={this._currentVisibleValue}
                suggestedDisplayValue={suggestedDisplayValue}
                updateValueInWillReceiveProps={this._onUpdateValueInAutofillWillReceiveProps}
                shouldSelectFullInputValueInComponentDidUpdate={this._onShouldSelectFullInputValueInAutofillComponentDidUpdate}
                title={title}
                preventValueSelection={!focused}
                placeholder={placeholder}
                tabIndex={tabIndex}
              />
              <IconButton
                className={'ms-ComboBox-CaretDown-button'}
                styles={this._getCaretButtonStyles()}
                role="presentation"
                aria-hidden={isButtonAriaHidden}
                data-is-focusable={false}
                tabIndex={-1}
                onClick={this._onComboBoxClick}
                iconProps={buttonIconProps}
                disabled={disabled}
                checked={isOpen}
              />
            </div>
          )}
        </KeytipData>
        {isOpen &&
          (onRenderContainer as any)(
            {
              ...this.props,
              onRenderList,
              onRenderItem,
              onRenderOption,
              options: this.state.currentOptions.map((item, index) => ({ ...item, index: index }))
            },
            this._onRenderContainer
          )}
        {errorMessage && <div className={this._classNames.errorMessage}>{errorMessage}</div>}
      </div>
    );
  }

  /**
   * {@inheritdoc}
   */
  public focus = (shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): void => {
    if (this._autofill.current) {
      if (useFocusAsync) {
        focusAsync(this._autofill.current);
      } else {
        this._autofill.current.focus();
      }

      if (shouldOpenOnFocus) {
        this.setState({
          isOpen: true
        });
      }
    }
  };

  /**
   * Close menu callout if it is open
   */
  public dismissMenu = (): void => {
    const { isOpen } = this.state;
    isOpen && this.setState({ isOpen: false });
  };

  /**
   * componentWillReceiveProps handler for the auto fill component
   * Checks/updates the iput value to set, if needed
   * @param defaultVisibleValue - the defaultVisibleValue that got passed
   *  in to the auto fill's componentWillReceiveProps
   * @returns - the updated value to set, if needed
   */
  private _onUpdateValueInAutofillWillReceiveProps = (): string | null => {
    const comboBox = this._autofill.current;

    if (!comboBox) {
      return null;
    }

    if (comboBox.value === null || comboBox.value === undefined) {
      return null;
    }

    const visibleValue = this._normalizeToString(this._currentVisibleValue);
    if (comboBox.value !== visibleValue) {
      // If visibleValue is empty, make it a zero width space.
      // If we did not do that, the empty string would not get used
      // potentially resulting in an unexpected value being used
      return visibleValue || '​';
    }

    return comboBox.value;
  };

  /**
   * componentDidUpdate handler for the auto fill component
   *
   * @param defaultVisibleValue - the current defaultVisibleValue in the auto fill's componentDidUpdate
   * @param suggestedDisplayValue - the current suggestedDisplayValue in the auto fill's componentDidUpdate
   * @returns - should the full value of the input be selected?
   * True if the defaultVisibleValue equals the suggestedDisplayValue, false otherwise
   */
  private _onShouldSelectFullInputValueInAutofillComponentDidUpdate = (): boolean => {
    return this._currentVisibleValue === this.state.suggestedDisplayValue;
  };

  /**
   * Get the correct value to pass to the input
   * to show to the user based off of the current props and state
   * @returns the value to pass to the input
   */
  private _getVisibleValue = (): string | undefined => {
    const { text, value, allowFreeform, autoComplete } = this.props;
    const {
      selectedIndices,
      currentPendingValueValidIndex,
      currentOptions,
      currentPendingValue,
      suggestedDisplayValue,
      isOpen,
      focused
    } = this.state;

    const currentPendingIndexValid = this._indexWithinBounds(currentOptions, currentPendingValueValidIndex);

    // If the user passed is a value prop, use that
    // unless we are open and have a valid current pending index
    if (!(isOpen && currentPendingIndexValid) && (text && (currentPendingValue === null || currentPendingValue === undefined))) {
      return text;
    }

    if (!(isOpen && currentPendingIndexValid) && (value && (currentPendingValue === null || currentPendingValue === undefined))) {
      return value;
    }

    // Values to display in the BaseAutoFill area
    const displayValues = [];

    if (this.props.multiSelect) {
      // Multi-select
      if (focused) {
        let index = -1;
        if (autoComplete === 'on' && currentPendingIndexValid) {
          index = currentPendingValueValidIndex;
        }
        displayValues.push(
          currentPendingValue !== null && currentPendingValue !== undefined
            ? currentPendingValue
            : this._indexWithinBounds(currentOptions, index)
            ? currentOptions[index].text
            : ''
        );
      } else {
        for (let idx = 0; selectedIndices && idx < selectedIndices.length; idx++) {
          const index: number = selectedIndices[idx];
          displayValues.push(
            this._indexWithinBounds(currentOptions, index) ? currentOptions[index].text : this._normalizeToString(suggestedDisplayValue)
          );
        }
      }
    } else {
      // Single-select
      let index: number = this._getFirstSelectedIndex();
      if (allowFreeform) {
        // If we are allowing freeform and autocomplete is also true
        // and we've got a pending value that matches an option, remember
        // the matched option's index
        if (autoComplete === 'on' && currentPendingIndexValid) {
          index = currentPendingValueValidIndex;
        }

        // Since we are allowing freeform, if there is currently a pending value, use that
        // otherwise use the index determined above (falling back to '' if we did not get a valid index)
        displayValues.push(
          currentPendingValue !== null && currentPendingValue !== undefined
            ? currentPendingValue
            : this._indexWithinBounds(currentOptions, index)
            ? currentOptions[index].text
            : ''
        );
      } else {
        // If we are not allowing freeform and have a
        // valid index that matches the pending value,
        // we know we will need some version of the pending value
        if (currentPendingIndexValid && autoComplete === 'on') {
          // If autoComplete is on, return the
          // raw pending value, otherwise remember
          // the matched option's index
          index = currentPendingValueValidIndex;
          displayValues.push(this._normalizeToString(currentPendingValue));
        } else {
          displayValues.push(
            this._indexWithinBounds(currentOptions, index) ? currentOptions[index].text : this._normalizeToString(suggestedDisplayValue)
          );
        }
      }
    }

    // If we have a valid index then return the text value of that option,
    // otherwise return the suggestedDisplayValue
    let displayString = '';
    for (let idx = 0; idx < displayValues.length; idx++) {
      if (idx > 0) {
        displayString += ', ';
      }
      displayString += displayValues[idx];
    }
    return displayString;
  };

  /**
   * Is the index within the bounds of the array?
   * @param options - options to check if the index is valid for
   * @param index - the index to check
   * @returns - true if the index is valid for the given options, false otherwise
   */
  private _indexWithinBounds(options: IComboBoxOption[] | undefined, index: number): boolean {
    if (!options) {
      return false;
    }
    return index >= 0 && index < options.length;
  }

  /**
   * Handler for typing changes on the input
   * @param updatedValue - the newly changed value
   */
  private _onInputChange = (updatedValue: string): void => {
    if (this.props.disabled) {
      this._handleInputWhenDisabled(null /* event */);
      return;
    }

    this.props.allowFreeform ? this._processInputChangeWithFreeform(updatedValue) : this._processInputChangeWithoutFreeform(updatedValue);
  };

  /**
   * Process the new input's new value when the comboBox
   * allows freeform entry
   * @param updatedValue - the input's newly changed value
   */
  private _processInputChangeWithFreeform(updatedValue: string): void {
    const { currentOptions } = this.state;
    updatedValue = this._removeZeroWidthSpaces(updatedValue);
    let newCurrentPendingValueValidIndex = -1;

    // if the new value is empty, see if we have an exact match
    // and then set the pending info
    if (updatedValue === '') {
      const items = currentOptions
        .map((item, index) => {
          return { ...item, index };
        })
        .filter(
          option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider
        )
        .filter(option => this._getPreviewText(option) === updatedValue);

      // if we found a match remember the index
      if (items.length === 1) {
        newCurrentPendingValueValidIndex = items[0].index;
      }

      this._setPendingInfo(updatedValue, newCurrentPendingValueValidIndex, updatedValue);
      return;
    }

    // Remember the original value and then,
    // make the value lowercase for comparison
    const originalUpdatedValue: string = updatedValue;
    updatedValue = updatedValue.toLocaleLowerCase();

    let newSuggestedDisplayValue = '';

    // If autoComplete is on, attempt to find a match from the available options
    if (this.props.autoComplete === 'on') {
      // If autoComplete is on, attempt to find a match where the text of an option starts with the updated value
      const items = currentOptions
        .map((item, index) => {
          return { ...item, index };
        })
        .filter(
          option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider
        )
        .filter(
          option =>
            this._getPreviewText(option)
              .toLocaleLowerCase()
              .indexOf(updatedValue) === 0
        );
      if (items.length > 0) {
        // use ariaLabel as the value when the option is set
        const text: string = this._getPreviewText(items[0]);

        // If the user typed out the complete option text, we don't need any suggested display text anymore
        newSuggestedDisplayValue = text.toLocaleLowerCase() !== updatedValue ? text : '';

        // remember the index of the match we found
        newCurrentPendingValueValidIndex = items[0].index;
      }
    } else {
      // If autoComplete is off, attempt to find a match only when the value is exactly equal to the text of an option
      const items = currentOptions
        .map((item, index) => {
          return { ...item, index };
        })
        .filter(
          option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider
        )
        .filter(option => this._getPreviewText(option).toLocaleLowerCase() === updatedValue);

      // if we found a match remember the index
      if (items.length === 1) {
        newCurrentPendingValueValidIndex = items[0].index;
      }
    }

    // Set the updated state
    this._setPendingInfo(originalUpdatedValue, newCurrentPendingValueValidIndex, newSuggestedDisplayValue);
  }

  /**
   * Process the new input's new value when the comboBox
   * does not allow freeform entry
   * @param updatedValue - the input's newly changed value
   */
  private _processInputChangeWithoutFreeform(updatedValue: string): void {
    const { currentPendingValue, currentPendingValueValidIndex, currentOptions } = this.state;

    updatedValue = this._removeZeroWidthSpaces(updatedValue);
    if (this.props.autoComplete === 'on') {
      // If autoComplete is on while allow freeform is off,
      // we will remember the keypresses and build up a string to attempt to match
      // as long as characters are typed within a the timeout span of each other,
      // otherwise we will clear the string and start building a new one on the next keypress.
      // Also, only do this processing if we have a non-empty value
      if (updatedValue !== '') {
        // If we have a pending autocomplete clearing task,
        // we know that the user is typing with keypresses happening
        // within the timeout of each other so remove the clearing task
        // and continue building the pending value with the udpated value
        if (this._lastReadOnlyAutoCompleteChangeTimeoutId !== undefined) {
          this._async.clearTimeout(this._lastReadOnlyAutoCompleteChangeTimeoutId);
          this._lastReadOnlyAutoCompleteChangeTimeoutId = undefined;
          updatedValue = this._normalizeToString(currentPendingValue) + updatedValue;
        }

        const originalUpdatedValue: string = updatedValue;
        updatedValue = updatedValue.toLocaleLowerCase();

        // If autoComplete is on, attempt to find a match where the text of an option starts with the updated value
        const items = currentOptions
          .map((item, i) => {
            return { ...item, index: i };
          })
          .filter(
            option => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider
          )
          .filter(option => option.text.toLocaleLowerCase().indexOf(updatedValue) === 0);

        // If we found a match, udpdate the state
        if (items.length > 0) {
          this._setPendingInfo(originalUpdatedValue, items[0].index, this._getPreviewText(items[0]));
        }

        // Schedule a timeout to clear the pending value after the timeout span
        this._lastReadOnlyAutoCompleteChangeTimeoutId = this._async.setTimeout(() => {
          this._lastReadOnlyAutoCompleteChangeTimeoutId = undefined;
        }, ReadOnlyPendingAutoCompleteTimeout);
        return;
      }
    }

    // If we get here, either autoComplete is on or we did not find a match with autoComplete on.
    // Remember we are not allowing freeform, so at this point, if we have a pending valid value index
    // use that; otherwise use the selectedIndex
    const index = currentPendingValueValidIndex >= 0 ? currentPendingValueValidIndex : this._getFirstSelectedIndex();

    // Since we are not allowing freeform, we need to
    // set both the pending and suggested values/index
    // to allow us to select all content in the input to
    // give the illusion that we are readonly (e.g. freeform off)
    this._setPendingInfoFromIndex(index);
  }

  private _getFirstSelectedIndex(): number {
    return this.state.selectedIndices && this.state.selectedIndices.length > 0 ? this.state.selectedIndices[0] : -1;
  }

  /**
   * Walk along the options starting at the index, stepping by the delta (positive or negative)
   * looking for the next valid selectable index (e.g. skipping headings and dividers)
   * @param index - the index to get the next selectable index from
   * @param delta - optional delta to step by when finding the next index, defaults to 0
   * @returns - the next valid selectable index. If the new index is outside of the bounds,
   * it will snap to the edge of the options array. If delta == 0 and the given index is not selectable
   */
  private _getNextSelectableIndex(index: number, searchDirection: SearchDirection): number {
    const { currentOptions } = this.state;

    let newIndex = index + searchDirection;

    newIndex = Math.max(0, Math.min(currentOptions.length - 1, newIndex));

    if (!this._indexWithinBounds(currentOptions, newIndex)) {
      return -1;
    }

    const option: IComboBoxOption = currentOptions[newIndex];

    // attempt to skip headers and dividers
    if (option.itemType === SelectableOptionMenuItemType.Header || option.itemType === SelectableOptionMenuItemType.Divider) {
      // Should we continue looking for an index to select?
      if (
        searchDirection !== SearchDirection.none &&
        ((newIndex > 0 && searchDirection < SearchDirection.none) ||
          (newIndex >= 0 && newIndex < currentOptions.length && searchDirection > SearchDirection.none))
      ) {
        newIndex = this._getNextSelectableIndex(newIndex, searchDirection);
      } else {
        // If we cannot perform a useful search just return the index we were given
        return index;
      }
    }

    // We have the next valid selectable index, return it
    return newIndex;
  }

  /**
   * Set the selected index. Note, this is
   * the "real" selected index, not the pending selected index
   * @param index - the index to set (or the index to set from if a search direction is provided)
   * @param searchDirection - the direction to search along the options from the given index
   */
  private _setSelectedIndex(index: number, submitPendingValueEvent: any, searchDirection: SearchDirection = SearchDirection.none): void {
    const { onChange, onChanged, onPendingValueChanged } = this.props;
    const { currentOptions } = this.state;
    let { selectedIndices } = this.state;

    if (!selectedIndices) {
      selectedIndices = [];
    }

    // Find the next selectable index, if searchDirection is none
    // we will get our starting index back
    index = this._getNextSelectableIndex(index, searchDirection);

    if (!this._indexWithinBounds(currentOptions, index)) {
      return;
    }

    // Are we at a new index? If so, update the state, otherwise
    // there is nothing to do
    if (this.props.multiSelect || selectedIndices.length < 1 || (selectedIndices.length === 1 && selectedIndices[0] !== index)) {
      const option: IComboBoxOption = currentOptions[index];
      if (!option) {
        return;
      }
      if (this.props.multiSelect) {
        // Setting the initial state of option.selected in Multi-select combobox by checking the
        // selectedIndices array and overriding the undefined issue
        option.selected = option.selected !== undefined ? !option.selected : selectedIndices.indexOf(index) < 0;
        if (option.selected && selectedIndices.indexOf(index) < 0) {
          selectedIndices.push(index);
        } else if (!option.selected && selectedIndices.indexOf(index) >= 0) {
          selectedIndices = selectedIndices.filter((value: number) => value !== index);
        }
      } else {
        selectedIndices[0] = index;
      }

      // Set the selected option
      this.setState({
        selectedIndices: selectedIndices
      });

      // If ComboBox value is changed, revert preview first
      if (this._hasPendingValue && onPendingValueChanged) {
        onPendingValueChanged();
        this._hasPendingValue = false;
      }

      if (onChange) {
        onChange(submitPendingValueEvent, option, index, undefined);
      }

      if (onChanged) {
        onChanged(option, index, undefined, submitPendingValueEvent);
      }

      // if we have a new selected index,
      // clear all of the pending info
      this._clearPendingInfo();
    }
  }

  /**
   * Focus (and select) the content of the input
   * and set the focused state
   */
  private _select = (): void => {
    if (this._autofill.current && this._autofill.current.inputElement) {
      this._autofill.current.inputElement.select();
    }

    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  };

  /**
   * Callback issued when the options should be resolved, if they have been updated or
   * if they need to be passed in the first time. This only does work if an onResolveOptions
   * callback was passed in
   */
  private _onResolveOptions = (): void => {
    if (this.props.onResolveOptions) {
      // get the options
      const newOptions = this.props.onResolveOptions({ ...this.state.currentOptions });

      // Check to see if the returned value is an array, if it is update the state
      // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
      if (Array.isArray(newOptions)) {
        this.setState({
          currentOptions: newOptions
        });
      } else if (newOptions && newOptions.then) {
        // Ensure that the promise will only use the callback if it was the most recent one
        // and update the state when the promise returns
        const promise: PromiseLike<IComboBoxOption[]> = (this._currentPromise = newOptions);
        promise.then((newOptionsFromPromise: IComboBoxOption[]) => {
          if (promise === this._currentPromise) {
            this.setState({
              currentOptions: newOptionsFromPromise
            });
          }
        });
      }
    }
  };

  /**
   * OnBlur handler. Set the focused state to false
   * and submit any pending value
   */
  private _onBlur = (event: React.FocusEvent<HTMLInputElement>): void => {
    // Do nothing if the blur is coming from something
    // inside the comboBox root or the comboBox menu since
    // it we are not really bluring from the whole comboBox
    let relatedTarget = event.relatedTarget;
    if (event.relatedTarget === null) {
      // In IE11, due to lack of support, event.relatedTarget is always
      // null making every onBlur call to be "outside" of the ComboBox
      // even when it's not. Using document.activeElement is another way
      // for us to be able to get what the relatedTarget without relying
      // on the event
      relatedTarget = document.activeElement;
    }
    if (
      relatedTarget &&
      // when event coming from withing the comboBox title
      ((this._root.current && this._root.current.contains(relatedTarget as HTMLElement)) ||
        // when event coming from within the comboBox list menu
        (this._comboBoxMenu.current &&
          (this._comboBoxMenu.current.contains(relatedTarget as HTMLElement) ||
            // when event coming from the callout containing the comboBox list menu (ex: when scrollBar of the Callout clicked)
            // checks if the relatedTarget is a parent of _comboBoxMenu
            findElementRecursive(this._comboBoxMenu.current, element => element === relatedTarget))))
    ) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.state.focused) {
      this.setState({ focused: false });
      if (!this.props.multiSelect) {
        this._submitPendingValue(event);
      }
    }
  };

  /**
   * Submit a pending value if there is one
   */
  private _submitPendingValue(submitPendingValueEvent: any): void {
    const { onChange, onChanged, allowFreeform, autoComplete } = this.props;
    const { currentPendingValue, currentPendingValueValidIndex, currentOptions, currentPendingValueValidIndexOnHover } = this.state;
    let { selectedIndices } = this.state;

    // Do not submit any pending value if we
    // have already initiated clearing the pending info
    if (this._processingClearPendingInfo) {
      return;
    }

    // If we allow freeform we need to handle that
    if (allowFreeform) {
      // if currentPendingValue is null or undefined the user did not submit anything
      // (not even empty because we would have stored that as the pending value)
      if (currentPendingValue === null || currentPendingValue === undefined) {
        // if a user did not type anything they may just hovered over an item
        if (currentPendingValueValidIndexOnHover >= 0) {
          this._setSelectedIndex(currentPendingValueValidIndexOnHover, submitPendingValueEvent);
          this._clearPendingInfo();
        }

        return;
      }

      // Check to see if the user typed an exact match
      if (this._indexWithinBounds(currentOptions, currentPendingValueValidIndex)) {
        const pendingOptionText: string = this._getPreviewText(currentOptions[currentPendingValueValidIndex]).toLocaleLowerCase();

        // By exact match, that means: our pending value is the same as the the pending option text OR
        // the pending option starts with the pending value and we have an "autoComplete" selection
        // where the total length is equal to pending option length OR
        // the live value in the underlying input matches the pending option; update the state
        if (
          currentPendingValue.toLocaleLowerCase() === pendingOptionText ||
          ((autoComplete &&
            pendingOptionText.indexOf(currentPendingValue.toLocaleLowerCase()) === 0 &&
            (this._autofill.current &&
              this._autofill.current.isValueSelected &&
              currentPendingValue.length + (this._autofill.current.selectionEnd! - this._autofill.current.selectionStart!) ===
                pendingOptionText.length)) ||
            (this._autofill.current &&
              this._autofill.current.inputElement &&
              this._autofill.current.inputElement.value.toLocaleLowerCase() === pendingOptionText))
        ) {
          this._setSelectedIndex(currentPendingValueValidIndex, submitPendingValueEvent);
          this._clearPendingInfo();
          return;
        }
      }

      if (onChange || onChanged) {
        if (onChange) {
          // trigger onChange to clear value
          onChange(submitPendingValueEvent, undefined, undefined, currentPendingValue);
        }
        if (onChanged) {
          // trigger onChanged to clear value
          onChanged(undefined, undefined, currentPendingValue, submitPendingValueEvent);
        }
      } else {
        // If we are not controlled, create a new option
        const newOption: IComboBoxOption = {
          key: currentPendingValue || getId(),
          text: this._normalizeToString(currentPendingValue)
        };
        const newOptions: IComboBoxOption[] = [...currentOptions, newOption];
        if (selectedIndices) {
          if (!this.props.multiSelect) {
            selectedIndices = [];
          }
          selectedIndices.push(newOptions.length - 1);
        }
        this.setState({
          currentOptions: newOptions,
          selectedIndices: selectedIndices
        });
      }
    } else if (currentPendingValueValidIndex >= 0) {
      // Since we are not allowing freeform, we must have a matching
      // to be able to update state
      this._setSelectedIndex(currentPendingValueValidIndex, submitPendingValueEvent);
    } else if (currentPendingValueValidIndexOnHover >= 0) {
      // If all else failed and we were hovering over an item, select it
      this._setSelectedIndex(currentPendingValueValidIndexOnHover, submitPendingValueEvent);
    }

    // Finally, clear the pending info
    this._clearPendingInfo();
  }

  // Render Callout container and pass in list
  private _onRenderContainer = (props: IComboBoxProps): JSX.Element => {
    const {
      onRenderList,
      calloutProps,
      dropdownWidth,
      dropdownMaxWidth,
      onRenderLowerContent = this._onRenderLowerContent,
      useComboBoxAsMenuWidth
    } = props;

    const comboBoxMenuWidth =
      useComboBoxAsMenuWidth && this._comboBoxWrapper.current ? this._comboBoxWrapper.current.clientWidth + 2 : undefined;

    return (
      <Callout
        isBeakVisible={false}
        gapSpace={0}
        doNotLayer={false}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintFixed={false}
        {...calloutProps}
        onLayerMounted={this._onLayerMounted}
        className={css(this._classNames.callout, calloutProps ? calloutProps.className : undefined)}
        target={this._comboBoxWrapper.current}
        onDismiss={this._onDismiss}
        onScroll={this._onScroll}
        setInitialFocus={false}
        calloutWidth={useComboBoxAsMenuWidth && this._comboBoxWrapper.current ? comboBoxMenuWidth && comboBoxMenuWidth : dropdownWidth}
        calloutMaxWidth={dropdownMaxWidth ? dropdownMaxWidth : comboBoxMenuWidth}
      >
        <div className={this._classNames.optionsContainerWrapper} ref={this._comboBoxMenu}>
          {(onRenderList as any)({ ...props }, this._onRenderList)}
        </div>
        {onRenderLowerContent(this.props, this._onRenderLowerContent)}
      </Callout>
    );
  };

  private _onLayerMounted = () => {
    this._gotMouseMove = false;

    if (this.props.calloutProps && this.props.calloutProps.onLayerMounted) {
      this.props.calloutProps.onLayerMounted();
    }
  };

  // Render List of items
  private _onRenderList = (props: IComboBoxProps): JSX.Element => {
    const { onRenderItem, options } = props;

    const id = this._id;
    return (
      <div id={id + '-list'} className={this._classNames.optionsContainer} aria-labelledby={id + '-label'} role="listbox">
        {options.map(item => (onRenderItem as any)(item, this._onRenderItem))}
      </div>
    );
  };

  // Render items
  private _onRenderItem = (item: IComboBoxOption): JSX.Element | null => {
    switch (item.itemType) {
      case SelectableOptionMenuItemType.Divider:
        return this._renderSeparator(item);
      case SelectableOptionMenuItemType.Header:
        return this._renderHeader(item);
      default:
        return this._renderOption(item);
    }
  };

  // Default _onRenderLowerContent function returns nothing
  private _onRenderLowerContent = (): null => {
    return null;
  };

  // Render separator
  private _renderSeparator(item: IComboBoxOption): JSX.Element | null {
    const { index, key } = item;

    if (index && index > 0) {
      return <div role="separator" key={key} className={this._classNames.divider} />;
    }
    return null;
  }

  private _renderHeader(item: IComboBoxOption): JSX.Element {
    const { onRenderOption = this._onRenderOptionContent } = this.props;

    return (
      <div key={item.key} className={this._classNames.header}>
        {onRenderOption(item, this._onRenderOptionContent)}
      </div>
    );
  }

  private _renderOption = (item: IComboBoxOption): JSX.Element => {
    const { onRenderOption = this._onRenderOptionContent } = this.props;
    const id = this._id;
    const isSelected: boolean = this._isOptionSelected(item.index);
    const optionStyles = this._getCurrentOptionStyles(item);
    const optionClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item));
    const checkboxStyles = () => {
      return optionStyles;
    };
    const title = this._getPreviewText(item);

    const getOptionComponent = () => {
      return !this.props.multiSelect ? (
        <CommandButton
          id={id + '-list' + item.index}
          key={item.key}
          data-index={item.index}
          styles={this._getCurrentOptionStyles(item)}
          checked={isSelected}
          className={'ms-ComboBox-option'}
          onClick={this._onItemClick(item)}
          onMouseEnter={this._onOptionMouseEnter.bind(this, item.index)}
          onMouseMove={this._onOptionMouseMove.bind(this, item.index)}
          onMouseLeave={this._onOptionMouseLeave}
          role="option"
          aria-selected={isSelected ? 'true' : 'false'}
          ariaLabel={this._getPreviewText(item)}
          disabled={item.disabled}
          title={title}
        >
          {' '}
          {
            <span className={optionClassNames.optionTextWrapper} ref={isSelected ? this._selectedElement : undefined}>
              {onRenderOption(item, this._onRenderOptionContent)}
            </span>
          }
        </CommandButton>
      ) : (
        <Checkbox
          id={id + '-list' + item.index}
          ariaLabel={this._getPreviewText(item)}
          key={item.key}
          data-index={item.index}
          styles={checkboxStyles}
          className={'ms-ComboBox-option'}
          data-is-focusable={true}
          onChange={this._onItemClick(item)}
          label={item.text}
          role="option"
          aria-selected={isSelected ? 'true' : 'false'}
          checked={isSelected}
          title={title}
        >
          {onRenderOption(item, this._onRenderOptionContent)}
        </Checkbox>
      );
    };

    return (
      <ComboBoxOptionWrapper
        key={item.key}
        index={item.index}
        disabled={item.disabled}
        isSelected={isSelected}
        text={item.text}
        render={getOptionComponent}
      />
    );
  };

  /**
   * If we are coming from a mouseOut:
   * there is no visible selected option.
   *
   * Else if We are hovering over an item:
   * that gets the selected look.
   *
   * Else:
   * Use the current valid pending index if it exists OR
   * we do not have a valid index and we currently have a pending input value,
   * otherwise use the selected index
   * */
  private _isOptionSelected(index: number | undefined): boolean {
    const { currentPendingValueValidIndexOnHover } = this.state;

    // If the hover state is set to clearAll, don't show a selected index.
    // Note, this happens when the user moused out of the menu items
    if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
      return false;
    }

    if (!this.props.multiSelect && this._getPendingSelectedIndex(true /* includePendingValue */) === index) {
      return true;
    }

    let idxOfSelectedIndex = -1;
    if (this.props.multiSelect && index !== undefined && this.state.selectedIndices) {
      idxOfSelectedIndex = this.state.selectedIndices.indexOf(index);
    }
    return idxOfSelectedIndex >= 0;
  }

  /**
   * Gets the pending selected index taking into account hover, valueValidIndex, and selectedIndex
   * @param includeCurrentPendingValue - Should we include the currentPendingValue when
   * finding the index
   */
  private _getPendingSelectedIndex(includeCurrentPendingValue: boolean): number {
    const { currentPendingValueValidIndexOnHover, currentPendingValueValidIndex, currentPendingValue } = this.state;

    return currentPendingValueValidIndexOnHover >= 0
      ? currentPendingValueValidIndexOnHover
      : currentPendingValueValidIndex >= 0 ||
        (includeCurrentPendingValue && (currentPendingValue !== null && currentPendingValue !== undefined))
      ? currentPendingValueValidIndex
      : this.props.multiSelect
      ? 0
      : this._getFirstSelectedIndex();
  }

  /**
   * Scroll handler for the callout to make sure the mouse events
   * for updating focus are not interacting during scroll
   */
  private _onScroll = () => {
    if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
      this._async.clearTimeout(this._scrollIdleTimeoutId);
      this._scrollIdleTimeoutId = undefined;
    } else {
      this._isScrollIdle = false;
    }

    this._scrollIdleTimeoutId = this._async.setTimeout(() => {
      this._isScrollIdle = true;
    }, ScrollIdleDelay);
  };

  /**
   * Scroll the selected element into view
   */
  private _scrollIntoView(): void {
    const { onScrollToItem, scrollSelectedToTop } = this.props;

    const { currentPendingValueValidIndex, currentPendingValue } = this.state;

    if (onScrollToItem) {
      // Use the custom scroll handler
      onScrollToItem(
        currentPendingValueValidIndex >= 0 || currentPendingValue !== '' ? currentPendingValueValidIndex : this._getFirstSelectedIndex()
      );
    } else if (this._selectedElement.current && this._selectedElement.current.offsetParent) {
      // We are using refs, scroll the ref into view
      if (scrollSelectedToTop) {
        this._selectedElement.current.offsetParent.scrollIntoView(true);
      } else {
        let alignToTop = true;

        if (this._comboBoxMenu.current && this._comboBoxMenu.current.offsetParent) {
          const scrollableParentRect = this._comboBoxMenu.current.offsetParent.getBoundingClientRect();
          const selectedElementRect = this._selectedElement.current.offsetParent.getBoundingClientRect();

          // If we are completely in view then we do not need to scroll
          if (
            scrollableParentRect.top <= selectedElementRect.top &&
            scrollableParentRect.top + scrollableParentRect.height >= selectedElementRect.top + selectedElementRect.height
          ) {
            return;
          }

          // If we are lower than the scrollable parent viewport then we should align to the bottom
          if (scrollableParentRect.top + scrollableParentRect.height <= selectedElementRect.top + selectedElementRect.height) {
            alignToTop = false;
          }
        }

        this._selectedElement.current.offsetParent.scrollIntoView(alignToTop);
      }
    }
  }

  private _onRenderOptionContent = (item: IComboBoxOption): JSX.Element => {
    const optionClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item));
    return <span className={optionClassNames.optionText}>{item.text}</span>;
  };

  /**
   * Click handler for the menu items
   * to select the item and also close the menu
   * @param index - the index of the item that was clicked
   */
  private _onItemClick(item: IComboBoxOption): (ev: any) => void {
    const { onItemClick } = this.props;
    const { index } = item;

    return (ev: any): void => {
      onItemClick && onItemClick(ev, item, index);
      this._setSelectedIndex(index as number, ev);
      if (!this.props.multiSelect) {
        // only close the callout when it's in single-select mode
        this.setState({
          isOpen: false
        });
      }
    };
  }

  /**
   * Handles dismissing (cancelling) the menu
   */
  private _onDismiss = (): void => {
    // close the menu
    this._setOpenStateAndFocusOnClose(false /* isOpen */, false /* focusInputAfterClose */);

    // reset the selected index
    // to the last value state
    this._resetSelectedIndex();
  };

  /**
   * Get the index of the option that is marked as selected
   * @param options - the comboBox options
   * @param selectedKeys - the known selected key to find
   * @returns - the index of the selected option, -1 if not found
   */
  private _getSelectedIndices(options: IComboBoxOption[] | undefined, selectedKeys: (string | number | undefined)[]): number[] {
    const selectedIndices: any[] = [];
    if (options === undefined || selectedKeys === undefined) {
      return selectedIndices;
    }

    for (const selectedKey of selectedKeys) {
      const index = findIndex(options, option => option.selected || option.key === selectedKey);
      if (index > -1) {
        selectedIndices.push(index);
      }
    }
    return selectedIndices;
  }

  /**
   * Reset the selected index by clearing the
   * input (of any pending text), clearing the pending state,
   * and setting the suggested display value to the last
   * selected state text
   */
  private _resetSelectedIndex(): void {
    const { currentOptions } = this.state;

    this._clearPendingInfo();

    const selectedIndex: number = this._getFirstSelectedIndex();
    if (selectedIndex > 0 && selectedIndex < currentOptions.length) {
      this.setState({
        suggestedDisplayValue: currentOptions[selectedIndex].text
      });
    } else if (this.props.text || this.props.value) {
      // If we had a value initially, restore it
      this.setState({
        suggestedDisplayValue: this.props.text || this.props.value
      });
    }
  }

  /**
   * Clears the pending info state
   */
  private _clearPendingInfo(): void {
    this._processingClearPendingInfo = true;
    this.setState(
      {
        currentPendingValue: undefined,
        currentPendingValueValidIndex: -1,
        suggestedDisplayValue: undefined,
        currentPendingValueValidIndexOnHover: HoverStatus.default
      },
      this._onAfterClearPendingInfo
    );
  }

  private _onAfterClearPendingInfo = () => {
    this._processingClearPendingInfo = false;
  };

  /**
   * Set the pending info
   * @param currentPendingValue - new pending value to set
   * @param currentPendingValueValidIndex - new pending value index to set
   * @param suggestedDisplayValue - new suggest display value to set
   */
  private _setPendingInfo(currentPendingValue?: string, currentPendingValueValidIndex: number = -1, suggestedDisplayValue?: string): void {
    if (this._processingClearPendingInfo) {
      return;
    }

    this.setState({
      currentPendingValue: currentPendingValue && this._removeZeroWidthSpaces(currentPendingValue),
      currentPendingValueValidIndex: currentPendingValueValidIndex,
      suggestedDisplayValue: suggestedDisplayValue,
      currentPendingValueValidIndexOnHover: HoverStatus.default
    });
  }

  /**
   * Set the pending info from the given index
   * @param index - the index to set the pending info from
   */
  private _setPendingInfoFromIndex(index: number): void {
    const { currentOptions } = this.state;

    if (index >= 0 && index < currentOptions.length) {
      const option = currentOptions[index];
      this._setPendingInfo(this._getPreviewText(option), index, this._getPreviewText(option));
    } else {
      this._clearPendingInfo();
    }
  }

  /**
   * Sets the pending info for the comboBox
   * @param index - the index to search from
   * @param searchDirection - the direction to search
   */
  private _setPendingInfoFromIndexAndDirection(index: number, searchDirection: SearchDirection): void {
    const { currentOptions } = this.state;

    // update index to allow content to wrap
    if (searchDirection === SearchDirection.forward && index >= currentOptions.length - 1) {
      index = -1;
    } else if (searchDirection === SearchDirection.backward && index <= 0) {
      index = currentOptions.length;
    }

    // get the next "valid" index
    const indexUpdate = this._getNextSelectableIndex(index, searchDirection);

    // if the two indicies are equal we didn't move and
    // we should attempt to get  get the first/last "valid" index to use
    // (Note, this takes care of the potential cases where the first/last
    // item is not focusable), otherwise use the updated index
    if (index === indexUpdate) {
      if (searchDirection === SearchDirection.forward) {
        index = this._getNextSelectableIndex(-1, searchDirection);
      } else if (searchDirection === SearchDirection.backward) {
        index = this._getNextSelectableIndex(currentOptions.length, searchDirection);
      }
    } else {
      index = indexUpdate;
    }

    if (this._indexWithinBounds(currentOptions, index)) {
      this._setPendingInfoFromIndex(index);
    }
  }

  private _notifyPendingValueChanged(prevState: IComboBoxState): void {
    const { onPendingValueChanged } = this.props;

    if (!onPendingValueChanged) {
      return;
    }

    const { currentPendingValue, currentOptions, currentPendingValueValidIndex, currentPendingValueValidIndexOnHover } = this.state;

    let newPendingIndex: number | undefined = undefined;
    let newPendingValue: string | undefined = undefined;

    if (
      currentPendingValueValidIndexOnHover !== prevState.currentPendingValueValidIndexOnHover &&
      this._indexWithinBounds(currentOptions, currentPendingValueValidIndexOnHover)
    ) {
      // Set new pending index if hover index was changed
      newPendingIndex = currentPendingValueValidIndexOnHover;
    } else if (
      currentPendingValueValidIndex !== prevState.currentPendingValueValidIndex &&
      this._indexWithinBounds(currentOptions, currentPendingValueValidIndex)
    ) {
      // Set new pending index if currentPendingValueValidIndex was changed
      newPendingIndex = currentPendingValueValidIndex;
    } else if (currentPendingValue !== prevState.currentPendingValue && currentPendingValue !== '') {
      // Set pendingValue in the case it was changed and no index was changed
      newPendingValue = currentPendingValue;
    }

    // Notify when there is a new pending index/value. Also, if there is a pending value, it needs to send undefined.
    if (newPendingIndex !== undefined || newPendingValue !== undefined || this._hasPendingValue) {
      onPendingValueChanged(newPendingIndex !== undefined ? currentOptions[newPendingIndex] : undefined, newPendingIndex, newPendingValue);
      this._hasPendingValue = newPendingIndex !== undefined || newPendingValue !== undefined;
    }
  }

  /**
   * Sets the isOpen state and updates focusInputAfterClose
   */
  private _setOpenStateAndFocusOnClose(isOpen: boolean, focusInputAfterClose: boolean): void {
    this._focusInputAfterClose = focusInputAfterClose;
    this.setState({
      isOpen: isOpen
    });
  }

  /**
   * Handle keydown on the input
   * @param ev - The keyboard event that was fired
   */
  private _onInputKeyDown = (ev: React.KeyboardEvent<HTMLElement | Autofill>): void => {
    const { disabled, allowFreeform, autoComplete } = this.props;
    const { isOpen, currentOptions, currentPendingValueValidIndexOnHover } = this.state;

    // Take note if we are processing an alt (option) or meta (command) keydown.
    // See comment in _onInputKeyUp for reasoning.
    this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);

    if (disabled) {
      this._handleInputWhenDisabled(ev);
      return;
    }

    let index = this._getPendingSelectedIndex(false /* includeCurrentPendingValue */);

    switch (ev.which) {
      case KeyCodes.enter:
        if (this._autofill.current && this._autofill.current.inputElement) {
          this._autofill.current.inputElement.select();
        }

        this._submitPendingValue(ev);
        if (this.props.multiSelect && isOpen) {
          this.setState({
            currentPendingValueValidIndex: index
          });
        } else {
          // On enter submit the pending value
          if (
            isOpen ||
            ((!allowFreeform ||
              this.state.currentPendingValue === undefined ||
              this.state.currentPendingValue === null ||
              this.state.currentPendingValue.length <= 0) &&
              this.state.currentPendingValueValidIndex < 0)
          ) {
            // if we are open or
            // if we are not allowing freeform or
            // our we have no pending value
            // and no valid pending index
            // flip the open state
            this.setState({
              isOpen: !isOpen
            });
          }
        }
        break;

      case KeyCodes.tab:
        // On enter submit the pending value
        if (!this.props.multiSelect) {
          this._submitPendingValue(ev);
        }

        // If we are not allowing freeform
        // or the comboBox is open, flip the open state
        if (isOpen) {
          this._setOpenStateAndFocusOnClose(!isOpen, false /* focusInputAfterClose */);
        }

        // Allow TAB to propigate
        return;

      case KeyCodes.escape:
        // reset the selected index
        this._resetSelectedIndex();

        // Close the menu if opened
        if (isOpen) {
          this.setState({
            isOpen: false
          });
        } else {
          return;
        }
        break;

      case KeyCodes.up:
        // if we are in clearAll state (e.g. the user as hovering
        // and has since mousedOut of the menu items),
        // go to the last index
        if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
          index = this.state.currentOptions.length;
        }

        if (ev.altKey || ev.metaKey) {
          // Close the menu if it is open and break so
          // that the event get stopPropagation and prevent default.
          // Otherwise, we need to let the event continue to propagate
          if (isOpen) {
            this._setOpenStateAndFocusOnClose(!isOpen, true /* focusInputAfterClose */);
            break;
          }

          return;
        }

        // Go to the previous option
        this._setPendingInfoFromIndexAndDirection(index, SearchDirection.backward);
        break;

      case KeyCodes.down:
        // Expand the comboBox on ALT + DownArrow
        if (ev.altKey || ev.metaKey) {
          this._setOpenStateAndFocusOnClose(true /* isOpen */, true /* focusInputAfterClose */);
        } else {
          // if we are in clearAll state (e.g. the user as hovering
          // and has since mousedOut of the menu items),
          // go to the first index
          if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
            index = -1;
          }

          // Got to the next option
          this._setPendingInfoFromIndexAndDirection(index, SearchDirection.forward);
        }
        break;

      case KeyCodes.home:
      case KeyCodes.end:
        if (allowFreeform) {
          return;
        }

        // Set the initial values to respond to HOME
        // which goes to the first selectable option
        index = -1;
        let directionToSearch = SearchDirection.forward;

        // If end, update the values to respond to END
        // which goes to the last selectable option
        if (ev.which === KeyCodes.end) {
          index = currentOptions.length;
          directionToSearch = SearchDirection.backward;
        }

        this._setPendingInfoFromIndexAndDirection(index, directionToSearch);
        break;

      case KeyCodes.space:
        // event handled in _onComboBoxKeyUp
        if (!allowFreeform && autoComplete === 'off') {
          break;
        }

      default:
        // are we processing a function key? if so bail out
        if (ev.which >= 112 /* F1 */ && ev.which <= 123 /* F12 */) {
          return;
        }

        // If we get here and we got either and ALT key
        // or meta key, let the event propagate
        if (ev.keyCode === KeyCodes.alt || ev.key === 'Meta' /* && isOpen */) {
          return;
        }

        // If we are not allowing freeform and
        // allowing autoComplete, handle the input here
        // since we have marked the input as readonly
        if (!allowFreeform && autoComplete === 'on') {
          this._onInputChange(String.fromCharCode(ev.which));
          break;
        }

        // allow the key to propagate by default
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  /**
   * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
   */
  private _isAltOrMeta(ev: React.KeyboardEvent<HTMLElement | Autofill>): boolean {
    return ev.which === KeyCodes.alt || ev.key === 'Meta';
  }

  /**
   * Handle keyup on the input
   * @param ev - the keyboard event that was fired
   */
  private _onInputKeyUp = (ev: React.KeyboardEvent<HTMLElement | Autofill>): void => {
    const { disabled, allowFreeform, autoComplete } = this.props;
    const isOpen = this.state.isOpen;

    // We close the menu on key up only if ALL of the following are true:
    // - Most recent key down was alt or meta (command)
    // - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
    //   expand/collapse the menu)
    // - We're not on a Mac (or iOS)
    // This is because on Windows, pressing alt moves focus to the application menu bar or similar,
    // closing any open context menus. There is not a similar behavior on Macs.
    const keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && this._isAltOrMeta(ev);
    this._lastKeyDownWasAltOrMeta = false;
    const shouldHandleKey = keyPressIsAltOrMetaAlone && !(isMac() || isIOS());

    if (disabled) {
      this._handleInputWhenDisabled(ev);
      return;
    }

    switch (ev.which) {
      case KeyCodes.space:
        // If we are not allowing freeform and are not autoComplete
        // make space expand/collapse the comboBox
        // and allow the event to propagate
        if (!allowFreeform && autoComplete === 'off') {
          this._setOpenStateAndFocusOnClose(!isOpen, !!isOpen);
          return;
        }
        break;
      default:
        if (shouldHandleKey && isOpen) {
          this._setOpenStateAndFocusOnClose(!isOpen, true /* focusInputAfterClose */);
        }
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  private _onOptionMouseEnter(index: number): void {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: index
    });
  }

  private _onOptionMouseMove(index: number): void {
    this._gotMouseMove = true;

    if (!this._isScrollIdle || this.state.currentPendingValueValidIndexOnHover === index) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: index
    });
  }

  private _onOptionMouseLeave = () => {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: HoverStatus.clearAll
    });
  };

  private _shouldIgnoreMouseEvent(): boolean {
    return !this._isScrollIdle || !this._gotMouseMove;
  }

  /**
   * Handle dismissing the menu and
   * eating the required key event when disabled
   * @param ev - the keyboard event that was fired
   */
  private _handleInputWhenDisabled(ev: React.KeyboardEvent<HTMLElement | Autofill> | null): void {
    // If we are disabled, close the menu (if needed)
    // and eat all keystokes other than TAB or ESC
    if (this.props.disabled) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }

      // When disabled stop propagation and prevent default
      // of the event unless we have a tab, escape, or function key
      if (
        ev !== null &&
        ev.which !== KeyCodes.tab &&
        ev.which !== KeyCodes.escape &&
        (ev.which < 112 /* F1 */ || ev.which > 123) /* F12 */
      ) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    }
  }

  /**
   * Click handler for the button of the comboBox
   * and the input when not allowing freeform. This
   * toggles the expand/collapse state of the comboBox (if enbled)
   */
  private _onComboBoxClick = (): void => {
    const { disabled } = this.props;
    const { isOpen } = this.state;

    if (!disabled) {
      this._setOpenStateAndFocusOnClose(!isOpen, false /* focusInputAfterClose */);
      this.setState({ focused: true });
    }
  };

  /**
   * Click handler for the autofill.
   */
  private _onAutofillClick = (): void => {
    if (this.props.allowFreeform) {
      this.focus(this.state.isOpen || this._processingTouch);
    } else {
      this._onComboBoxClick();
    }
  };

  private _onTouchStart: () => void = () => {
    if (this._comboBoxWrapper.current && !('onpointerdown' in this._comboBoxWrapper)) {
      this._handleTouchAndPointerEvent();
    }
  };

  private _onPointerDown = (ev: PointerEvent): void => {
    if (ev.pointerType === 'touch') {
      this._handleTouchAndPointerEvent();

      ev.preventDefault();
      ev.stopImmediatePropagation();
    }
  };

  private _handleTouchAndPointerEvent() {
    // If we already have an existing timeeout from a previous touch and pointer event
    // cancel that timeout so we can set a nwe one.
    if (this._lastTouchTimeoutId !== undefined) {
      this._async.clearTimeout(this._lastTouchTimeoutId);
      this._lastTouchTimeoutId = undefined;
    }
    this._processingTouch = true;

    this._lastTouchTimeoutId = this._async.setTimeout(() => {
      this._processingTouch = false;
      this._lastTouchTimeoutId = undefined;
    }, TouchIdleDelay);
  }

  /**
   * Get the styles for the current option.
   * @param item Item props for the current option
   */
  private _getCaretButtonStyles(): IButtonStyles {
    const { caretDownButtonStyles: customCaretDownButtonStyles } = this.props;
    return getCaretDownButtonStyles(this.props.theme!, customCaretDownButtonStyles);
  }

  /**
   * Get the styles for the current option.
   * @param item Item props for the current option
   */
  private _getCurrentOptionStyles(item: IComboBoxOption): Partial<IComboBoxOptionStyles> {
    const { comboBoxOptionStyles: customStylesForAllOptions } = this.props;
    const { styles: customStylesForCurrentOption } = item;

    return getOptionStyles(this.props.theme!, customStylesForAllOptions, customStylesForCurrentOption, this._isPendingOption(item));
  }

  /**
   * Get the aria-activedescendant value for the comboxbox.
   * @returns the id of the current focused combo item, otherwise the id of the currently selected element, null otherwise
   */
  private _getAriaActiveDescentValue(): string | undefined {
    let descendantText =
      this.state.isOpen && this.state.selectedIndices && this.state.selectedIndices.length >= 0
        ? this._id + '-list' + this.state.selectedIndices[0]
        : undefined;
    if (this.state.isOpen && this.state.focused && this.state.currentPendingValueValidIndex !== -1) {
      descendantText = this._id + '-list' + this.state.currentPendingValueValidIndex;
    }
    return descendantText;
  }

  /**
   * Get the aria autocomplete value for the Combobox
   * @returns 'inline' if auto-complete automatically dynamic, 'both' if we have a list of possible values to pick from and can
   * dynamically populate input, and 'none' if auto-complete is not enabled as we can't give user inputs.
   */
  private _getAriaAutoCompleteValue(): 'none' | 'inline' | 'list' | 'both' | undefined {
    const autoComplete = !this.props.disabled && this.props.autoComplete === 'on';
    return autoComplete ? (this.props.allowFreeform ? 'inline' : 'both') : 'none';
  }

  private _isPendingOption(item: IComboBoxOption): boolean {
    return item && item.index === this.state.currentPendingValueValidIndex;
  }

  /**
   * Given default selected key(s) and selected key(s), return the selected keys(s).
   * When default selected key(s) are available, they take precedence and return them instead of selected key(s).
   *
   * @returns No matter what specific types the input parameters are, always return an array of
   *  either strings or numbers instead of premitive type.  This normlization makes caller's logic easier.
   */
  private _buildDefaultSelectedKeys(
    defaultSelectedKey: string | number | string[] | number[] | undefined,
    selectedKey: string | number | string[] | number[] | undefined
  ): string[] | number[] {
    const selectedKeys: string[] | number[] = this._buildSelectedKeys(defaultSelectedKey);
    if (selectedKeys.length) {
      return selectedKeys;
    }
    return this._buildSelectedKeys(selectedKey);
  }

  private _buildSelectedKeys(selectedKey: string | number | string[] | number[] | undefined): string[] | number[] {
    if (selectedKey === undefined) {
      return [];
    }

    // need to cast here so typescript does not complain
    return (selectedKey instanceof Array ? selectedKey : [selectedKey]) as string[] | number[];
  }

  // For scenarios where the option's text prop contains embedded styles, we use the option's
  // ariaLabel value as the text in the input and for autocomplete matching. We know to use this
  // when the useAriaLabelAsText prop is set to true
  private _getPreviewText(item: IComboBoxOption): string {
    return item.useAriaLabelAsText && item.ariaLabel ? item.ariaLabel : item.text;
  }

  private _normalizeToString(value?: string): string {
    return value || '';
  }

  private _removeZeroWidthSpaces(value: string): string {
    // remove any zero width space characters
    return value.replace(RegExp('​', 'g'), '');
  }
}
