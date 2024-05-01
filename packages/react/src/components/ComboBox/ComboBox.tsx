import * as React from 'react';
import { Autofill } from '../../Autofill';
import {
  initializeComponentRef,
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
  shallowCompare,
  mergeAriaAttributeValues,
  warnMutuallyExclusive,
  Async,
  EventGroup,
  getPropsWithDefaults,
} from '../../Utilities';
import { Callout, DirectionalHint } from '../../Callout';
import { Checkbox } from '../../Checkbox';
import { getCaretDownButtonStyles, getOptionStyles, getStyles } from './ComboBox.styles';
import { getClassNames, getComboBoxOptionClassNames } from './ComboBox.classNames';
import { Label } from '../../Label';
import { SelectableOptionMenuItemType, getAllSelectedOptions } from '../../SelectableOption';
import { BaseButton, Button, CommandButton, IconButton } from '../../Button';
import { useMergedRefs } from '@fluentui/react-hooks';
import type { IAutofill } from '../../Autofill';
import type { IRenderFunction } from '../../Utilities';
import type { IComboBoxClassNames } from './ComboBox.classNames';
import type {
  IComboBoxOption,
  IComboBoxOptionStyles,
  IComboBoxProps,
  IOnRenderComboBoxLabelProps,
  IComboBox,
} from './ComboBox.types';
import type { IButtonStyles } from '../../Button';
import type { ICalloutProps } from '../../Callout';
import { getChildren } from '@fluentui/utilities';
import { WindowContext } from '@fluentui/react-window-provider';
import { getDocumentEx } from '../../utilities/dom';

export interface IComboBoxState {
  /** The open state */
  isOpen?: boolean;

  /** The focused state of the combo box */
  focusState?: 'none' | 'focused' | 'focusing';

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

  /**
   * The id of the current focused combo item, otherwise the id of the currently selected element,
   * null otherwise
   */
  ariaActiveDescendantValue?: string;
}

enum SearchDirection {
  backward = -1,
  none = 0,
  forward = 1,
}

enum HoverStatus {
  /** Used when the user was hovering and has since moused out of the menu items */
  clearAll = -2,
  /** Default "normal" state, when no hover has happened or a hover is in progress */
  default = -1,
}

const ScrollIdleDelay = 250; /* ms */
const TouchIdleDelay = 500; /* ms */

/**
 * This is used to clear any pending autocomplete text (used when autocomplete is true and
 * allowFreeform is false)
 */
const ReadOnlyPendingAutoCompleteTimeout = 1000; /* ms */

interface IComboBoxOptionWrapperProps extends IComboBoxOption {
  /** True if the option is currently selected */
  isSelected: boolean;

  /** True if the option is currently checked (multi-select) */
  isChecked: boolean;

  /** True if the option is currently indeterminate (multi-select select all option) */
  isIndeterminate: boolean;

  /**
   * A function that returns the children of the OptionWrapper. We pass this in as a function to ensure that
   * children methods don't get called unnecessarily if the component doesn't need to be updated. This leads
   * to a significant performance increase in ComboBoxes with many options and/or complex onRenderOption functions
   */
  render: () => JSX.Element;
}

/**
 * Internal component that is used to wrap all ComboBox options.
 * This is used to customize when we want to re-render components,
 * so we don't re-render every option every time render is executed.
 */
const ComboBoxOptionWrapper = React.memo(
  ({ render }: IComboBoxOptionWrapperProps) => render(),
  (
    { render: oldRender, ...oldProps }: IComboBoxOptionWrapperProps,
    { render: newRender, ...newProps }: IComboBoxOptionWrapperProps,
  ) =>
    // The render function will always be different, so we ignore that prop
    shallowCompare(oldProps, newProps),
);

const COMPONENT_NAME = 'ComboBox';
const DEFAULT_PROPS: Partial<IComboBoxProps> = {
  options: [],
  allowFreeform: false,
  autoComplete: 'on',
  buttonIconProps: { iconName: 'ChevronDown' },
};

function useOptionsState({ options, defaultSelectedKey, selectedKey }: IComboBoxProps) {
  /** The currently selected indices */
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>(() =>
    getSelectedIndices(options, buildDefaultSelectedKeys(defaultSelectedKey, selectedKey)),
  );
  /** The options currently available for the callout */
  const [currentOptions, setCurrentOptions] = React.useState<IComboBoxOption[]>(options);
  /** This value is used for the autocomplete hint value */
  const [suggestedDisplayValue, setSuggestedDisplayValue] = React.useState<string>();

  React.useEffect(() => {
    if (selectedKey !== undefined) {
      const selectedKeys: string[] | number[] = buildSelectedKeys(selectedKey);
      const indices: number[] = getSelectedIndices(options, selectedKeys);

      setSelectedIndices(indices);
    }
    setCurrentOptions(options);
  }, [options, selectedKey]);

  React.useEffect(() => {
    if (selectedKey === null) {
      setSuggestedDisplayValue(undefined);
    }
  }, [selectedKey]);

  return [
    selectedIndices,
    setSelectedIndices,
    currentOptions,
    setCurrentOptions,
    suggestedDisplayValue,
    setSuggestedDisplayValue,
  ] as const;
}

export const ComboBox: React.FunctionComponent<IComboBoxProps> = React.forwardRef<HTMLDivElement, IComboBoxProps>(
  (propsWithoutDefaults: IComboBoxProps, forwardedRef: React.Ref<HTMLDivElement>) => {
    const { ref, ...props } = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);
    const rootRef = React.useRef<HTMLDivElement>(null);

    const mergedRootRef = useMergedRefs(rootRef, forwardedRef);

    const [
      selectedIndices,
      setSelectedIndices,
      currentOptions,
      setCurrentOptions,
      suggestedDisplayValue,
      setSuggestedDisplayValue,
    ] = useOptionsState(props);

    return (
      <ComboBoxInternal
        {...props}
        hoisted={{
          mergedRootRef,
          rootRef,
          selectedIndices,
          setSelectedIndices,
          currentOptions,
          setCurrentOptions,
          suggestedDisplayValue,
          setSuggestedDisplayValue,
        }}
      />
    );
  },
);
ComboBox.displayName = COMPONENT_NAME;

interface IComboBoxInternalProps extends Omit<IComboBoxProps, 'ref'> {
  hoisted: {
    mergedRootRef: React.Ref<HTMLDivElement>;
    rootRef: React.RefObject<HTMLDivElement>;
    selectedIndices: number[];
    currentOptions: IComboBoxOption[];
    suggestedDisplayValue?: string;
    setSelectedIndices: React.Dispatch<React.SetStateAction<number[]>>;
    setCurrentOptions: React.Dispatch<React.SetStateAction<IComboBoxOption[]>>;
    setSuggestedDisplayValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
}

/**
 * Depth-first search to find the first descendant element where the match function returns true.
 * @param element - element to start searching at
 * @param match - the function that determines if the element is a match
 * @returns the matched element or null no match was found
 */
function findFirstDescendant(element: HTMLElement, match: (element: HTMLElement) => boolean): HTMLElement | null {
  const children = getChildren(element);

  // For loop is used because forEach cannot be stopped.
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (match(child)) {
      return child;
    }
    const candidate = findFirstDescendant(child, match);
    if (candidate) {
      return candidate;
    }
  }
  return null;
}

@customizable('ComboBox', ['theme', 'styles'], true)
class ComboBoxInternal extends React.Component<IComboBoxInternalProps, IComboBoxState> implements IComboBox {
  public static contextType = WindowContext;

  /** The input aspect of the combo box */
  private _autofill = React.createRef<IAutofill>();

  /** The wrapping div of the input and button */
  private _comboBoxWrapper = React.createRef<HTMLDivElement>();

  /** The callout element */
  private _comboBoxMenu = React.createRef<HTMLDivElement>();

  /** The menu item element that is currently selected */
  private _selectedElement = React.createRef<HTMLSpanElement>();

  /** The base id for the ComboBox */
  private _id: string;

  /**
   * After a character is inserted when autocomplete is true and allowFreeform is false,
   * remember the task that will clear the pending string of characters.
   */
  private _autoCompleteTimeout: number | undefined;

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

  private _async: Async;
  private _events: EventGroup;

  // props to prevent dismiss on scroll/resize immediately after opening
  private _overrideScrollDismiss = false;
  private _overrideScrollDimissTimeout: number;

  constructor(props: IComboBoxInternalProps) {
    super(props);

    initializeComponentRef(this);
    this._async = new Async(this);
    this._events = new EventGroup(this);

    warnMutuallyExclusive(COMPONENT_NAME, props, {
      defaultSelectedKey: 'selectedKey',
      text: 'defaultSelectedKey',
      selectedKey: 'value',
      dropdownWidth: 'useComboBoxAsMenuWidth',
      ariaLabel: 'label',
    });

    this._id = props.id || getId('ComboBox');

    this._isScrollIdle = true;
    this._processingTouch = false;
    this._gotMouseMove = false;
    this._processingClearPendingInfo = false;

    this.state = {
      isOpen: false,
      focusState: 'none',
      currentPendingValueValidIndex: -1,
      currentPendingValue: undefined,
      currentPendingValueValidIndexOnHover: HoverStatus.default,
    };
  }

  /**
   * All selected options
   */
  public get selectedOptions(): IComboBoxOption[] {
    const { currentOptions, selectedIndices } = this.props.hoisted;

    return getAllSelectedOptions(currentOptions, selectedIndices!);
  }

  public componentDidMount(): void {
    if (this._comboBoxWrapper.current && !this.props.disabled) {
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

  public componentDidUpdate(prevProps: IComboBoxInternalProps, prevState: IComboBoxState) {
    const {
      allowFreeform,
      allowFreeInput,
      text,
      onMenuOpen,
      onMenuDismissed,
      hoisted: { currentOptions, selectedIndices },
    } = this.props;
    const { currentPendingValue, currentPendingValueValidIndex, isOpen } = this.state;

    // If we are newly open or are open and the pending valid index changed,
    // make sure the currently selected/pending option is scrolled into view
    if (isOpen && (!prevState.isOpen || prevState.currentPendingValueValidIndex !== currentPendingValueValidIndex)) {
      // Need this timeout so that the selectedElement ref is correctly updated
      this._async.setTimeout(() => this._scrollIntoView(), 0);
    }

    const doc = getDocumentEx(this.context);
    // if an action is taken that put focus in the ComboBox
    // and If we are open or we are just closed, shouldFocusAfterClose is set,
    // but we are not the activeElement set focus on the input
    if (
      this._hasFocus() &&
      (isOpen ||
        (prevState.isOpen &&
          !isOpen &&
          this._focusInputAfterClose &&
          this._autofill.current &&
          doc?.activeElement !== this._autofill.current.inputElement))
    ) {
      this.focus(undefined /*shouldOpenOnFocus*/, true /*useFocusAsync*/);
    }

    // If we should focusAfterClose AND
    //   just opened/closed the menu OR
    //   are focused AND
    //     updated the selectedIndex with the menu closed OR
    //     are not allowing freeform or free input OR
    //     the value changed
    // we need to set selection
    if (
      this._focusInputAfterClose &&
      ((prevState.isOpen && !isOpen) ||
        (this._hasFocus() &&
          ((!isOpen &&
            !this.props.multiSelect &&
            prevProps.hoisted.selectedIndices &&
            selectedIndices &&
            prevProps.hoisted.selectedIndices[0] !== selectedIndices[0]) ||
            (!allowFreeform && !allowFreeInput) ||
            text !== prevProps.text)))
    ) {
      this._onFocus();
    }

    this._notifyPendingValueChanged(prevState);

    if (isOpen && !prevState.isOpen) {
      // handle dismiss buffer after suggestions are opened
      this._overrideScrollDismiss = true;
      this._async.clearTimeout(this._overrideScrollDimissTimeout);
      this._overrideScrollDimissTimeout = this._async.setTimeout(() => {
        this._overrideScrollDismiss = false;
      }, 100);

      onMenuOpen?.();
    }

    if (!isOpen && prevState.isOpen && onMenuDismissed) {
      onMenuDismissed();
    }

    let newCurrentPendingValueValidIndex = currentPendingValueValidIndex;
    const options = currentOptions.map((item, index) => ({ ...item, index }));

    // If currentOptions differs from the previous currentOptions we need to update the currentPendingValueValidIndex
    // otherwise, it will be out of sync with the currentOptions. This can happen when the options are filtered.
    if (!shallowCompare(prevProps.hoisted.currentOptions, currentOptions) && currentPendingValue) {
      newCurrentPendingValueValidIndex =
        this.props.allowFreeform || this.props.allowFreeInput
          ? this._processInputChangeWithFreeform(currentPendingValue)
          : this._updateAutocompleteIndexWithoutFreeform(currentPendingValue);
    }

    let descendantText = undefined;

    if (isOpen && this._hasFocus() && newCurrentPendingValueValidIndex !== -1) {
      descendantText =
        options[newCurrentPendingValueValidIndex].id ?? this._id + '-list' + newCurrentPendingValueValidIndex;
    } else if (isOpen && selectedIndices.length) {
      descendantText = options[selectedIndices[0]]?.id ?? this._id + '-list' + selectedIndices[0];
    }

    if (descendantText !== this.state.ariaActiveDescendantValue) {
      this.setState({
        ariaActiveDescendantValue: descendantText,
      });
    }
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    this._events.dispose();
  }

  // Primary Render
  public render(): JSX.Element {
    const id = this._id;
    const errorMessageId = id + '-error';
    const {
      className,
      disabled,
      required,
      errorMessage,
      onRenderContainer = this._onRenderContainer,
      onRenderLabel = this._onRenderLabel,
      onRenderList = this._onRenderList,
      onRenderItem = this._onRenderItem,
      onRenderOption = this._onRenderOptionContent,
      allowFreeform,
      styles: customStyles,
      theme,
      persistMenu,
      multiSelect,
      hoisted: { suggestedDisplayValue, selectedIndices, currentOptions },
    } = this.props;
    const { isOpen } = this.state;
    this._currentVisibleValue = this._getVisibleValue();

    // Single select is already accessible since the whole text is selected
    // when focus enters the input. Since multiselect appears to clear the input
    // it needs special accessible text
    const multiselectAccessibleText = multiSelect
      ? this._getMultiselectDisplayString(selectedIndices, currentOptions, suggestedDisplayValue)
      : undefined;

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties, [
      'onChange',
      'value',
      'aria-describedby',
      'aria-labelledby',
    ]);

    const hasErrorMessage = errorMessage && errorMessage.length > 0 ? true : false;

    this._classNames = this.props.getClassNames
      ? this.props.getClassNames(
          theme!,
          !!isOpen,
          !!disabled,
          !!required,
          !!this._hasFocus(),
          !!allowFreeform,
          !!hasErrorMessage,
          className,
        )
      : getClassNames(
          getStyles(theme!, customStyles),
          className!,
          !!isOpen,
          !!disabled,
          !!required,
          !!this._hasFocus(),
          !!allowFreeform,
          !!hasErrorMessage,
        );

    const comboBoxWrapper = this._renderComboBoxWrapper(multiselectAccessibleText, errorMessageId);

    return (
      <div {...divProps} ref={this.props.hoisted.mergedRootRef} className={this._classNames.container}>
        {onRenderLabel({ props: this.props, multiselectAccessibleText }, this._onRenderLabel)}
        {comboBoxWrapper}
        {(persistMenu || isOpen) &&
          onRenderContainer(
            {
              ...this.props,
              onRenderList,
              onRenderItem,
              onRenderOption,
              options: currentOptions.map((item, index) => ({ ...item, index })),
              onDismiss: this._onDismiss,
            },
            this._onRenderContainer,
          )}
        {hasErrorMessage && (
          <div role="alert" id={errorMessageId} className={this._classNames.errorMessage}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  /**
   * {@inheritdoc}
   */
  public focus = (shouldOpenOnFocus?: boolean, useFocusAsync?: boolean): void => {
    if (this.props.disabled) {
      return;
    }

    if (this._autofill.current) {
      if (useFocusAsync) {
        focusAsync(this._autofill.current);
      } else {
        this._autofill.current.focus();
      }

      if (shouldOpenOnFocus) {
        this.setState({
          isOpen: true,
        });
      }
    }

    // Programmatically setting focus means that there is nothing else that needs to be done
    // Focus is now contained
    if (!this._hasFocus()) {
      this.setState({ focusState: 'focused' });
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
   * Checks/updates the input value to set, if needed
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

    return normalizeToString(this._currentVisibleValue);
  };

  private _renderComboBoxWrapper = (
    multiselectAccessibleText: string | undefined,
    errorMessageId: string,
  ): JSX.Element => {
    const {
      label,
      disabled,
      ariaLabel,
      ariaDescribedBy = this.props['aria-describedby'],
      required,
      errorMessage,
      buttonIconProps,
      isButtonAriaHidden,
      title,
      placeholder: placeholderProp,
      tabIndex,
      autofill,
      iconButtonProps,
      hoisted: { suggestedDisplayValue },
    } = this.props;

    const { ariaActiveDescendantValue, isOpen } = this.state;

    // If the combo box has focus, is multiselect, and has a display string, then use that placeholder
    // so that the selected items don't appear to vanish. This is not ideal but it's the only reasonable way
    // to correct the behavior where the input is cleared so the user can type. If a full refactor is done, then this
    // should be removed and the multiselect combo box should behave like a picker.
    const placeholder =
      this._hasFocus() && this.props.multiSelect && multiselectAccessibleText
        ? multiselectAccessibleText
        : placeholderProp;

    const labelledBy = [this.props['aria-labelledby'], label && this._id + '-label'].join(' ').trim();
    const labelProps = {
      'aria-labelledby': labelledBy ? labelledBy : undefined,
      'aria-label': ariaLabel && !label ? ariaLabel : undefined,
    };

    return (
      <div
        data-ktp-target={true}
        ref={this._comboBoxWrapper}
        id={this._id + 'wrapper'}
        className={this._classNames.root}
        aria-owns={isOpen ? this._id + '-list' : undefined}
      >
        <Autofill
          data-ktp-execute-target={true}
          data-is-interactable={!disabled}
          componentRef={this._autofill}
          id={this._id + '-input'}
          className={this._classNames.input}
          type="text"
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onKeyDown={this._onInputKeyDown}
          onKeyUp={this._onInputKeyUp}
          onClick={this._onAutofillClick}
          onTouchStart={this._onTouchStart}
          onInputValueChange={this._onInputChange}
          aria-expanded={isOpen}
          aria-autocomplete={this._getAriaAutoCompleteValue()}
          role="combobox"
          readOnly={disabled}
          {...labelProps}
          aria-describedby={
            errorMessage !== undefined ? mergeAriaAttributeValues(ariaDescribedBy, errorMessageId) : ariaDescribedBy
          }
          aria-activedescendant={ariaActiveDescendantValue}
          aria-required={required}
          aria-disabled={disabled}
          aria-controls={isOpen ? this._id + '-list' : undefined}
          spellCheck={false}
          defaultVisibleValue={this._currentVisibleValue}
          suggestedDisplayValue={suggestedDisplayValue}
          updateValueInWillReceiveProps={this._onUpdateValueInAutofillWillReceiveProps}
          shouldSelectFullInputValueInComponentDidUpdate={
            this._onShouldSelectFullInputValueInAutofillComponentDidUpdate
          }
          title={title}
          preventValueSelection={!this._hasFocus()}
          placeholder={placeholder}
          tabIndex={disabled ? -1 : tabIndex}
          {...autofill}
        />
        <IconButton
          className={'ms-ComboBox-CaretDown-button'}
          styles={this._getCaretButtonStyles()}
          role={isButtonAriaHidden ? 'presentation' : undefined}
          aria-hidden={isButtonAriaHidden}
          {...(!isButtonAriaHidden ? labelProps : undefined)}
          data-is-focusable={false}
          tabIndex={-1}
          onClick={this._onComboBoxClick}
          onBlur={this._onBlur}
          iconProps={buttonIconProps}
          disabled={disabled}
          checked={isOpen}
          {...iconButtonProps}
        />
      </div>
    );
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
    return this._currentVisibleValue === this.props.hoisted.suggestedDisplayValue;
  };

  /**
   * Get the correct value to pass to the input
   * to show to the user based off of the current props and state
   * @returns the value to pass to the input
   */
  private _getVisibleValue = (): string | undefined => {
    const {
      text,
      allowFreeform,
      allowFreeInput,
      autoComplete,
      hoisted: { suggestedDisplayValue, selectedIndices, currentOptions },
    } = this.props;
    const { currentPendingValueValidIndex, currentPendingValue, isOpen } = this.state;

    const currentPendingIndexValid = indexWithinBounds(currentOptions, currentPendingValueValidIndex);

    // If the user passed is a value prop, use that
    // unless we are open and have a valid current pending index
    if (
      !(isOpen && currentPendingIndexValid) &&
      (text || text === '') &&
      (currentPendingValue === null || currentPendingValue === undefined)
    ) {
      return text;
    }

    if (this.props.multiSelect) {
      // Multi-select
      if (this._hasFocus()) {
        let index = -1;
        if (autoComplete === 'on' && currentPendingIndexValid) {
          index = currentPendingValueValidIndex;
        }
        return this._getPendingString(currentPendingValue, currentOptions, index);
      } else {
        return this._getMultiselectDisplayString(selectedIndices, currentOptions, suggestedDisplayValue);
      }
    } else {
      // Single-select
      let index: number = this._getFirstSelectedIndex();
      if (allowFreeform || allowFreeInput) {
        // If we are allowing freeform/free input and autocomplete is also true
        // and we've got a pending value that matches an option, remember
        // the matched option's index
        if (autoComplete === 'on' && currentPendingIndexValid) {
          index = currentPendingValueValidIndex;
        }

        // Since we are allowing freeform, if there is currently a pending value, use that
        // otherwise use the index determined above (falling back to '' if we did not get a valid index)
        return this._getPendingString(currentPendingValue, currentOptions, index);
      } else {
        // If we are not allowing freeform and have a valid index that matches the pending value,
        // we know we will need some version of the pending value
        if (currentPendingIndexValid && autoComplete === 'on') {
          // If autoComplete is on, return the raw pending value, otherwise remember
          // the matched option's index
          index = currentPendingValueValidIndex;
          return normalizeToString(currentPendingValue);
        } else if (!this.state.isOpen && currentPendingValue) {
          return indexWithinBounds(currentOptions, index)
            ? currentPendingValue
            : normalizeToString(suggestedDisplayValue);
        } else {
          return indexWithinBounds(currentOptions, index)
            ? getPreviewText(currentOptions[index])
            : normalizeToString(suggestedDisplayValue);
        }
      }
    }
  };

  private _getPendingString(
    currentPendingValue: string | null | undefined,
    currentOptions: IComboBoxOption[],
    index: number,
  ) {
    return currentPendingValue !== null && currentPendingValue !== undefined
      ? currentPendingValue
      : indexWithinBounds(currentOptions, index)
      ? getPreviewText(currentOptions[index])
      : '';
  }

  /**
   * Returns a string that concatenates all of the selected values
   * for multiselect combo box.
   */
  private _getMultiselectDisplayString(
    selectedIndices: number[] | undefined,
    currentOptions: IComboBoxOption[],
    suggestedDisplayValue: string | undefined,
  ) {
    const displayValues = [];
    for (let idx = 0; selectedIndices && idx < selectedIndices.length; idx++) {
      const index: number = selectedIndices[idx];
      if (currentOptions[index].itemType !== SelectableOptionMenuItemType.SelectAll) {
        displayValues.push(
          indexWithinBounds(currentOptions, index)
            ? currentOptions[index].text
            : normalizeToString(suggestedDisplayValue),
        );
      }
    }
    const { multiSelectDelimiter = ', ' } = this.props;
    return displayValues.join(multiSelectDelimiter);
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

    if (this.props.onInputValueChange) {
      this.props.onInputValueChange(updatedValue);
    }

    this.props.allowFreeform || this.props.allowFreeInput
      ? this._processInputChangeWithFreeform(updatedValue)
      : this._processInputChangeWithoutFreeform(updatedValue);
  };

  /**
   * Do not dismiss if the window resizes or scrolls within 100ms of opening
   * This prevents the Android issue where pickers immediately dismiss on open, because the keyboard appears
   * @param ev - the event triggering the dismiss check
   * @returns a boolean indicating whether the callout dismissal should be prevented
   */
  private _preventDismissOnScrollOrResize(ev: Event) {
    // default to passed-in preventDismiss
    const { calloutProps } = this.props;
    if (calloutProps?.preventDismissOnEvent) {
      return calloutProps.preventDismissOnEvent(ev);
    }

    if (this._overrideScrollDismiss && (ev.type === 'scroll' || ev.type === 'resize')) {
      return true;
    }

    return false;
  }

  /**
   * Process the new input's new value when the combo box allows freeform entry
   * @param updatedValue - the input's newly changed value
   * @returns the index of the matched option, -1 if no match was found
   */
  private _processInputChangeWithFreeform(updatedValue: string): number {
    const { currentOptions } = this.props.hoisted;
    let newCurrentPendingValueValidIndex = -1;

    // if the new value is empty, see if we have an exact match and then set the pending info
    if (updatedValue === '') {
      const items = currentOptions
        .map((item, index) => ({ ...item, index }))
        .filter(option => isNormalOption(option) && !option.disabled && getPreviewText(option) === updatedValue);

      // if we found a match remember the index
      if (items.length === 1) {
        newCurrentPendingValueValidIndex = items[0].index;
      }

      this._setPendingInfo(updatedValue, newCurrentPendingValueValidIndex, updatedValue);
      return newCurrentPendingValueValidIndex;
    }

    // Remember the original value and then make the value lowercase for comparison
    const originalUpdatedValue: string = updatedValue;
    // Make the value lowercase for comparison if caseSensitive is false
    updatedValue = this._adjustForCaseSensitivity(updatedValue);

    let newSuggestedDisplayValue = '';

    // If autoComplete is on, attempt to find a match from the available options
    if (this.props.autoComplete === 'on') {
      // If autoComplete is on, attempt to find a match where the text of an option starts with the updated value
      const items = currentOptions
        .map((item, index) => ({ ...item, index }))
        .filter(
          option =>
            isNormalOption(option) &&
            !option.disabled &&
            this._adjustForCaseSensitivity(getPreviewText(option)).indexOf(updatedValue) === 0,
        );
      if (items.length > 0) {
        // use ariaLabel as the value when the option is set
        const text: string = getPreviewText(items[0]);

        // If the user typed out the complete option text, we don't need any suggested display text anymore
        newSuggestedDisplayValue = this._adjustForCaseSensitivity(text) !== updatedValue ? text : '';

        // remember the index of the match we found
        newCurrentPendingValueValidIndex = items[0].index;
      }
    } else {
      // If autoComplete is off, attempt to find a match only when the value is exactly equal to the text of an option
      const items = currentOptions
        .map((item, index) => ({ ...item, index }))
        .filter(
          option =>
            isNormalOption(option) &&
            !option.disabled &&
            this._adjustForCaseSensitivity(getPreviewText(option)) === updatedValue,
        );

      // if we found a match remember the index
      if (items.length === 1) {
        newCurrentPendingValueValidIndex = items[0].index;
      }
    }

    // Set the updated state
    this._setPendingInfo(originalUpdatedValue, newCurrentPendingValueValidIndex, newSuggestedDisplayValue);
    return newCurrentPendingValueValidIndex;
  }

  /**
   * Process the new input's new value when the combo box does not allow freeform entry
   * @param updatedValue - the input's newly changed value
   * @returns the index of the matched option
   */
  private _processInputChangeWithoutFreeform(updatedValue: string): number {
    const { currentPendingValue, currentPendingValueValidIndex } = this.state;

    if (this.props.autoComplete === 'on') {
      // If autoComplete is on while allow freeform is off,
      // we will remember the key press and build up a string to attempt to match
      // as long as characters are typed within a the timeout span of each other,
      // otherwise we will clear the string and start building a new one on the next keypress.
      // Also, only do this processing if we have a non-empty value
      if (updatedValue !== '') {
        // If we have a pending autocomplete clearing task,
        // we know that the user is typing with key press happening
        // within the timeout of each other so remove the clearing task
        // and continue building the pending value with the updated value
        if (this._autoCompleteTimeout) {
          this._async.clearTimeout(this._autoCompleteTimeout);
          this._autoCompleteTimeout = undefined;
          updatedValue = normalizeToString(currentPendingValue) + updatedValue;
        }

        const matchingIndex = this._updateAutocompleteIndexWithoutFreeform(updatedValue);

        // Schedule a timeout to clear the pending value after the timeout span
        this._autoCompleteTimeout = this._async.setTimeout(() => {
          this._autoCompleteTimeout = undefined;
        }, ReadOnlyPendingAutoCompleteTimeout);

        return matchingIndex;
      }
    }

    // If we get here, autoComplete is off.
    // Remember we are not allowing freeform, so at this point, if we have a pending valid value index
    // use that; otherwise use the selectedIndex
    const index = currentPendingValueValidIndex >= 0 ? currentPendingValueValidIndex : this._getFirstSelectedIndex();

    // Since we are not allowing freeform, we need to
    // set both the pending and suggested values/index
    // to allow us to select all content in the input to
    // give the illusion that we are readonly (e.g. freeform off)
    this._setPendingInfoFromIndex(index);
    return index;
  }

  private _updateAutocompleteIndexWithoutFreeform(updatedValue: string): number {
    const { currentOptions } = this.props.hoisted;
    const originalUpdatedValue: string = updatedValue;
    updatedValue = this._adjustForCaseSensitivity(updatedValue);

    // If autoComplete is on, attempt to find a match where the text of an option starts with the updated value
    const items = currentOptions
      .map((item, i) => ({ ...item, index: i }))

      .filter(
        option =>
          isNormalOption(option) &&
          !option.disabled &&
          this._adjustForCaseSensitivity(option.text).indexOf(updatedValue) === 0,
      );

    // If we found a match, update the state
    if (items.length > 0) {
      this._setPendingInfo(originalUpdatedValue, items[0].index, getPreviewText(items[0]));
      return items[0].index;
    }

    return -1;
  }

  private _getFirstSelectedIndex(): number {
    const { selectedIndices } = this.props.hoisted;
    return selectedIndices?.length ? selectedIndices[0] : -1;
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
    const { currentOptions } = this.props.hoisted;

    let newIndex = index + searchDirection;

    newIndex = Math.max(0, Math.min(currentOptions.length - 1, newIndex));

    if (!indexWithinBounds(currentOptions, newIndex)) {
      return -1;
    }

    const option: IComboBoxOption = currentOptions[newIndex];

    if (!isSelectableOption(option) || option.hidden === true) {
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
  private _setSelectedIndex(
    index: number,
    submitPendingValueEvent: React.SyntheticEvent<any>,
    searchDirection: SearchDirection = SearchDirection.none,
  ): void {
    const {
      onChange,
      onPendingValueChanged,
      hoisted: { selectedIndices: initialIndices, currentOptions },
    } = this.props;

    // Clone currentOptions and selectedIndices so we don't mutate state
    let selectedIndices = initialIndices ? initialIndices.slice() : [];
    let changedOptions = currentOptions.slice();

    // Find the next selectable index, if searchDirection is none
    // we will get our starting index back
    index = this._getNextSelectableIndex(index, searchDirection);

    if (!indexWithinBounds(currentOptions, index)) {
      return;
    }

    // Are we at a new index? If so, update the state, otherwise
    // there is nothing to do
    if (
      this.props.multiSelect ||
      selectedIndices.length < 1 ||
      (selectedIndices.length === 1 && selectedIndices[0] !== index)
    ) {
      const option: IComboBoxOption = { ...currentOptions[index] };
      // if option doesn't existing, or option is disabled, we noop
      if (!option || option.disabled) {
        return;
      }
      if (this.props.multiSelect) {
        // Setting the initial state of option.selected in Multi-select combo box by checking the
        // selectedIndices array and overriding the undefined issue
        option.selected = option.selected !== undefined ? !option.selected : selectedIndices.indexOf(index) < 0;

        // handle changing all options if SelectAll is changed
        if (option.itemType === SelectableOptionMenuItemType.SelectAll) {
          selectedIndices = [];
          // if select all is set to checked, push all selectable option indices
          if (option.selected) {
            currentOptions.forEach((currentOption, i) => {
              if (!currentOption.disabled && isSelectableOption(currentOption)) {
                selectedIndices.push(i);
                changedOptions[i] = { ...currentOption, selected: true };
              }
            });
          }
          // otherwise un-check all options
          else {
            changedOptions = currentOptions.map(currentOption => ({ ...currentOption, selected: false }));
          }
        }
        // otherwise update the individual option
        else {
          if (option.selected && selectedIndices.indexOf(index) < 0) {
            selectedIndices.push(index);
          } else if (!option.selected && selectedIndices.indexOf(index) >= 0) {
            selectedIndices = selectedIndices.filter((value: number) => value !== index);
          }
          changedOptions[index] = option;

          // If SelectAll exists and another option was toggled, update the SelectAll option's state
          const selectAllOption = changedOptions.filter(o => o.itemType === SelectableOptionMenuItemType.SelectAll)[0];
          if (selectAllOption) {
            const selectAllState = this._isSelectAllChecked(selectedIndices);
            const selectAllIndex = changedOptions.indexOf(selectAllOption);
            if (selectAllState) {
              selectedIndices.push(selectAllIndex);
              changedOptions[selectAllIndex] = { ...selectAllOption, selected: true };
            } else {
              selectedIndices = selectedIndices.filter((value: number) => value !== selectAllIndex);
              changedOptions[selectAllIndex] = { ...selectAllOption, selected: false };
            }
          }
        }
      } else {
        selectedIndices[0] = index;
      }

      submitPendingValueEvent.persist();

      // Only setState if combo box is uncontrolled.
      if (this.props.selectedKey || this.props.selectedKey === null) {
        // If combo box value is changed, revert preview first
        if (this._hasPendingValue && onPendingValueChanged) {
          onPendingValueChanged();
          this._hasPendingValue = false;
        }
      } else {
        this.props.hoisted.setSelectedIndices(selectedIndices);
        this.props.hoisted.setCurrentOptions(changedOptions);

        // If ComboBox value is changed, revert preview first
        if (this._hasPendingValue && onPendingValueChanged) {
          onPendingValueChanged();
          this._hasPendingValue = false;
        }
      }

      // Call onChange after state is updated
      if (onChange) {
        onChange(submitPendingValueEvent, option, index, getPreviewText(option));
      }
    }
    if (this.props.multiSelect && this.state.isOpen) {
      return;
    }
    // clear all of the pending info
    this._clearPendingInfo();
  }

  /**
   * Focus (and select) the content of the input
   * and set the focused state
   */
  private _onFocus = (): void => {
    this._autofill.current?.inputElement?.select();

    if (!this._hasFocus()) {
      this.setState({ focusState: 'focusing' });
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
      const newOptions = this.props.onResolveOptions([...this.props.hoisted.currentOptions]);

      // Check to see if the returned value is an array, if it is update the state
      // If the returned value is not an array then check to see if it's a promise or PromiseLike.
      // If it is then resolve it asynchronously.
      if (Array.isArray(newOptions)) {
        this.props.hoisted.setCurrentOptions(newOptions);
      } else if (newOptions && (newOptions as PromiseLike<IComboBoxOption[]>).then) {
        // Ensure that the promise will only use the callback if it was the most recent one
        // and update the state when the promise returns
        this._currentPromise = newOptions;
        newOptions.then((newOptionsFromPromise: IComboBoxOption[]) => {
          if (newOptions === this._currentPromise) {
            this.props.hoisted.setCurrentOptions(newOptionsFromPromise);
          }
        });
      }
    }
  };

  /**
   * OnBlur handler. Set the focused state to false
   * and submit any pending value
   */
  // eslint-disable-next-line deprecation/deprecation
  private _onBlur = (event: React.FocusEvent<HTMLElement | Autofill | BaseButton | Button>): void => {
    const doc = getDocumentEx(this.context);
    // Do nothing if the blur is coming from something
    // inside the comboBox root or the comboBox menu since
    // it we are not really blurring from the whole comboBox
    let relatedTarget = event.relatedTarget;
    if (event.relatedTarget === null) {
      // In IE11, due to lack of support, event.relatedTarget is always
      // null making every onBlur call to be "outside" of the ComboBox
      // even when it's not. Using document.activeElement is another way
      // for us to be able to get what the relatedTarget without relying
      // on the event
      relatedTarget = doc?.activeElement as Element;
    }

    if (relatedTarget) {
      const isBlurFromComboBoxTitle = this.props.hoisted.rootRef.current?.contains(relatedTarget as HTMLElement);
      const isBlurFromComboBoxMenu = this._comboBoxMenu.current?.contains(relatedTarget as HTMLElement);
      const isBlurFromComboBoxMenuAncestor =
        this._comboBoxMenu.current &&
        findElementRecursive(this._comboBoxMenu.current, (element: HTMLElement) => element === relatedTarget, doc);

      if (isBlurFromComboBoxTitle || isBlurFromComboBoxMenu || isBlurFromComboBoxMenuAncestor) {
        if (
          isBlurFromComboBoxMenuAncestor &&
          this._hasFocus() &&
          (!this.props.multiSelect || this.props.allowFreeform)
        ) {
          this._submitPendingValue(event);
        }
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    }

    if (this._hasFocus()) {
      this.setState({ focusState: 'none' });
      if (!this.props.multiSelect || this.props.allowFreeform) {
        this._submitPendingValue(event);
      }
    }
  };

  /**
   * Submit a pending value if there is one
   */
  private _submitPendingValue(submitPendingValueEvent: React.SyntheticEvent<any>): void {
    const { onChange, allowFreeform, autoComplete, multiSelect, hoisted } = this.props;
    const { currentOptions } = hoisted;
    const { currentPendingValue, currentPendingValueValidIndex, currentPendingValueValidIndexOnHover } = this.state;
    let { selectedIndices } = this.props.hoisted;

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
      if (indexWithinBounds(currentOptions, currentPendingValueValidIndex)) {
        const pendingOptionText = this._adjustForCaseSensitivity(
          getPreviewText(currentOptions[currentPendingValueValidIndex]),
        );

        const autofill = this._autofill.current;

        // By exact match, that means: our pending value is the same as the pending option text OR
        // the pending option starts with the pending value and we have an "autoComplete" selection
        // where the total length is equal to pending option length OR
        // the live value in the underlying input matches the pending option; update the state
        const adjustedCurrentPendingValue = this._adjustForCaseSensitivity(currentPendingValue);
        if (
          adjustedCurrentPendingValue === pendingOptionText ||
          (autoComplete &&
            pendingOptionText.indexOf(adjustedCurrentPendingValue) === 0 &&
            autofill?.isValueSelected &&
            currentPendingValue.length + (autofill.selectionEnd! - autofill.selectionStart!) ===
              pendingOptionText.length) ||
          (autofill?.inputElement?.value !== undefined &&
            this._adjustForCaseSensitivity(autofill.inputElement.value) === pendingOptionText)
        ) {
          this._setSelectedIndex(currentPendingValueValidIndex, submitPendingValueEvent);
          if (multiSelect && this.state.isOpen) {
            return;
          }
          this._clearPendingInfo();
          return;
        }
      }

      if (onChange) {
        if (onChange) {
          // trigger onChange to clear value
          onChange(submitPendingValueEvent, undefined, undefined, currentPendingValue);
        }
      } else {
        // If we are not controlled, create a new selected option
        const newOption: IComboBoxOption = {
          key: currentPendingValue || getId(),
          text: normalizeToString(currentPendingValue),
        };
        // If it's multiselect, set selected state to true
        if (multiSelect) {
          newOption.selected = true;
        }
        const newOptions: IComboBoxOption[] = currentOptions.concat([newOption]);
        if (selectedIndices) {
          if (!multiSelect) {
            selectedIndices = [];
          }
          selectedIndices.push(newOptions.length - 1);
        }
        hoisted.setCurrentOptions(newOptions);
        hoisted.setSelectedIndices(selectedIndices);
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
  private _onRenderContainer = (props: IComboBoxProps, defaultRender: IRenderFunction<IComboBoxProps>): JSX.Element => {
    const {
      onRenderList,
      calloutProps,
      dropdownWidth,
      dropdownMaxWidth,
      onRenderUpperContent = this._onRenderUpperContent,
      onRenderLowerContent = this._onRenderLowerContent,
      useComboBoxAsMenuWidth,
      persistMenu,
      shouldRestoreFocus = true,
    } = props;

    const { isOpen } = this.state;
    const id = this._id;

    const comboBoxMenuWidth =
      useComboBoxAsMenuWidth && this._comboBoxWrapper.current
        ? this._comboBoxWrapper.current.clientWidth + 2
        : undefined;

    return (
      <Callout
        isBeakVisible={false}
        gapSpace={0}
        doNotLayer={false}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintFixed={false}
        {...calloutProps}
        onLayerMounted={this._onLayerMounted}
        className={css(this._classNames.callout, calloutProps?.className)}
        target={this._comboBoxWrapper.current}
        onDismiss={this._onDismiss}
        onMouseDown={this._onCalloutMouseDown}
        onScroll={this._onScroll}
        setInitialFocus={false}
        calloutWidth={
          useComboBoxAsMenuWidth && this._comboBoxWrapper.current
            ? comboBoxMenuWidth && comboBoxMenuWidth
            : dropdownWidth
        }
        calloutMaxWidth={dropdownMaxWidth ? dropdownMaxWidth : comboBoxMenuWidth}
        hidden={persistMenu ? !isOpen : undefined}
        shouldRestoreFocus={shouldRestoreFocus}
        // eslint-disable-next-line react/jsx-no-bind
        preventDismissOnEvent={(ev: Event) => this._preventDismissOnScrollOrResize(ev)}
      >
        {onRenderUpperContent(this.props, this._onRenderUpperContent)}
        <div className={this._classNames.optionsContainerWrapper} ref={this._comboBoxMenu}>
          {onRenderList?.({ ...props, id }, this._onRenderList)}
        </div>
        {onRenderLowerContent(this.props, this._onRenderLowerContent)}
      </Callout>
    );
  };

  private _onCalloutLayerMounted() {
    // In persistMenu mode _onLayerMounted is only called once for the lifetime
    // of the component. Any functionality required for callout "on mount" can
    // go here so that we can also call it again during callout dismissal to reset
    // object state.
    this._gotMouseMove = false;
  }

  private _onLayerMounted = () => {
    this._onCalloutLayerMounted();

    // need to call this again here to get the correct scroll parent dimensions
    // when the callout is first opened
    this._async.setTimeout(() => {
      this._scrollIntoView();
    }, 0);

    if (this.props.calloutProps && this.props.calloutProps.onLayerMounted) {
      this.props.calloutProps.onLayerMounted();
    }
  };

  private _onRenderLabel = (onRenderLabelProps: IOnRenderComboBoxLabelProps): JSX.Element | null => {
    const { label, disabled, required } = onRenderLabelProps.props;

    if (label) {
      return (
        <Label id={this._id + '-label'} disabled={disabled} required={required} className={this._classNames.label}>
          {label}
          {onRenderLabelProps.multiselectAccessibleText && (
            <span className={this._classNames.screenReaderText}>{onRenderLabelProps.multiselectAccessibleText}</span>
          )}
        </Label>
      );
    }

    return null;
  };

  // Render List of items
  private _onRenderList = (props: IComboBoxProps): JSX.Element => {
    const { onRenderItem = this._onRenderItem, label, ariaLabel, multiSelect } = props;

    let queue: { id?: string; items: JSX.Element[] } = { items: [] };
    let renderedList: JSX.Element[] = [];

    const emptyQueue = (): void => {
      const newGroup = queue.id
        ? [
            <div role="group" key={queue.id} aria-labelledby={queue.id}>
              {queue.items}
            </div>,
          ]
        : queue.items;

      renderedList = [...renderedList, ...newGroup];
      // Flush items and id
      queue = { items: [] };
    };

    const placeRenderedOptionIntoQueue = (item: IComboBoxOption, index: number) => {
      /*
        Case Header
          empty queue if it's not already empty
          ensure unique ID for header and set queue ID
          push header into queue
        Case Divider
          push divider into queue if not first item
          empty queue if not already empty
        Default
          push item into queue
      */
      switch (item.itemType) {
        case SelectableOptionMenuItemType.Header:
          queue.items.length > 0 && emptyQueue();

          const id = this._id + item.key;
          queue.items.push(onRenderItem({ id, ...item, index }, this._onRenderItem)!);
          queue.id = id;
          break;
        case SelectableOptionMenuItemType.Divider:
          index > 0 && queue.items.push(onRenderItem({ ...item, index }, this._onRenderItem)!);

          queue.items.length > 0 && emptyQueue();
          break;
        default:
          queue.items.push(onRenderItem({ ...item, index }, this._onRenderItem)!);
      }
    };

    // Place options into the queue. Queue will be emptied anytime a Header or Divider is encountered
    props.options.forEach((item: IComboBoxOption, index: number) => {
      placeRenderedOptionIntoQueue(item, index);
    });

    // Push remaining items into all renderedList
    queue.items.length > 0 && emptyQueue();

    const id = this._id;
    return (
      <div
        id={id + '-list'}
        className={this._classNames.optionsContainer}
        aria-labelledby={label && id + '-label'}
        aria-label={ariaLabel && !label ? ariaLabel : undefined}
        aria-multiselectable={multiSelect ? 'true' : undefined}
        role="listbox"
      >
        {renderedList}
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

  // Default _onRenderUpperContent function returns nothing
  private _onRenderUpperContent = (): null => {
    return null;
  };

  // Render separator
  private _renderSeparator(item: IComboBoxOption): JSX.Element | null {
    const { index, key } = item;

    if (index && index > 0) {
      return <div role="presentation" key={key} className={this._classNames.divider} />;
    }
    return null;
  }

  private _renderHeader(item: IComboBoxOption): JSX.Element {
    const { onRenderOption = this._onRenderOptionContent } = this.props;

    return (
      <div id={item.id} key={item.key} className={this._classNames.header}>
        {onRenderOption(item, this._onRenderOptionContent)}
      </div>
    );
  }

  private _renderCheckboxLabel(item: IComboBoxOption): JSX.Element | null {
    const { onRenderOption = this._onRenderMultiselectOptionContent } = this.props;
    return onRenderOption(item, this._onRenderMultiselectOptionContent);
  }

  private _renderOption = (item: IComboBoxOption): JSX.Element => {
    const { onRenderOption = this._onRenderOptionContent } = this.props;
    const id = item.id ?? this._id + '-list' + item.index;
    const isSelected: boolean = this._isOptionSelected(item.index);
    const isChecked: boolean = this._isOptionChecked(item.index);
    const isIndeterminate: boolean = this._isOptionIndeterminate(item.index);
    const optionStyles = this._getCurrentOptionStyles(item);
    const optionClassNames = getComboBoxOptionClassNames(optionStyles);
    const title = item.title;

    const getOptionComponent = () => {
      return !this.props.multiSelect ? (
        <CommandButton
          id={id}
          key={item.key}
          data-index={item.index}
          styles={optionStyles}
          checked={isSelected}
          className={'ms-ComboBox-option'}
          onClick={this._onItemClick(item)}
          // eslint-disable-next-line react/jsx-no-bind
          onMouseEnter={this._onOptionMouseEnter.bind(this, item.index)}
          // eslint-disable-next-line react/jsx-no-bind
          onMouseMove={this._onOptionMouseMove.bind(this, item.index)}
          onMouseLeave={this._onOptionMouseLeave}
          role="option"
          // aria-selected should only be applied to checked items, not hovered items
          aria-selected={isSelected ? 'true' : 'false'}
          ariaLabel={item.ariaLabel}
          disabled={item.disabled}
          title={title}
        >
          {
            <span className={optionClassNames.optionTextWrapper} ref={isSelected ? this._selectedElement : undefined}>
              {onRenderOption(item, this._onRenderOptionContent)}
            </span>
          }
        </CommandButton>
      ) : (
        <Checkbox
          id={id}
          ariaLabel={item.ariaLabel}
          ariaLabelledBy={item.ariaLabel ? undefined : id + '-label'}
          key={item.key}
          styles={optionStyles}
          className={'ms-ComboBox-option'}
          onChange={this._onItemClick(item)}
          label={item.text}
          checked={isChecked}
          indeterminate={isIndeterminate}
          title={title}
          disabled={item.disabled}
          // eslint-disable-next-line react/jsx-no-bind
          onRenderLabel={this._renderCheckboxLabel.bind(this, { ...item, id: id + '-label' })}
          inputProps={{
            // aria-selected should only be applied to checked items, not hovered items
            'aria-selected': isChecked ? 'true' : 'false',
            role: 'option',
            ...({
              'data-index': item.index,
              'data-is-focusable': true,
            } as any),
          }}
        />
      );
    };

    return (
      <ComboBoxOptionWrapper
        key={item.key}
        index={item.index}
        disabled={item.disabled}
        isSelected={isSelected}
        isChecked={isChecked}
        isIndeterminate={isIndeterminate}
        text={item.text}
        // eslint-disable-next-line react/jsx-no-bind
        render={getOptionComponent}
        data={item.data}
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
  private _isOptionHighlighted(index: number | undefined): boolean {
    const { currentPendingValueValidIndexOnHover } = this.state;

    // If the hover state is set to clearAll, don't show a selected index.
    // Note, this happens when the user moused out of the menu items
    if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
      return false;
    }

    return currentPendingValueValidIndexOnHover >= 0
      ? currentPendingValueValidIndexOnHover === index
      : this._isOptionSelected(index);
  }

  private _isOptionSelected(index: number | undefined): boolean {
    return this._getPendingSelectedIndex(true /* includePendingValue */) === index;
  }

  private _isOptionChecked(index: number | undefined): boolean {
    if (this.props.multiSelect && index !== undefined && this.props.hoisted.selectedIndices) {
      let idxOfSelectedIndex = -1;

      idxOfSelectedIndex = this.props.hoisted.selectedIndices.indexOf(index);
      return idxOfSelectedIndex >= 0;
    }
    return false;
  }

  private _isOptionIndeterminate(index: number | undefined): boolean {
    const { multiSelect, hoisted } = this.props;

    if (multiSelect && index !== undefined && hoisted.selectedIndices && hoisted.currentOptions) {
      const option = hoisted.currentOptions[index];
      if (option && option.itemType === SelectableOptionMenuItemType.SelectAll) {
        return hoisted.selectedIndices.length > 0 && !this._isSelectAllChecked();
      }
    }

    return false;
  }

  private _isSelectAllChecked(testIndices?: number[]): boolean {
    const { multiSelect, hoisted } = this.props;
    const selectAllOption = hoisted.currentOptions.find(
      option => option.itemType === SelectableOptionMenuItemType.SelectAll,
    );
    const selectedIndices = testIndices || hoisted.selectedIndices;

    if (!multiSelect || !selectedIndices || !selectAllOption) {
      return false;
    }

    // start by not including the select all option itself
    const selectAllIndex = hoisted.currentOptions.indexOf(selectAllOption);
    const compareSelectedIndices = selectedIndices.filter(value => value !== selectAllIndex);

    // get array of selectable options, excluding disabled options, headers, and dividers
    const selectableOptions = hoisted.currentOptions.filter(
      option =>
        !option.disabled && option.itemType !== SelectableOptionMenuItemType.SelectAll && isSelectableOption(option),
    );

    return compareSelectedIndices.length === selectableOptions.length;
  }

  /**
   * Gets the pending selected index taking into account valueValidIndex and selectedIndex
   * @param includeCurrentPendingValue - Should we include the currentPendingValue when
   * finding the index
   */
  private _getPendingSelectedIndex(includeCurrentPendingValue: boolean): number {
    const { currentPendingValueValidIndex, currentPendingValue } = this.state;

    return currentPendingValueValidIndex >= 0 ||
      (includeCurrentPendingValue && currentPendingValue !== null && currentPendingValue !== undefined)
      ? currentPendingValueValidIndex
      : this.props.multiSelect
      ? -1
      : this._getFirstSelectedIndex();
  }

  /**
   * Mouse clicks to headers, dividers and scrollbar should not make input lose focus
   */
  private _onCalloutMouseDown: ICalloutProps['onMouseDown'] = ev => {
    ev.preventDefault();
  };

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

    if (this.props.calloutProps?.onScroll) {
      this.props.calloutProps.onScroll();
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

    const currentPendingSelectedIndex = this._getPendingSelectedIndex(true);

    if (onScrollToItem) {
      // Use the custom scroll handler
      onScrollToItem(currentPendingSelectedIndex >= 0 ? currentPendingSelectedIndex : this._getFirstSelectedIndex());
      return;
    }

    let scrollToElement: HTMLElement | null = this._selectedElement.current as HTMLElement;

    // in multi-select there are multiple selected elements, so we use the pending select index
    // to locate the option to scroll to.
    if (this.props.multiSelect && this._comboBoxMenu.current) {
      scrollToElement = findFirstDescendant(this._comboBoxMenu.current, (element: HTMLElement) => {
        return element.dataset?.index === currentPendingSelectedIndex.toString();
      });
    }

    if (scrollToElement && scrollToElement.offsetParent) {
      let alignToTop = true;

      // We are using refs, scroll the ref into view
      if (this._comboBoxMenu.current && this._comboBoxMenu.current.offsetParent) {
        const scrollableParent = this._comboBoxMenu.current.offsetParent;
        const selectedElement = scrollToElement.offsetParent;

        const { offsetHeight, offsetTop } = selectedElement as HTMLElement;
        const { offsetHeight: parentOffsetHeight, scrollTop } = scrollableParent as HTMLElement;

        const isAbove = offsetTop < scrollTop;
        const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

        if (isAbove || scrollSelectedToTop) {
          alignToTop = false;
          scrollableParent.scrollTo(0, offsetTop);
        } else if (isBelow) {
          scrollableParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
        }
      }

      // if _comboboxMenu doesn't exist, fall back to scrollIntoView
      else {
        scrollToElement.offsetParent.scrollIntoView(alignToTop);
      }
    }
  }

  private _onRenderOptionContent = (item: IComboBoxOption): JSX.Element => {
    const optionClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item));
    return <span className={optionClassNames.optionText}>{item.text}</span>;
  };

  /*
   * Render content of a multiselect item label.
   * Text within the label is aria-hidden, to prevent duplicate input/label exposure
   */
  private _onRenderMultiselectOptionContent = (item: IComboBoxOption): JSX.Element => {
    const optionClassNames = getComboBoxOptionClassNames(this._getCurrentOptionStyles(item));
    return (
      <span id={item.id} aria-hidden="true" className={optionClassNames.optionText}>
        {item.text}
      </span>
    );
  };

  /**
   * Click handler for the menu items
   * to select the item and also close the menu
   * @param index - the index of the item that was clicked
   */
  private _onItemClick(item: IComboBoxOption): (ev: React.MouseEvent<any>) => void {
    const { onItemClick } = this.props;
    const { index } = item;
    return (ev: React.MouseEvent<any>): void => {
      // only close the callout when it's in single-select mode
      if (!this.props.multiSelect) {
        // ensure that focus returns to the input, not the button
        this._autofill.current && this._autofill.current.focus();
        this.setState({
          isOpen: false,
        });
      }

      // Continue processing the click only after
      // performing menu close / control focus(inner working)
      onItemClick && onItemClick(ev, item, index);
      this._setSelectedIndex(index as number, ev);
    };
  }

  /**
   * Handles dismissing (cancelling) the menu
   */
  private _onDismiss = (): void => {
    const { onMenuDismiss } = this.props;
    if (onMenuDismiss) {
      onMenuDismiss();
    }

    // In persistMode we need to simulate callout layer mount
    // since that only happens once. We do it on dismiss since
    // it works either way.
    if (this.props.persistMenu) {
      this._onCalloutLayerMounted();
    }

    // close the menu
    this._setOpenStateAndFocusOnClose(false /* isOpen */, false /* focusInputAfterClose */);

    // reset the selected index
    // to the last value state
    this._resetSelectedIndex();
  };

  /**
   * Reset the selected index by clearing the
   * input (of any pending text), clearing the pending state,
   * and setting the suggested display value to the last
   * selected state text
   */
  private _resetSelectedIndex(): void {
    const { currentOptions } = this.props.hoisted;
    this._clearPendingInfo();

    const selectedIndex: number = this._getFirstSelectedIndex();
    if (selectedIndex > 0 && selectedIndex < currentOptions.length) {
      this.props.hoisted.setSuggestedDisplayValue(currentOptions[selectedIndex].text);
    } else if (this.props.text) {
      // If we had a value initially, restore it
      this.props.hoisted.setSuggestedDisplayValue(this.props.text);
    }
  }

  /**
   * Clears the pending info state
   */
  private _clearPendingInfo(): void {
    this._processingClearPendingInfo = true;

    this.props.hoisted.setSuggestedDisplayValue(undefined);
    this.setState(
      {
        currentPendingValue: undefined,
        currentPendingValueValidIndex: -1,
        currentPendingValueValidIndexOnHover: HoverStatus.default,
      },
      this._onAfterClearPendingInfo,
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
  private _setPendingInfo(
    currentPendingValue?: string,
    currentPendingValueValidIndex: number = -1,
    suggestedDisplayValue?: string,
  ): void {
    if (this._processingClearPendingInfo) {
      return;
    }

    this.props.hoisted.setSuggestedDisplayValue(suggestedDisplayValue);
    this.setState({
      currentPendingValue: normalizeToString(currentPendingValue),
      currentPendingValueValidIndex,
      currentPendingValueValidIndexOnHover: HoverStatus.default,
    });
  }

  /**
   * Set the pending info from the given index
   * @param index - the index to set the pending info from
   */
  private _setPendingInfoFromIndex(index: number): void {
    const { currentOptions } = this.props.hoisted;

    if (index >= 0 && index < currentOptions.length) {
      const option = currentOptions[index];
      this._setPendingInfo(getPreviewText(option), index, getPreviewText(option));
    } else {
      this._clearPendingInfo();
    }
  }

  /**
   * Sets the pending info for the combo box
   * @param index - the index to search from
   * @param searchDirection - the direction to search
   */
  private _setPendingInfoFromIndexAndDirection(index: number, searchDirection: SearchDirection): void {
    const { currentOptions } = this.props.hoisted;

    // update index to allow content to wrap
    if (searchDirection === SearchDirection.forward && index >= currentOptions.length - 1) {
      index = -1;
    } else if (searchDirection === SearchDirection.backward && index <= 0) {
      index = currentOptions.length;
    }

    // get the next "valid" index
    const indexUpdate = this._getNextSelectableIndex(index, searchDirection);

    // if the two indices are equal we didn't move and
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

    if (indexWithinBounds(currentOptions, index)) {
      this._setPendingInfoFromIndex(index);
    }
  }

  private _notifyPendingValueChanged(prevState: IComboBoxState): void {
    const { onPendingValueChanged } = this.props;

    if (!onPendingValueChanged) {
      return;
    }

    const { currentOptions } = this.props.hoisted;
    const { currentPendingValue, currentPendingValueValidIndex, currentPendingValueValidIndexOnHover } = this.state;

    let newPendingIndex: number | undefined = undefined;
    let newPendingValue: string | undefined = undefined;

    if (
      currentPendingValueValidIndexOnHover !== prevState.currentPendingValueValidIndexOnHover &&
      indexWithinBounds(currentOptions, currentPendingValueValidIndexOnHover)
    ) {
      // Set new pending index if hover index was changed
      newPendingIndex = currentPendingValueValidIndexOnHover;
    } else if (
      currentPendingValueValidIndex !== prevState.currentPendingValueValidIndex &&
      indexWithinBounds(currentOptions, currentPendingValueValidIndex)
    ) {
      // Set new pending index if currentPendingValueValidIndex was changed
      newPendingIndex = currentPendingValueValidIndex;
    } else if (currentPendingValue !== prevState.currentPendingValue) {
      // Set pendingValue in the case it was changed and no index was changed
      newPendingValue = currentPendingValue;
    }

    // Notify when there is a new pending index/value. Also, if there is a pending value, it needs to send undefined.
    if (newPendingIndex !== undefined || newPendingValue !== undefined || this._hasPendingValue) {
      onPendingValueChanged(
        newPendingIndex !== undefined ? currentOptions[newPendingIndex] : undefined,
        newPendingIndex,
        newPendingValue,
      );
      this._hasPendingValue = newPendingIndex !== undefined || newPendingValue !== undefined;
    }
  }

  /**
   * Sets the isOpen state and updates focusInputAfterClose
   */
  private _setOpenStateAndFocusOnClose(isOpen: boolean, focusInputAfterClose: boolean): void {
    this._focusInputAfterClose = focusInputAfterClose;
    this.setState({ isOpen });
  }

  /**
   * Handle keydown on the input
   * @param ev - The keyboard event that was fired
   */
  private _onInputKeyDown = (ev: React.KeyboardEvent<HTMLElement | Autofill>): void => {
    const {
      disabled,
      allowFreeform,
      allowFreeInput,
      autoComplete,
      hoisted: { currentOptions },
    } = this.props;
    const { isOpen, currentPendingValueValidIndexOnHover } = this.state;

    // Take note if we are processing an alt (option) or meta (command) keydown.
    // See comment in _onInputKeyUp for reasoning.
    this._lastKeyDownWasAltOrMeta = isAltOrMeta(ev);

    if (disabled) {
      this._handleInputWhenDisabled(ev);
      return;
    }

    let index = this._getPendingSelectedIndex(false /* includeCurrentPendingValue */);

    // eslint-disable-next-line deprecation/deprecation
    switch (ev.which) {
      case KeyCodes.enter:
        if (this._autofill.current && this._autofill.current.inputElement) {
          this._autofill.current.inputElement.select();
        }

        this._submitPendingValue(ev);
        if (this.props.multiSelect && isOpen) {
          this.setState({
            currentPendingValueValidIndex: index,
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
              isOpen: !isOpen,
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
        // or the combo box is open, flip the open state
        if (isOpen) {
          this._setOpenStateAndFocusOnClose(!isOpen, false /* focusInputAfterClose */);
        }

        // Allow TAB to propagate
        return;

      case KeyCodes.escape:
        // reset the selected index
        this._resetSelectedIndex();

        // Close the menu if opened
        if (isOpen) {
          this.setState({
            isOpen: false,
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
          index = this.props.hoisted.currentOptions.length;
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

        // do not scroll page
        ev.preventDefault();

        // Go to the previous option
        this._setPendingInfoFromIndexAndDirection(index, SearchDirection.backward);
        break;

      case KeyCodes.down:
        // Expand the combo box on ALT + DownArrow
        if (ev.altKey || ev.metaKey) {
          this._setOpenStateAndFocusOnClose(true /* isOpen */, true /* focusInputAfterClose */);
        } else {
          // if we are in clearAll state (e.g. the user as hovering
          // and has since mousedOut of the menu items),
          // go to the first index
          if (currentPendingValueValidIndexOnHover === HoverStatus.clearAll) {
            index = -1;
          }

          // do not scroll page
          ev.preventDefault();

          // Got to the next option
          this._setPendingInfoFromIndexAndDirection(index, SearchDirection.forward);
        }
        break;

      case KeyCodes.home:
      case KeyCodes.end:
        if (allowFreeform || allowFreeInput) {
          return;
        }

        // Set the initial values to respond to HOME
        // which goes to the first selectable option
        index = -1;
        let directionToSearch = SearchDirection.forward;

        // If end, update the values to respond to END
        // which goes to the last selectable option
        // eslint-disable-next-line deprecation/deprecation
        if (ev.which === KeyCodes.end) {
          index = currentOptions.length;
          directionToSearch = SearchDirection.backward;
        }

        this._setPendingInfoFromIndexAndDirection(index, directionToSearch);
        break;

      /* eslint-disable no-fallthrough */
      case KeyCodes.space:
        // event handled in _onComboBoxKeyUp
        if (!allowFreeform && !allowFreeInput && autoComplete === 'off') {
          break;
        }

      default:
        /* eslint-enable no-fallthrough */
        // are we processing a function key? if so bail out
        // eslint-disable-next-line deprecation/deprecation
        if (ev.which >= 112 /* F1 */ && ev.which <= 123 /* F12 */) {
          return;
        }

        // If we get here and we got either and ALT key
        // or meta key, let the event propagate
        // eslint-disable-next-line deprecation/deprecation
        if (ev.keyCode === KeyCodes.alt || ev.key === 'Meta' /* && isOpen */) {
          return;
        }

        // If we are not allowing freeform or free input and
        // allowing autoComplete, handle the input here
        if (!allowFreeform && !allowFreeInput && autoComplete === 'on') {
          this._onInputChange(ev.key);
          break;
        }

        // allow the key to propagate by default
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  /**
   * Handle keyup on the input
   * @param ev - the keyboard event that was fired
   */
  private _onInputKeyUp = (ev: React.KeyboardEvent<HTMLElement | Autofill>): void => {
    const { disabled, allowFreeform, allowFreeInput, autoComplete } = this.props;
    const isOpen = this.state.isOpen;

    // We close the menu on key up only if ALL of the following are true:
    // - Most recent key down was alt or meta (command)
    // - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
    //   expand/collapse the menu)
    // - We're not on a Mac (or iOS)
    // This is because on Windows, pressing alt moves focus to the application menu bar or similar,
    // closing any open context menus. There is not a similar behavior on Macs.
    const keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && isAltOrMeta(ev);
    this._lastKeyDownWasAltOrMeta = false;
    const shouldHandleKey = keyPressIsAltOrMetaAlone && !(isMac() || isIOS());

    if (disabled) {
      this._handleInputWhenDisabled(ev);
      return;
    }

    // eslint-disable-next-line deprecation/deprecation
    switch (ev.which) {
      case KeyCodes.space:
        // If we are not allowing freeform or free input, and autoComplete is off
        // make space expand/collapse the combo box
        // and allow the event to propagate
        if (!allowFreeform && !allowFreeInput && autoComplete === 'off') {
          this._setOpenStateAndFocusOnClose(!isOpen, !!isOpen);
        }
        return;
      default:
        if (shouldHandleKey && isOpen) {
          this._setOpenStateAndFocusOnClose(!isOpen, true /* focusInputAfterClose */);
        } else {
          if (this.state.focusState === 'focusing' && this.props.openOnKeyboardFocus) {
            this.setState({ isOpen: true });
          }
          if (this.state.focusState !== 'focused') {
            this.setState({ focusState: 'focused' });
          }
        }
        return;
    }
  };

  private _onOptionMouseEnter(index: number): void {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: index,
    });
  }

  private _onOptionMouseMove(index: number): void {
    this._gotMouseMove = true;

    if (!this._isScrollIdle || this.state.currentPendingValueValidIndexOnHover === index) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: index,
    });
  }

  private _onOptionMouseLeave = () => {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    // Ignore the event in persistMenu mode if the callout has
    // closed. This is to avoid clearing the visuals on item click.
    if (this.props.persistMenu && !this.state.isOpen) {
      return;
    }

    this.setState({
      currentPendingValueValidIndexOnHover: HoverStatus.clearAll,
    });
  };

  private _shouldIgnoreMouseEvent(): boolean {
    return !this._isScrollIdle || !this._gotMouseMove;
  }

  /**
   * Handle dismissing the menu and eating the required key event when disabled
   * @param ev - the keyboard event that was fired
   */
  private _handleInputWhenDisabled(ev: React.KeyboardEvent<HTMLElement | Autofill> | null): void {
    // If we are disabled, close the menu (if needed)
    // and eat all keystrokes other than TAB or ESC
    if (this.props.disabled) {
      if (this.state.isOpen) {
        this.setState({ isOpen: false });
      }

      // When disabled stop propagation and prevent default
      // of the event unless we have a tab, escape, or function key
      if (
        ev !== null &&
        // eslint-disable-next-line deprecation/deprecation
        ev.which !== KeyCodes.tab &&
        // eslint-disable-next-line deprecation/deprecation
        ev.which !== KeyCodes.escape &&
        // eslint-disable-next-line deprecation/deprecation
        (ev.which < 112 /* F1 */ || ev.which > 123) /* F12 */
      ) {
        ev.stopPropagation();
        ev.preventDefault();
      }
    }
  }

  /**
   * Click handler for the button of the combo box and the input when not allowing freeform.
   * This toggles the expand/collapse state of the combo box (if enabled).
   */
  private _onComboBoxClick = (): void => {
    const { disabled } = this.props;
    const { isOpen } = this.state;

    if (!disabled) {
      this._setOpenStateAndFocusOnClose(!isOpen, false /* focusInputAfterClose */);
      this.setState({ focusState: 'focused' });
    }
  };

  /**
   * Click handler for the autofill.
   */
  private _onAutofillClick = (): void => {
    const { disabled, allowFreeform } = this.props;
    if (allowFreeform && !disabled) {
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
    // If we already have an existing timeout from a previous touch and pointer event
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
   * @param item - Item props for the current option
   */
  private _getCaretButtonStyles(): IButtonStyles {
    const { caretDownButtonStyles: customCaretDownButtonStyles } = this.props;
    return getCaretDownButtonStyles(this.props.theme!, customCaretDownButtonStyles);
  }

  /**
   * Get the styles for the current option.
   * @param item - Item props for the current option
   */
  private _getCurrentOptionStyles(item: IComboBoxOption): Partial<IComboBoxOptionStyles> {
    const { comboBoxOptionStyles: customStylesForAllOptions } = this.props;
    const { styles: customStylesForCurrentOption } = item;

    const optionStyles = getOptionStyles(
      this.props.theme!,
      customStylesForAllOptions,
      customStylesForCurrentOption,
      this._isPendingOption(item),
      item.hidden,
      this._isOptionHighlighted(item.index),
    );

    // TODO: fix this for multi-window scenarios
    optionStyles.__shadowConfig__ = this.props.styles?.__shadowConfig__;
    return optionStyles;
  }

  /**
   * Get the aria autocomplete value for the combo box
   * @returns 'inline' if auto-complete automatically dynamic, 'both' if we have a list of possible values to pick from
   * and can dynamically populate input, and 'list' if auto-complete is not enabled as selection is the only option.
   * Ideally, this should be 'none' if auto-complete is not enabled, but there is a known bug in Edge
   * where the callout may appear over the combo box if this attribute is set to 'none'
   */
  private _getAriaAutoCompleteValue(): 'none' | 'inline' | 'list' | 'both' | undefined {
    const autoComplete = !this.props.disabled && this.props.autoComplete === 'on';
    return autoComplete ? (this.props.allowFreeform ? 'inline' : 'both') : 'list';
  }

  private _isPendingOption(item: IComboBoxOption): boolean {
    return item && item.index === this.state.currentPendingValueValidIndex;
  }

  /**
   * Returns true if the component has some kind of focus. If it's either focusing or if it's focused
   */
  private _hasFocus() {
    return this.state.focusState !== 'none';
  }

  private _adjustForCaseSensitivity(text: string): string {
    return this.props.caseSensitive ? text : text.toLowerCase();
  }
}

/**
 * Get the indices of the options that are marked as selected
 * @param options - the combo box options
 * @param selectedKeys - the known selected keys to find
 * @returns - an array of the indices of the selected options, empty array if nothing is selected
 */
function getSelectedIndices(
  options: IComboBoxOption[] | undefined,
  selectedKeys: (string | number | undefined)[],
): number[] {
  if (!options || !selectedKeys) {
    return [];
  }

  const selectedIndices: { [key: number]: boolean } = {};
  options.forEach((option: IComboBoxOption, index: number) => {
    if (option.selected) {
      selectedIndices[index] = true;
    }
  });

  for (const selectedKey of selectedKeys) {
    const index = findIndex(options, option => option.key === selectedKey);
    if (index > -1) {
      selectedIndices[index] = true;
    }
  }

  return Object.keys(selectedIndices).map(Number).sort();
}

/**
 * Given default selected key(s) and selected key(s), return the selected keys(s).
 * When default selected key(s) are available, they take precedence and return them instead of selected key(s).
 *
 * @returns No matter what specific types the input parameters are, always return an array of
 *  either strings or numbers instead of primitive type.  This normalization makes caller's logic easier.
 */
function buildDefaultSelectedKeys(
  defaultSelectedKey: string | number | string[] | number[] | null | undefined,
  selectedKey: string | number | string[] | number[] | null | undefined,
): string[] | number[] {
  const selectedKeys: string[] | number[] = buildSelectedKeys(defaultSelectedKey);
  if (selectedKeys.length) {
    return selectedKeys;
  }
  return buildSelectedKeys(selectedKey);
}

function buildSelectedKeys(selectedKey: string | number | string[] | number[] | null | undefined): string[] | number[] {
  if (selectedKey === undefined) {
    return [];
  }

  // need to cast here so typescript does not complain
  return (selectedKey instanceof Array ? selectedKey : [selectedKey]) as string[] | number[];
}

function normalizeToString(value: string | undefined) {
  return value || '';
}

/**
 * Is the index within the bounds of the array?
 * @param options - options to check if the index is valid for
 * @param index - the index to check
 * @returns - true if the index is valid for the given options, false otherwise
 */
function indexWithinBounds(options: IComboBoxOption[] | undefined, index: number): boolean {
  return !!options && index >= 0 && index < options.length;
}

/** Whether this is a normal option, not a header or divider or select all. */
function isNormalOption(option: IComboBoxOption) {
  return (
    option.itemType !== SelectableOptionMenuItemType.Header &&
    option.itemType !== SelectableOptionMenuItemType.Divider &&
    option.itemType !== SelectableOptionMenuItemType.SelectAll
  );
}

/** Whether this is a selectable option, not a header or divider. */
function isSelectableOption(option: IComboBoxOption) {
  return (
    option.itemType !== SelectableOptionMenuItemType.Header && option.itemType !== SelectableOptionMenuItemType.Divider
  );
}

/**
 * For scenarios where the option's `text` prop contains embedded styles, we use the option's
 * `ariaLabel` value as the text in the input and for autocomplete matching. We know to use this
 * when the `useAriaLabelAsText` prop is set to true.
 */
function getPreviewText(item: IComboBoxOption): string {
  return item.useAriaLabelAsText && item.ariaLabel ? item.ariaLabel : item.text;
}

/**
 * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
 */
function isAltOrMeta(ev: React.KeyboardEvent<HTMLElement | Autofill>): boolean {
  // eslint-disable-next-line deprecation/deprecation
  return ev.which === KeyCodes.alt || ev.key === 'Meta';
}
