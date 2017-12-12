import * as React from 'react';
import { IComboBoxOption, IComboBoxProps } from './ComboBox.types';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout } from '../../Callout';
import { Label } from '../../Label';
import {
  CommandButton,
  IconButton
} from '../../Button';
import { BaseAutoFill } from '../pickers/AutoFill/BaseAutoFill';
import {
  autobind,
  BaseComponent,
  divProperties,
  findIndex,
  getId,
  getNativeProps,
  KeyCodes,
  customizable
} from '../../Utilities';
import { SelectableOptionMenuItemType, ISelectableOption } from '../../utilities/selectableOption/SelectableOption.types';
import {
  getStyles,
  getOptionStyles,
  getCaretDownButtonStyles
} from './ComboBox.styles';
import {
  IComboBoxStyles,
} from './ComboBox.types';
import {
  IComboBoxClassNames,
  getClassNames,
  getComboBoxOptionClassNames
} from './ComboBox.classNames';

export interface IComboBoxState {

  // The open state
  isOpen?: boolean;

  // The currently selected index (-1 if no index is selected)
  selectedIndex: number;

  // The focused state of the comboBox
  focused?: boolean;

  // This value is used for the autocomplete hint value
  suggestedDisplayValue?: string;

  // The options currently available for the callout
  currentOptions: IComboBoxOption[];

  // when taking input, this will store the index the
  // that the options input matches (-1 if no input or match)
  currentPendingValueValidIndex: number;

  // This will store the hovered over value in the dropdown
  // it is used for styling the options without updating the input
  currentPendingValueValidIndexOnHover: number;

  // when taking input, this will store
  // the actual text that is being entered
  currentPendingValue: string;
}

enum SearchDirection {
  backward = -1,
  none = 0,
  forward = 1
}

enum HoverStatus {
  // This is used when the user was hovering
  // and has since moused out of the menu items
  clearAll = -2,
  // This is the default "normal" state
  // when no hover has happened or a hover is in progress
  default = -1
}

@customizable('ComboBox', ['theme'])
export class ComboBox extends BaseComponent<IComboBoxProps, IComboBoxState> {

  public static defaultProps: IComboBoxProps = {
    options: [],
    allowFreeform: false,
    autoComplete: 'on',
    buttonIconProps: { iconName: 'ChevronDown' }
  };

  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  };

  // The input aspect of the comboBox
  private _comboBox: BaseAutoFill;

  // The wrapping div of the input and button
  private _comboBoxWrapper: HTMLDivElement;

  // The callout element
  private _comboBoxMenu: HTMLElement;

  // The menu item element that is currently selected
  private _selectedElement: HTMLElement;

  // The base id for the comboBox
  private _id: string;

  // This is used to clear any pending autocomplete
  // text (used when autocomplete is true and allowFreeform is false)
  private readonly _readOnlyPendingAutoCompleteTimeout: number = 1000 /* ms */;

  // After a character is inserted when autocomplete is true and
  // allowFreeform is false, remember the task that will clear
  // the pending string of characters
  private _lastReadOnlyAutoCompleteChangeTimeoutId: number | undefined;

  // Promise used when resolving the comboBox options
  private _currentPromise: PromiseLike<IComboBoxOption[]>;

  // The current visible value sent to the auto fill on render
  private _currentVisibleValue: string | undefined;

  private _classNames: IComboBoxClassNames;

  private _isScrollIdle: boolean;

  private readonly _scrollIdleDelay: number = 250 /* ms */;

  private _scrollIdleTimeoutId: number | undefined;

  // Determines if we should be setting
  // focus back to the input when the menu closes.
  // The general rule of thumb is if the menu was launched
  // vai the keyboard focus should go back to the input,
  // if it was dropped via the mouse focus should not be
  // forced back to the input
  private _focusInputAfterClose: boolean;

  constructor(props: IComboBoxProps) {
    super(props);

    this._warnMutuallyExclusive({
      'defaultSelectedKey': 'selectedKey',
      'value': 'defaultSelectedKey',
      'selectedKey': 'value',
      'dropdownWidth': 'useComboBoxAsMenuWidth'
    });

    this._id = props.id || getId('ComboBox');

    let selectedKey = props.defaultSelectedKey !== undefined ? props.defaultSelectedKey : props.selectedKey;
    this._isScrollIdle = true;

    let index: number = this._getSelectedIndex(props.options, selectedKey);

    this.state = {
      isOpen: false,
      selectedIndex: index,
      focused: false,
      suggestedDisplayValue: '',
      currentOptions: this.props.options,
      currentPendingValueValidIndex: -1,
      currentPendingValue: '',
      currentPendingValueValidIndexOnHover: HoverStatus.default
    };
  }

  public componentDidMount() {
    // hook up resolving the options if needed on focus
    this._events.on(this._comboBoxWrapper, 'focus', this._onResolveOptions, true);
  }

  public componentWillReceiveProps(newProps: IComboBoxProps) {
    // Update the selectedIndex and currentOptions state if
    // the selectedKey, value, or options have changed
    if (newProps.selectedKey !== this.props.selectedKey ||
      newProps.value !== this.props.value ||
      newProps.options !== this.props.options) {

      let index: number = this._getSelectedIndex(newProps.options, newProps.selectedKey);

      this.setState({
        selectedIndex: index,
        currentOptions: newProps.options
      });
    }
  }

  public componentDidUpdate(prevProps: IComboBoxProps, prevState: IComboBoxState) {
    let {
      allowFreeform,
      value,
      onMenuOpen,
      onMenuDismissed
    } = this.props;
    let {
      isOpen,
      focused,
      selectedIndex,
      currentPendingValueValidIndex
    } = this.state;

    // If we are newly open or are open and the pending valid index changed,
    // make sure the currently selected/pending option is scrolled into view
    if (isOpen &&
      (!prevState.isOpen ||
        prevState.currentPendingValueValidIndex !== currentPendingValueValidIndex)) {
      // Need this timeout so that the selectedElement ref is correctly updated
      this._async.setTimeout(() => this._scrollIntoView(), 0);
    }

    // If we are open or we are just closed, shouldFocusAfterClose is set,
    // are focused but we are not the activeElement set focus on the input
    if (isOpen ||
      (prevState.isOpen &&
        !isOpen &&
        this._focusInputAfterClose &&
        focused &&
        document.activeElement !== this._comboBox.inputElement)) {
      this.focus();
    }

    // If we should focusAfterClose AND
    //   just opened/closed the menu OR
    //   are focused AND
    //     updated the selectedIndex with the menu closed OR
    //     are not allowing freeform OR
    //     the value changed
    // we need to set selection
    if (this._focusInputAfterClose && (prevState.isOpen && !isOpen ||
      (focused &&
        ((!isOpen && prevState.selectedIndex !== selectedIndex) ||
          !allowFreeform || value !== prevProps.value)
      ))) {
      this._select();
    }

    if (isOpen && !prevState.isOpen && onMenuOpen) {
      onMenuOpen();
    }

    if (!isOpen && prevState.isOpen && onMenuDismissed) {
      onMenuDismissed();
    }
  }

  public componentWillUnmount() {
    super.componentWillUnmount();

    // remove the eventHanlder that was added in componentDidMount
    this._events.off(this._comboBoxWrapper);
  }

  // Primary Render
  public render() {
    let id = this._id;
    let {
      className,
      label,
      disabled,
      ariaLabel,
      required,
      errorMessage,
      onRenderContainer = this._onRenderContainer,
      onRenderList = this._onRenderList,
      onRenderItem = this._onRenderItem,
      onRenderOption = this._onRenderOption,
      allowFreeform,
      autoComplete,
      buttonIconProps,
      styles: customStyles,
      theme,
    } = this.props;
    let { isOpen, selectedIndex, focused, suggestedDisplayValue } = this.state;
    this._currentVisibleValue = this._getVisibleValue();

    let divProps = getNativeProps(this.props, divProperties);

    let hasErrorMessage = (errorMessage && errorMessage.length > 0) ? true : false;

    this._classNames = getClassNames(
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
      <div {...divProps } ref='root' className={ this._classNames.container }>
        { label && (
          <Label id={ id + '-label' } disabled={ disabled } required={ required } htmlFor={ id } className={ this._classNames.label }>{ label }</Label>
        ) }
        <div
          ref={ this._resolveRef('_comboBoxWrapper') }
          id={ id + 'wrapper' }
          className={ this._classNames.root }
        >
          <BaseAutoFill
            data-is-interactable={ !disabled }
            ref={ this._resolveRef('_comboBox') }
            id={ id + '-input' }
            className={ this._classNames.input }
            type='text'
            onFocus={ this._select }
            onBlur={ this._onBlur }
            onKeyDown={ this._onInputKeyDown }
            onKeyUp={ this._onInputKeyUp }
            onClick={ allowFreeform ? this.focus : this._onComboBoxClick }
            onInputValueChange={ this._onInputChange }
            aria-expanded={ isOpen }
            aria-autocomplete={ (!disabled && autoComplete === 'on') }
            role='combobox'
            aria-readonly={ ((allowFreeform || disabled) ? null : 'true') }
            readOnly={ disabled || !allowFreeform }
            aria-labelledby={ (label && (id + '-label')) }
            aria-label={ ((ariaLabel && !label) && ariaLabel) }
            aria-describedby={ (id + '-option') }
            aria-activedescendant={ (isOpen && (selectedIndex as number) >= 0 ? (id + '-list' + selectedIndex) : null) }
            aria-disabled={ disabled }
            aria-owns={ (id + '-list') }
            spellCheck={ false }
            defaultVisibleValue={ this._currentVisibleValue }
            suggestedDisplayValue={ suggestedDisplayValue }
            updateValueInWillReceiveProps={ this._onUpdateValueInAutoFillWillReceiveProps }
            shouldSelectFullInputValueInComponentDidUpdate={ this._onShouldSelectFullInputValueInAutoFillComponentDidUpdate }
          />
          <IconButton
            className={ 'ms-ComboBox-CaretDown-button' }
            styles={ this._getCaretButtonStyles() }
            role='presentation'
            aria-hidden='true'
            tabIndex={ -1 }
            onClick={ this._onComboBoxClick }
            iconProps={ buttonIconProps }
            disabled={ disabled }
            checked={ isOpen }
          />
        </div>

        { isOpen && (
          (onRenderContainer as any)({
            ...this.props,
            onRenderList,
            onRenderItem,
            onRenderOption,
            options: this.state.currentOptions.map((item, index) => ({ ...item, index: index }))
          },
            this._onRenderContainer)
        ) }
        {
          errorMessage &&
          <div
            className={ this._classNames.errorMessage }
          >
            { errorMessage }
          </div>
        }
      </div>
    );
  }

  /**
   * Set focus on the input
   */
  @autobind
  public focus() {
    if (this._comboBox) {
      this._comboBox.focus();
    }
  }

  /**
   * Close menu callout if it is open
   */
  @autobind
  public dismissMenu(): void {
    let { isOpen } = this.state;
    isOpen && this.setState({ isOpen: false });
  }

  /**
   * componentWillReceiveProps handler for the auto fill component
   * Checks/updates the iput value to set, if needed
   * @param {IBaseAutoFillProps} defaultVisibleValue - the defaultVisibleValue that got passed
   *  in to the auto fill's componentWillReceiveProps
   * @returns {string} - the updated value to set, if needed
   */
  @autobind
  private _onUpdateValueInAutoFillWillReceiveProps(): string | null {
    if (this._comboBox === null || this._comboBox === undefined) {
      return null;
    }

    if (this._currentVisibleValue && this._currentVisibleValue !== '' && this._comboBox.value !== this._currentVisibleValue) {
      return this._currentVisibleValue;
    }

    return this._comboBox.value;
  }

  /**
   * componentDidUpdate handler for the auto fill component
   *
   * @param { string } defaultVisibleValue - the current defaultVisibleValue in the auto fill's componentDidUpdate
   * @param { string } suggestedDisplayValue - the current suggestedDisplayValue in the auto fill's componentDidUpdate
   * @returns {boolean} - should the full value of the input be selected?
   * True if the defaultVisibleValue equals the suggestedDisplayValue, false otherwise
   */
  @autobind
  private _onShouldSelectFullInputValueInAutoFillComponentDidUpdate(): boolean {
    return this._currentVisibleValue === this.state.suggestedDisplayValue;
  }

  /**
   * Get the correct value to pass to the input
   * to show to the user based off of the current props and state
   * @returns {string} the value to pass to the input
   */
  @autobind
  private _getVisibleValue(): string | undefined {
    let {
      value,
      allowFreeform,
      autoComplete
    } = this.props;
    let {
      selectedIndex,
      currentPendingValueValidIndex,
      currentOptions,
      currentPendingValue,
      suggestedDisplayValue,
      isOpen
    } = this.state;

    let currentPendingIndexValid = this._indexWithinBounds(currentOptions, currentPendingValueValidIndex);

    // If the user passed is a value prop, use that
    // unless we are open and have a valid current pending index
    if (!(isOpen && currentPendingIndexValid) && (value && !currentPendingValue)) {
      return value;
    }

    let index = selectedIndex;

    if (allowFreeform) {
      // If we are allowing freeform and autocomplete is also true
      // and we've got a pending value that matches an option, remember
      // the matched option's index
      if (autoComplete === 'on' && currentPendingIndexValid) {
        index = currentPendingValueValidIndex;
      }

      // Since we are allowing freeform, if there is currently a nonempty pending value, use that
      // otherwise use the index determined above (falling back to '' if we did not get a valid index)
      return currentPendingValue !== '' ? currentPendingValue : (this._indexWithinBounds(currentOptions, index) ? currentOptions[index].text : '');

    } else {

      // If we are not allowing freeform and have a
      // valid index that matches the pending value,
      // we know we will need some version of the pending value
      if (currentPendingIndexValid) {

        // If autoComplete is on, return the
        // raw pending value, otherwise remember
        // the matched option's index
        if (autoComplete === 'on') {
          return currentPendingValue;
        }

        index = currentPendingValueValidIndex;
      }

      // If we have a valid index then return the text value of that option,
      // otherwise return the suggestedDisplayValue
      return this._indexWithinBounds(currentOptions, index) ? currentOptions[index].text : suggestedDisplayValue;
    }
  }

  /**
   * Is the index within the bounds of the array?
   * @param options - options to check if the index is valid for
   * @param index - the index to check
   * @returns {boolean} - true if the index is valid for the given options, false otherwise
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
  @autobind
  private _onInputChange(updatedValue: string) {
    if (this.props.disabled) {
      this._handleInputWhenDisabled(null /* event */);
      return;
    }

    this.props.allowFreeform ?
      this._processInputChangeWithFreeform(updatedValue) :
      this._processInputChangeWithoutFreeform(updatedValue);
  }

  /**
   * Process the new input's new value when the comboBox
   * allows freeform entry
   * @param updatedValue - the input's newly changed value
   */
  private _processInputChangeWithFreeform(updatedValue: string) {
    let {
      currentOptions
    } = this.state;

    // if the new value is empty, nothing needs to be done
    if (updatedValue === '') {
      return;
    }

    // Remember the original value and then,
    // make the value lowercase for comparison
    let originalUpdatedValue: string = updatedValue;
    updatedValue = updatedValue.toLocaleLowerCase();

    let newSuggestedDisplayValue = '';
    let newCurrentPendingValueValidIndex = -1;

    // If autoComplete is on, attempt to find a match from the available options
    if (this.props.autoComplete === 'on') {

      // If autoComplete is on, attempt to find a match where the text of an option starts with the updated value
      let items = currentOptions.map((item, index) => { return { ...item, index }; }).filter((option) => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider).filter((option) => option.text.toLocaleLowerCase().indexOf(updatedValue) === 0);
      if (items.length > 0) {
        // If the user typed out the complete option text, we don't need any suggested display text anymore
        newSuggestedDisplayValue = items[0].text.toLocaleLowerCase() !== updatedValue ? items[0].text : '';

        // remember the index of the match we found
        newCurrentPendingValueValidIndex = items[0].index;
      }
    } else {

      // If autoComplete is off, attempt to find a match only when the value is exactly equal to the text of an option
      let items = currentOptions.map((item, index) => { return { ...item, index }; }).filter((option) => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider).filter((option) => option.text.toLocaleLowerCase() === updatedValue);

      // if we fould a match remember the index
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
  private _processInputChangeWithoutFreeform(updatedValue: string) {
    let {
      currentPendingValue,
      currentPendingValueValidIndex,
      currentOptions,
      selectedIndex
    } = this.state;

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
          updatedValue = currentPendingValue + updatedValue;
        }

        let originalUpdatedValue: string = updatedValue;
        updatedValue = updatedValue.toLocaleLowerCase();

        // If autoComplete is on, attempt to find a match where the text of an option starts with the updated value
        let items = currentOptions.map((item, i) => { return { ...item, index: i }; }).filter((option) => option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider).filter((option) => option.text.toLocaleLowerCase().indexOf(updatedValue) === 0);

        // If we found a match, udpdate the state
        if (items.length > 0) {
          this._setPendingInfo(originalUpdatedValue, items[0].index, items[0].text);
        }

        // Schedule a timeout to clear the pending value after the timeout span
        this._lastReadOnlyAutoCompleteChangeTimeoutId =
          this._async.setTimeout(
            () => { this._lastReadOnlyAutoCompleteChangeTimeoutId = undefined; },
            this._readOnlyPendingAutoCompleteTimeout
          );
        return;
      }
    }

    // If we get here, either autoComplete is on or we did not find a match with autoComplete on.
    // Remember we are not allowing freeform, so at this point, if we have a pending valid value index
    // use that; otherwise use the selectedIndex
    let index = currentPendingValueValidIndex >= 0 ? currentPendingValueValidIndex : selectedIndex;

    // Since we are not allowing freeform, we need to
    // set both the pending and suggested values/index
    // to allow us to select all content in the input to
    // give the illusion that we are readonly (e.g. freeform off)
    this._setPendingInfoFromIndex(index);
  }

  /**
   * Walk along the options starting at the index, stepping by the delta (positive or negative)
   * looking for the next valid selectable index (e.g. skipping headings and dividers)
   * @param index - the index to get the next selectable index from
   * @param delta - optional delta to step by when finding the next index, defaults to 0
   * @returns {number} - the next valid selectable index. If the new index is outside of the bounds,
   * it will snap to the edge of the options array. If delta == 0 and the given index is not selectable
   */
  private _getNextSelectableIndex(index: number, searchDirection: SearchDirection): number {
    let { currentOptions } = this.state;

    let newIndex = index + searchDirection;

    newIndex = Math.max(0, Math.min(currentOptions.length - 1, newIndex));

    if (!this._indexWithinBounds(currentOptions, newIndex)) {
      return -1;
    }

    let option: IComboBoxOption = currentOptions[newIndex];

    // attempt to skip headers and dividers
    if ((option.itemType === SelectableOptionMenuItemType.Header ||
      option.itemType === SelectableOptionMenuItemType.Divider)) {

      // Should we continue looking for an index to select?
      if (searchDirection !== SearchDirection.none &&
        ((newIndex > 0 && searchDirection < SearchDirection.none) ||
          (newIndex >= 0 && newIndex < currentOptions.length && searchDirection > SearchDirection.none))) {
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
  private _setSelectedIndex(index: number, searchDirection: SearchDirection = SearchDirection.none) {
    let { onChanged } = this.props;
    let { selectedIndex, currentOptions } = this.state;

    // Find the next selectable index, if searchDirection is none
    // we will get our starting index back
    index = this._getNextSelectableIndex(index, searchDirection);

    if (!this._indexWithinBounds(currentOptions, index)) {
      return;
    }

    // Are we at a new index? If so, update the state, otherwise
    // there is nothing to do
    if (index !== selectedIndex) {
      let option: IComboBoxOption = currentOptions[index];

      // Set the selected option
      this.setState({
        selectedIndex: index
      });

      // Did the creator give us an onChanged callback?
      if (onChanged) {
        onChanged(option, index);
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
  @autobind
  private _select() {
    this._comboBox.inputElement.select();

    if (!this.state.focused) {
      this.setState({ focused: true });
    }
  }

  /**
   * Callback issued when the options should be resolved, if they have been updated or
   * if they need to be passed in the first time. This only does work if an onResolveOptions
   * callback was passed in
   */
  @autobind
  private _onResolveOptions() {
    if (this.props.onResolveOptions) {

      // get the options
      let newOptions = this.props.onResolveOptions({ ...this.state.currentOptions });

      // Check to see if the returned value is an array, if it is update the state
      // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
      if (Array.isArray(newOptions)) {
        this.setState({
          currentOptions: newOptions
        });
      } else if (newOptions && newOptions.then) {

        // Ensure that the promise will only use the callback if it was the most recent one
        // and update the state when the promise returns
        let promise: PromiseLike<IComboBoxOption[]> = this._currentPromise = newOptions;
        promise.then((newOptionsFromPromise: IComboBoxOption[]) => {
          if (promise === this._currentPromise) {
            this.setState({
              currentOptions: newOptionsFromPromise
            });
          }
        });
      }
    }
  }

  /**
   * OnBlur handler. Set the focused state to false
   * and submit any pending value
   */
  @autobind
  private _onBlur(event: React.FocusEvent<HTMLInputElement>) {

    // Do nothing if the blur is coming from something
    // inside the comboBox root or the comboBox menu since
    // it we are not really bluring from the whole comboBox
    if (event.relatedTarget &&
      (this.refs.root && this.refs.root.contains(event.relatedTarget as HTMLElement) ||
        this._comboBoxMenu && this._comboBoxMenu.contains(event.relatedTarget as HTMLElement))) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (this.state.focused) {
      this.setState({ focused: false });
      this._submitPendingValue();
    }
  }

  /**
   * Submit a pending value if there is one
   */
  private _submitPendingValue() {
    let {
      onChanged,
      allowFreeform
    } = this.props;
    let {
      currentPendingValue,
      currentPendingValueValidIndex,
      currentOptions,
      currentPendingValueValidIndexOnHover
    } = this.state;

    // If we allow freeform and we have a pending value, we
    // need to handle that
    if (allowFreeform && currentPendingValue !== '') {

      // Check to see if the user typed an exact match
      if (this._indexWithinBounds(currentOptions, currentPendingValueValidIndex)) {
        let pendingOptionText: string = currentOptions[currentPendingValueValidIndex].text.toLocaleLowerCase();

        // By exact match, that means: our pending value is the same as the the pending option text OR
        // the peding option starts with the pending value and we have an "autoComplete" selection
        // where the total lenght is equal to pending option length; update the state
        if (currentPendingValue.toLocaleLowerCase() === pendingOptionText ||
          (pendingOptionText.indexOf(currentPendingValue.toLocaleLowerCase()) === 0 &&
            this._comboBox.isValueSelected &&
            currentPendingValue.length + (this._comboBox.selectionEnd - this._comboBox.selectionStart) === pendingOptionText.length)) {
          this._setSelectedIndex(currentPendingValueValidIndex);
          this._clearPendingInfo();
          return;
        }
      }

      if (onChanged) {
        onChanged(undefined, undefined, currentPendingValue);
      } else {
        // If we are not controlled, create a new option
        let newOption: IComboBoxOption = { key: currentPendingValue, text: currentPendingValue };
        let newOptions: IComboBoxOption[] = [...currentOptions, newOption];

        this.setState({
          currentOptions: newOptions,
          selectedIndex: newOptions.length - 1
        });
      }
    } else if (currentPendingValueValidIndex >= 0) {
      // Since we are not allowing freeform, we must have a matching
      // to be able to update state
      this._setSelectedIndex(currentPendingValueValidIndex);
    } else if (currentPendingValueValidIndexOnHover >= 0) {
      // If all else failed and we were hovering over an item, select it
      this._setSelectedIndex(currentPendingValueValidIndexOnHover);
    }

    // Finally, clear the pending info
    this._clearPendingInfo();
  }

  // Render Callout container and pass in list
  @autobind
  private _onRenderContainer(props: IComboBoxProps): JSX.Element {
    let {
      onRenderList,
      calloutProps,
      dropdownWidth,
      onRenderLowerContent = this._onRenderLowerContent,
      useComboBoxAsMenuWidth
    } = props;

    return (
      <Callout
        isBeakVisible={ false }
        gapSpace={ 0 }
        doNotLayer={ false }
        directionalHint={ DirectionalHint.bottomLeftEdge }
        directionalHintFixed={ true }
        { ...calloutProps }
        className={ this._classNames.callout }
        target={ this._comboBoxWrapper }
        onDismiss={ this._onDismiss }
        onScroll={ this._onScroll }
        setInitialFocus={ false }
        calloutWidth={
          useComboBoxAsMenuWidth ?
            this._comboBoxWrapper.clientWidth + 2
            : dropdownWidth }
      >
        <div className={ this._classNames.optionsContainerWrapper } ref={ this._resolveRef('_comboBoxMenu') }>
          { (onRenderList as any)({ ...props }, this._onRenderList) }
        </div>
        { onRenderLowerContent(this.props, this._onRenderLowerContent) }
      </Callout>
    );
  }

  // Render List of items
  @autobind
  private _onRenderList(props: IComboBoxProps): JSX.Element {
    let {
      onRenderItem,
      options
    } = props;

    let id = this._id;
    return (
      <div
        id={ id + '-list' }
        className={ this._classNames.optionsContainer }
        aria-labelledby={ id + '-label' }
        role='listbox'
      >
        { options.map((item) => (onRenderItem as any)(item, this._onRenderItem)) }
      </div>
    );
  }

  // Render items
  @autobind
  private _onRenderItem(item: IComboBoxOption): JSX.Element | null {
    switch (item.itemType) {
      case SelectableOptionMenuItemType.Divider:
        return this._renderSeparator(item);
      case SelectableOptionMenuItemType.Header:
        return this._renderHeader(item);
      default:
        return this._renderOption(item);
    }
  }

  // Default _onRenderLowerContent function returns nothing
  @autobind
  private _onRenderLowerContent(): null {
    return null;
  }

  // Render separator
  private _renderSeparator(item: IComboBoxOption): JSX.Element | null {
    let { index, key } = item;

    if (index && index > 0) {
      return (
        <div
          role='separator'
          key={ key }
          className={ this._classNames.divider }
        />
      );
    }
    return null;
  }

  private _renderHeader(item: IComboBoxOption): JSX.Element {
    let { onRenderOption = this._onRenderOption } = this.props;

    return (
      <div key={ item.key } className={ this._classNames.header } role='heading'>
        { onRenderOption(item, this._onRenderOption) }
      </div>);
  }

  // Render menu item
  @autobind
  private _renderOption(item: IComboBoxOption): JSX.Element {
    let { onRenderOption = this._onRenderOption } = this.props;
    let id = this._id;
    let isSelected: boolean = this._isOptionSelected(item.index);
    const rootClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item)).root;

    return (
      <CommandButton
        id={ id + '-list' + item.index }
        key={ item.key }
        data-index={ item.index }
        className={ rootClassNames }
        styles={ this._getCurrentOptionStyles(item) }
        checked={ isSelected }
        onClick={ this._onItemClick(item.index) }
        onMouseEnter={ this._onOptionMouseEnter.bind(this, item.index) }
        onMouseMove={ this._onOptionMouseMove.bind(this, item.index) }
        onMouseLeave={ this._onOptionMouseLeave }
        role='option'
        aria-selected={ isSelected ? 'true' : 'false' }
        ariaLabel={ item.text }
        disabled={ item.disabled }
      > { <span ref={ this._resolveRef(isSelected ? '_selectedElement' : '') }>
        { onRenderOption(item, this._onRenderOption) }
      </span>
        }
      </CommandButton>
    );
  }

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
    let {
      currentPendingValueValidIndexOnHover
    } = this.state;

    // If the hover state is set to clearAll, don't show a selected index.
    // Note, this happens when the user moused out of the menu items
    if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
      return false;
    }

    return this._getPendingSelectedIndex(true /* includePendingValue */) === index;
  }

  /**
   * Gets the pending selected index taking into account hover, valueValidIndex, and selectedIndex
   * @param includeCurrentPendingValue - Should we include the currentPendingValue when
   * finding the index
   */
  private _getPendingSelectedIndex(includeCurrentPendingValue: boolean): number {
    let {
      currentPendingValueValidIndexOnHover,
      currentPendingValueValidIndex,
      currentPendingValue,
      selectedIndex
    } = this.state;

    return (
      currentPendingValueValidIndexOnHover >= 0 ?
        currentPendingValueValidIndexOnHover :
        (currentPendingValueValidIndex >= 0 || (includeCurrentPendingValue && currentPendingValue !== '')) ?
          currentPendingValueValidIndex :
          selectedIndex
    );
  }

  /**
   * Scroll handler for the callout to make sure the mouse events
   * for updating focus are not interacting during scroll
   */
  @autobind
  private _onScroll() {
    if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
      this._async.clearTimeout(this._scrollIdleTimeoutId);
      this._scrollIdleTimeoutId = undefined;
    } else {
      this._isScrollIdle = false;
    }

    this._scrollIdleTimeoutId = this._async.setTimeout(() => { this._isScrollIdle = true; }, this._scrollIdleDelay);
  }

  /**
   * Scroll the selected element into view
   */
  private _scrollIntoView() {
    let {
      onScrollToItem,
      scrollSelectedToTop
    } = this.props;

    let {
      currentPendingValueValidIndex,
      currentPendingValue,
      selectedIndex
    } = this.state;

    if (onScrollToItem) {
      // Use the custom scroll handler
      onScrollToItem((currentPendingValueValidIndex >= 0 || currentPendingValue !== '') ? currentPendingValueValidIndex : selectedIndex);
    } else if (this._selectedElement && this._selectedElement.offsetParent) {
      // We are using refs, scroll the ref into view
      if (scrollSelectedToTop) {
        this._selectedElement.offsetParent.scrollIntoView(true);
      } else {
        let alignToTop = true;

        if (this._comboBoxMenu.offsetParent) {
          let scrollableParentRect = this._comboBoxMenu.offsetParent.getBoundingClientRect();
          let selectedElementRect = this._selectedElement.offsetParent.getBoundingClientRect();

          // If we are completely in view then we do not need to scroll
          if (scrollableParentRect.top <= selectedElementRect.top &&
            scrollableParentRect.top + scrollableParentRect.height >= selectedElementRect.top + selectedElementRect.height) {
            return;
          }

          // If we are lower than the scrollable parent viewport then we should align to the bottom
          if (scrollableParentRect.top + scrollableParentRect.height <= selectedElementRect.top + selectedElementRect.height) {
            alignToTop = false;
          }
        }

        this._selectedElement.offsetParent.scrollIntoView(alignToTop);
      }
    }
  }

  // Render content of item
  @autobind
  private _onRenderOption(item: IComboBoxOption): JSX.Element {
    const optionClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item));
    return <span className={ optionClassNames.optionText }>{ item.text }</span>;
  }

  /**
   * Click handler for the menu items
   * to select the item and also close the menu
   * @param index - the index of the item that was clicked
   */
  private _onItemClick(index: number | undefined): () => void {
    return (): void => {
      this._setSelectedIndex(index as number);
      this.setState({
        isOpen: false
      });
    };
  }

  /**
   * Handles dismissing (cancelling) the menu
   */
  @autobind
  private _onDismiss() {

    // reset the selected index
    // to the last valud state
    this._resetSelectedIndex();

    // close the menu and focus the input
    this.setState({ isOpen: false });

    if (this._focusInputAfterClose) {
      this._comboBox.focus();
    }
  }

  /**
   * Get the index of the option that is marked as selected
   * @param options - the comboBox options
   * @param selectedKey - the known selected key to find
   * @returns { number } - the index of the selected option, -1 if not found
   */
  private _getSelectedIndex(options: IComboBoxOption[] | undefined, selectedKey: string | number | undefined): number {
    if (options === undefined || selectedKey === undefined) {
      return -1;
    }

    return findIndex(options, (option => (option.selected || option.key === selectedKey)));
  }

  /**
   * Reset the selected index by clearing the
   * input (of any pending text), clearing the pending state,
   * and setting the suggested display value to the last
   * selected state text
   */
  private _resetSelectedIndex() {
    let {
      selectedIndex,
      currentOptions
    } = this.state;
    this._comboBox.clear();
    this._clearPendingInfo();

    if (selectedIndex > 0 && selectedIndex < currentOptions.length) {
      this.setState({
        suggestedDisplayValue: currentOptions[selectedIndex].text
      });
    } else if (this.props.value) {
      // If we had a value initially, restore it
      this.setState({
        suggestedDisplayValue: this.props.value
      });
    }
  }

  /**
   * Clears the pending info state
   */
  private _clearPendingInfo() {
    this._setPendingInfo('' /* suggestedDisplayValue */, -1 /* currentPendingValueValidIndex */, '' /* currentPendingValue */);
  }

  /**
   * Set the pending info
   * @param currentPendingValue - new pending value to set
   * @param currentPendingValueValidIndex - new pending value index to set
   * @param suggestedDisplayValue - new suggest display value to set
   */
  private _setPendingInfo(currentPendingValue: string, currentPendingValueValidIndex: number, suggestedDisplayValue: string) {
    this.setState({
      currentPendingValue: currentPendingValue,
      currentPendingValueValidIndex: currentPendingValueValidIndex,
      suggestedDisplayValue: suggestedDisplayValue,
      currentPendingValueValidIndexOnHover: HoverStatus.default
    });
  }

  /**
   * Set the pending info from the given index
   * @param index - the index to set the pending info from
   */
  private _setPendingInfoFromIndex(index: number) {
    let {
      currentOptions
    } = this.state;

    if (index >= 0 && index < currentOptions.length) {
      let option = currentOptions[index];
      this._setPendingInfo(option.text, index, option.text);
    } else {
      this._clearPendingInfo();
    }

  }

  /**
   * Sets the pending info for the comboBox
   * @param index - the index to search from
   * @param searchDirection - the direction to search
   */
  private _setPendingInfoFromIndexAndDirection(index: number, searchDirection: SearchDirection) {
    let {
      isOpen,
      selectedIndex,
      currentOptions
    } = this.state;

    index = this._getNextSelectableIndex(index, searchDirection);
    if (this._indexWithinBounds(currentOptions, index)) {
      this._setPendingInfoFromIndex(index);
    }
  }

  /**
   * Sets the isOpen state and updates focusInputAfterClose
   */
  private _setOpenStateAndFocusOnClose(isOpen: boolean, focusInputAfterClose: boolean) {
    this._focusInputAfterClose = focusInputAfterClose;
    this.setState({
      isOpen: isOpen
    });
  }

  /**
   * Handle keydown on the input
   * @param ev - The keyboard event that was fired
   */
  @autobind
  private _onInputKeyDown(ev: React.KeyboardEvent<HTMLElement | BaseAutoFill>) {
    let {
      disabled,
      allowFreeform,
      autoComplete
    } = this.props;
    let {
      isOpen,
      currentPendingValueValidIndex,
      currentOptions,
      currentPendingValueValidIndexOnHover
    } = this.state;

    if (disabled) {
      this._handleInputWhenDisabled(ev);
      return;
    }

    let index = this._getPendingSelectedIndex(false /* includeCurrentPendingValue */);

    switch (ev.which) {
      case KeyCodes.enter:
        // On enter submit the pending value
        this._submitPendingValue();

        // if we are open or
        // if we are not allowing freeform or
        // our we have no pending value
        // and no valid pending index
        // flip the open state
        if ((isOpen ||
          ((!allowFreeform ||
            this.state.currentPendingValue === undefined ||
            this.state.currentPendingValue === null ||
            this.state.currentPendingValue.length <= 0) &&
            this.state.currentPendingValueValidIndex < 0))) {
          this.setState({
            isOpen: !isOpen
          });
        }

        // Allow TAB to propigate
        if (ev.which as number === KeyCodes.tab) {
          return;
        }
        break;

      case KeyCodes.tab:
        // On enter submit the pending value
        this._submitPendingValue();

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
        }
        break;

      case KeyCodes.up:
        // if we are in clearAll state (e.g. the user as hovering
        // and has since mousedOut of the menu items),
        // go to the last index
        if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
          index = this.state.currentOptions.length;
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
        // or meta key and we are current open, let's close the menu
        if ((ev.altKey || ev.metaKey) && isOpen) {
          this._setOpenStateAndFocusOnClose(!isOpen, true /* focusInputAfterClose */);
        }

        // If we are not allowing freeform and
        // allowing autoComplete, handle the input here
        // since we have marked the input as readonly
        if (!allowFreeform && autoComplete === 'on') {
          this._onInputChange(String.fromCharCode(ev.which));
          break;
        }

        // allow the key to propigate by default
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  /**
   * Handle keyup on the input
   * @param ev - the keyboard event that was fired
   */
  @autobind
  private _onInputKeyUp(ev: React.KeyboardEvent<HTMLElement | BaseAutoFill>) {
    let {
      disabled,
      allowFreeform,
      autoComplete
    } = this.props;

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
          let isOpen = this.state.isOpen;
          this._setOpenStateAndFocusOnClose(!isOpen, !!isOpen);
          return;
        }
        break;

      default:
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onOptionMouseEnter(index: number) {
    if (!this._isScrollIdle) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: index
    });
  }

  private _onOptionMouseMove(index: number) {
    if (!this._isScrollIdle || this.state.currentPendingValueValidIndexOnHover === index) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: index
    });
  }

  private _onOptionMouseLeave = () => {
    if (!this._isScrollIdle) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: HoverStatus.clearAll
    });
  }

  /**
   * Handle dismissing the menu and
   * eating the required key event when disabled
   * @param ev - the keyboard event that was fired
   */
  private _handleInputWhenDisabled(ev: React.KeyboardEvent<HTMLElement | BaseAutoFill> | null) {
    // If we are disabled, close the menu (if needed)
    // and eat all keystokes other than TAB or ESC
    if (this.props.disabled) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }

      // When disabled stop propagation and prevent default
      // of the event unless we have a tab, escape, or function key
      if (ev !== null &&
        ev.which !== KeyCodes.tab &&
        ev.which !== KeyCodes.escape &&
        (ev.which < 112 /* F1 */ || ev.which > 123 /* F12 */)) {
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
  @autobind
  private _onComboBoxClick() {
    let { disabled } = this.props;
    let { isOpen } = this.state;

    if (!disabled) {
      this._setOpenStateAndFocusOnClose(!isOpen, false /* focusInputAfterClose */);
    }
  }

  /**
 * Get the styles for the current option.
 * @param item Item props for the current option
 */
  private _getCaretButtonStyles() {
    const { caretDownButtonStyles: customCaretDownButtonStyles } = this.props;
    return getCaretDownButtonStyles(this.props.theme!, customCaretDownButtonStyles);
  }

  /**
   * Get the styles for the current option.
   * @param item Item props for the current option
   */
  private _getCurrentOptionStyles(item: IComboBoxOption) {
    const { comboBoxOptionStyles: customStylesForAllOptions } = this.props;
    const { styles: customStylesForCurrentOption } = item;

    return getOptionStyles(this.props.theme!, customStylesForAllOptions, customStylesForCurrentOption);
  }
}
