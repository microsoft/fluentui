declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): number;

import * as React from 'react';
import {
  IStyleFunctionOrObject,
  KeyCodes,
  classNamesFunction,
  divProperties,
  findIndex,
  getDocument,
  getFirstFocusable,
  getId,
  getLastFocusable,
  getNativeProps,
  initializeComponentRef,
  isIOS,
  isMac,
  mergeAriaAttributeValues,
  safeRequestAnimationFrame,
  warnDeprecations,
  warnMutuallyExclusive
} from '../../Utilities';
import { Callout } from '../../Callout';
import { Checkbox, ICheckboxStyleProps, ICheckboxStyles } from '../../Checkbox';
import { CommandButton } from '../../Button';
import { DirectionalHint } from '../../common/DirectionalHint';
import { DropdownMenuItemType, IDropdownOption, IDropdownProps, IDropdownStyleProps, IDropdownStyles, IDropdown } from './Dropdown.types';
import { DropdownSizePosCache } from './utilities/DropdownSizePosCache';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { ICalloutPositionedInfo, RectangleEdge } from '../../utilities/positioning';
import { Icon } from '../../Icon';
import { ILabelStyleProps, ILabelStyles, Label } from '../../Label';
import { IProcessedStyleSet } from '../../Styling';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import { KeytipData } from '../../KeytipData';
import { Panel, IPanelStyleProps, IPanelStyles } from '../../Panel';
import { ResponsiveMode, withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { SelectableOptionMenuItemType, getAllSelectedOptions, ISelectableDroppableTextProps } from '../../utilities/selectableOption/index';

const getClassNames = classNamesFunction<IDropdownStyleProps, IDropdownStyles>();

/** Internal only props interface to support mixing in responsive mode */
export interface IDropdownInternalProps extends IDropdownProps, IWithResponsiveModeState {}

export interface IDropdownState {
  isOpen: boolean;
  selectedIndices: number[];
  /** Whether the root dropdown element has focus. */
  hasFocus: boolean;
  calloutRenderEdge?: RectangleEdge;
}

@withResponsiveMode
export class DropdownBase extends React.Component<IDropdownInternalProps, IDropdownState> implements IDropdown {
  public static defaultProps = {
    options: [] as any[]
  };

  private _host = React.createRef<HTMLDivElement>();
  private _focusZone = React.createRef<FocusZone>();
  private _dropDown = React.createRef<HTMLDivElement>();
  private _id: string;
  private _labelId: string;
  private _listId: string;
  private _optionId: string;
  private _isScrollIdle: boolean;
  private readonly _scrollIdleDelay: number = 250 /* ms */;
  private _scrollIdleTimeoutId: number | undefined;
  /** True if the most recent keydown event was for alt (option) or meta (command). */
  private _lastKeyDownWasAltOrMeta: boolean | undefined;
  private _sizePosCache: DropdownSizePosCache = new DropdownSizePosCache();
  private _classNames: IProcessedStyleSet<IDropdownStyles>;
  private _requestAnimationFrame = safeRequestAnimationFrame(this);
  /** Flag for when we get the first mouseMove */
  private _gotMouseMove: boolean;
  /** Flag for tracking whether focus is triggered by click (alternatively triggered by keyboard nav) */
  private _isFocusedByClick: boolean;

  constructor(props: IDropdownProps) {
    super(props);

    initializeComponentRef(this);

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations('Dropdown', props, {
        isDisabled: 'disabled',
        onChanged: 'onChange',
        placeHolder: 'placeholder',
        onRenderPlaceHolder: 'onRenderPlaceholder'
      });

      warnMutuallyExclusive('Dropdown', props, {
        defaultSelectedKey: 'selectedKey',
        defaultSelectedKeys: 'selectedKeys',
        selectedKeys: 'selectedKey',
        multiSelect: 'defaultSelectedKey',
        selectedKey: 'multiSelect'
      });
    }

    this._id = props.id || getId('Dropdown');
    this._labelId = this._id + '-label';
    this._listId = this._id + '-list';
    this._optionId = this._id + '-option';
    this._isScrollIdle = true;

    let selectedIndices: number[];

    if (this.props.multiSelect) {
      const selectedKeys = props.defaultSelectedKeys !== undefined ? props.defaultSelectedKeys : props.selectedKeys;
      selectedIndices = this._getSelectedIndexes(props.options, selectedKeys);
    } else {
      const selectedKey = props.defaultSelectedKey !== undefined ? props.defaultSelectedKey : props.selectedKey;
      selectedIndices = this._getSelectedIndexes(props.options, selectedKey!);
      this._sizePosCache.updateOptions(props.options);
    }

    this.state = {
      isOpen: false,
      selectedIndices,
      hasFocus: false,
      calloutRenderEdge: undefined
    };
  }

  /**
   * All selected options
   */
  public get selectedOptions(): IDropdownOption[] {
    const { options } = this.props;
    const { selectedIndices } = this.state;

    return getAllSelectedOptions(options, selectedIndices);
  }

  public componentWillUnmount() {
    clearTimeout(this._scrollIdleTimeoutId);
  }

  // tslint:disable-next-line function-name
  public UNSAFE_componentWillReceiveProps(newProps: IDropdownProps): void {
    // In controlled component usage where selectedKey is provided, update the selectedIndex
    // state if the key or options change.
    let selectedKeyProp: 'defaultSelectedKeys' | 'selectedKeys' | 'defaultSelectedKey' | 'selectedKey';

    // this does a shallow compare (assumes options are pure), for the purposes of determining whether
    // defaultSelectedKey/defaultSelectedKeys are respected.
    const didOptionsChange = newProps.options !== this.props.options;

    if (newProps.multiSelect) {
      if (didOptionsChange && newProps.defaultSelectedKeys !== undefined) {
        selectedKeyProp = 'defaultSelectedKeys';
      } else {
        selectedKeyProp = 'selectedKeys';
      }
    } else {
      if (didOptionsChange && newProps.defaultSelectedKey !== undefined) {
        selectedKeyProp = 'defaultSelectedKey';
      } else {
        selectedKeyProp = 'selectedKey';
      }
    }

    if (newProps[selectedKeyProp] !== undefined && (newProps[selectedKeyProp] !== this.props[selectedKeyProp] || didOptionsChange)) {
      this.setState({
        selectedIndices: this._getSelectedIndexes(newProps.options, newProps[selectedKeyProp])
      });
    }

    if (
      newProps.options !== this.props.options && // preexisting code assumes purity of the options...
      !newProps.multiSelect // only relevant in single selection
    ) {
      this._sizePosCache.updateOptions(newProps.options);
    }
  }

  public componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState) {
    if (prevState.isOpen === true && this.state.isOpen === false) {
      this._gotMouseMove = false;

      if (this._dropDown.current) {
        this._dropDown.current.focus();
      }

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  }

  public render(): JSX.Element {
    const id = this._id;

    const props = this.props;
    const {
      className,
      label,
      options,
      ariaLabel,
      required,
      errorMessage,
      keytipProps,
      styles: propStyles,
      theme,
      panelProps,
      calloutProps,
      multiSelect,
      onRenderTitle = this._onRenderTitle,
      onRenderContainer = this._onRenderContainer,
      onRenderCaretDown = this._onRenderCaretDown,
      onRenderLabel = this._onRenderLabel
    } = props;
    const { isOpen, selectedIndices, calloutRenderEdge } = this.state;
    const onRenderPlaceholder = props.onRenderPlaceholder || props.onRenderPlaceHolder || this._onRenderPlaceholder;

    const selectedOptions = getAllSelectedOptions(options, selectedIndices);
    const divProps = getNativeProps(props, divProperties);

    const disabled = this._isDisabled();

    const errorMessageId = id + '-errorMessage';
    const ariaActiveDescendant = disabled
      ? undefined
      : isOpen && selectedIndices.length === 1 && selectedIndices[0] >= 0
      ? this._listId + selectedIndices[0]
      : undefined;
    const ariaAttrs =
      multiSelect || disabled
        ? {}
        : // single select
          {
            role: 'listbox',
            childRole: 'option',
            ariaSetSize: this._sizePosCache.optionSetSize,
            ariaPosInSet: this._sizePosCache.positionInSet(selectedIndices[0]),
            ariaSelected: selectedIndices[0] === undefined ? undefined : true
          };
    this._classNames = getClassNames(propStyles, {
      theme,
      className,
      hasError: !!(errorMessage && errorMessage.length > 0),
      hasLabel: !!label,
      isOpen,
      required,
      disabled,
      isRenderingPlaceholder: !selectedOptions.length,
      panelClassName: !!panelProps ? panelProps.className : undefined,
      calloutClassName: !!calloutProps ? calloutProps.className : undefined,
      calloutRenderEdge: calloutRenderEdge
    });

    const hasErrorMessage: boolean = !!errorMessage && errorMessage.length > 0;

    return (
      <div className={this._classNames.root}>
        {onRenderLabel(this.props, this._onRenderLabel)}
        <KeytipData keytipProps={keytipProps} disabled={disabled}>
          {(keytipAttributes: any): JSX.Element => (
            <div
              {...keytipAttributes}
              data-is-focusable={!disabled}
              ref={this._dropDown}
              id={id}
              tabIndex={disabled ? -1 : 0}
              role={ariaAttrs.role}
              aria-haspopup="listbox"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-label={ariaLabel}
              aria-labelledby={label && !ariaLabel ? mergeAriaAttributeValues(this._labelId, this._optionId) : undefined}
              aria-describedby={mergeAriaAttributeValues(
                keytipAttributes['aria-describedby'],
                hasErrorMessage ? this._id + '-errorMessage' : undefined
              )}
              aria-activedescendant={ariaActiveDescendant}
              aria-required={required}
              aria-disabled={disabled}
              aria-owns={isOpen ? this._listId : undefined}
              {...divProps}
              className={this._classNames.dropdown}
              onBlur={this._onDropdownBlur}
              onKeyDown={this._onDropdownKeyDown}
              onKeyUp={this._onDropdownKeyUp}
              onClick={this._onDropdownClick}
              onMouseDown={this._onDropdownMouseDown}
              onFocus={this._onFocus}
            >
              <span
                id={this._optionId}
                className={this._classNames.title}
                aria-live="polite"
                aria-atomic={true}
                aria-invalid={hasErrorMessage}
                role={ariaAttrs.childRole}
                aria-setsize={ariaAttrs.ariaSetSize}
                aria-posinset={ariaAttrs.ariaPosInSet}
                aria-selected={ariaAttrs.ariaSelected}
              >
                {// If option is selected render title, otherwise render the placeholder text
                selectedOptions.length
                  ? onRenderTitle(selectedOptions, this._onRenderTitle)
                  : onRenderPlaceholder(props, this._onRenderPlaceholder)}
              </span>
              <span className={this._classNames.caretDownWrapper}>{onRenderCaretDown(props, this._onRenderCaretDown)}</span>
            </div>
          )}
        </KeytipData>
        {isOpen && onRenderContainer({ ...props, onDismiss: this._onDismiss }, this._onRenderContainer)}
        {hasErrorMessage && (
          <div role="alert" id={errorMessageId} className={this._classNames.errorMessage}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  }

  public focus(shouldOpenOnFocus?: boolean): void {
    if (this._dropDown.current) {
      this._dropDown.current.focus();

      if (shouldOpenOnFocus) {
        this.setState({
          isOpen: true
        });
      }
    }
  }

  public setSelectedIndex(event: React.FormEvent<HTMLDivElement>, index: number): void {
    const { options, selectedKey, selectedKeys, multiSelect, notifyOnReselect } = this.props;
    const { selectedIndices = [] } = this.state;
    const checked: boolean = selectedIndices ? selectedIndices.indexOf(index) > -1 : false;
    let newIndexes: number[] = [];

    index = Math.max(0, Math.min(options.length - 1, index));

    // If this is a controlled component then no state change should take place.
    if (selectedKey !== undefined || selectedKeys !== undefined) {
      this._onChange(event, options, index, checked, multiSelect);
      return;
    }

    if (!multiSelect && !notifyOnReselect && index === selectedIndices[0]) {
      return;
    } else if (multiSelect) {
      newIndexes = selectedIndices ? this._copyArray(selectedIndices) : [];
      if (checked) {
        const position = newIndexes.indexOf(index);
        if (position > -1) {
          // unchecked the current one
          newIndexes.splice(position, 1);
        }
      } else {
        // add the new selected index into the existing one
        newIndexes.push(index);
      }
    } else {
      // Set the selected option if this is an uncontrolled component
      newIndexes = [index];
    }

    event.persist();
    // Call onChange after state is updated
    this.setState(
      {
        selectedIndices: newIndexes
      },
      () => {
        this._onChange(event, options, index, checked, multiSelect);
      }
    );
  }

  private _onChange = (
    event: React.FormEvent<HTMLDivElement>,
    options: IDropdownOption[],
    index: number,
    checked?: boolean,
    multiSelect?: boolean
  ) => {
    const { onChange, onChanged } = this.props;
    if (onChange || onChanged) {
      // for single-select, option passed in will always be selected.
      // for multi-select, flip the checked value
      const changedOpt = multiSelect ? { ...options[index], selected: !checked } : options[index];

      onChange && onChange({ ...event, target: this._dropDown.current as EventTarget }, changedOpt, index);
      onChanged && onChanged(changedOpt, index);
    }
  };

  /** Get either props.placeholder (new name) or props.placeHolder (old name) */
  private get _placeholder(): string | undefined {
    return this.props.placeholder || this.props.placeHolder;
  }

  private _copyArray(array: any[]): any[] {
    const newArray = [];
    for (const element of array) {
      newArray.push(element);
    }
    return newArray;
  }

  /**
   * Finds the next valid Dropdown option and sets the selected index to it.
   * @param stepValue - Value of how many items the function should traverse.  Should be -1 or 1.
   * @param index - Index of where the search should start
   * @param selectedIndex - The selectedIndex Dropdown's state
   * @returns The next valid dropdown option's index
   */
  private _moveIndex(event: React.FormEvent<HTMLDivElement>, stepValue: number, index: number, selectedIndex: number): number {
    const { options } = this.props;
    // Return selectedIndex if nothing has changed or options is empty
    if (selectedIndex === index || options.length === 0) {
      return selectedIndex;
    }

    // Set starting index to 0 if index is < 0
    if (index < 0) {
      index = 0;
    }
    // Set starting index to last option index if greater than options.length
    if (index >= options.length) {
      index = options.length - 1;
    }
    let stepCounter = 0;
    // If current index is a header or divider, or disabled, increment by step
    while (
      options[index].itemType === DropdownMenuItemType.Header ||
      options[index].itemType === DropdownMenuItemType.Divider ||
      options[index].disabled
    ) {
      // If stepCounter exceeds length of options, then return selectedIndex (-1)
      if (stepCounter >= options.length) {
        return selectedIndex;
      }
      // If index + stepValue is out of bounds, wrap around
      if (index + stepValue < 0) {
        index = options.length;
      } else if (index + stepValue >= options.length) {
        index = -1;
      }

      index = index + stepValue;
      stepCounter++;
    }

    this.setSelectedIndex(event, index);
    return index;
  }

  /** Render text in dropdown input */
  private _onRenderTitle = (items: IDropdownOption[]): JSX.Element => {
    const { multiSelectDelimiter = ', ' } = this.props;

    const displayTxt = items.map(i => i.text).join(multiSelectDelimiter);
    return <>{displayTxt}</>;
  };

  /** Render placeholder text in dropdown input */
  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element | null => {
    if (!this._placeholder) {
      return null;
    }
    return <>{this._placeholder}</>;
  };

  /** Render Callout or Panel container and pass in list */
  private _onRenderContainer = (props: ISelectableDroppableTextProps<IDropdown, HTMLDivElement>): JSX.Element => {
    const { calloutProps, panelProps } = props;
    const { responsiveMode, dropdownWidth } = this.props;

    const isSmall = responsiveMode! <= ResponsiveMode.medium;

    const panelStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.panel as IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>)
      : undefined;

    return isSmall ? (
      <Panel isOpen={true} isLightDismiss={true} onDismiss={this._onDismiss} hasCloseButton={false} styles={panelStyles} {...panelProps}>
        {this._renderFocusableList(props)}
      </Panel>
    ) : (
      <Callout
        isBeakVisible={false}
        gapSpace={0}
        doNotLayer={false}
        directionalHintFixed={false}
        directionalHint={DirectionalHint.bottomLeftEdge}
        {...calloutProps}
        className={this._classNames.callout}
        target={this._dropDown.current}
        onDismiss={this._onDismiss}
        onScroll={this._onScroll}
        onPositioned={this._onPositioned}
        calloutWidth={dropdownWidth || (this._dropDown.current ? this._dropDown.current.clientWidth : 0)}
      >
        {this._renderFocusableList(props)}
      </Callout>
    );
  };

  /** Render Caret Down Icon */
  private _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return <Icon className={this._classNames.caretDown} iconName="ChevronDown" aria-hidden={true} />;
  };

  /** Wrap item list in a FocusZone */
  private _renderFocusableList(props: ISelectableDroppableTextProps<IDropdown, HTMLDivElement>): JSX.Element {
    const { onRenderList = this._onRenderList, label, ariaLabel, multiSelect } = props;

    return (
      <div
        className={this._classNames.dropdownItemsWrapper}
        onKeyDown={this._onZoneKeyDown}
        onKeyUp={this._onZoneKeyUp}
        ref={this._host}
        tabIndex={0}
      >
        <FocusZone
          ref={this._focusZone}
          direction={FocusZoneDirection.vertical}
          id={this._listId}
          className={this._classNames.dropdownItems}
          role="listbox"
          aria-label={ariaLabel}
          aria-labelledby={label && !ariaLabel ? this._labelId : undefined}
          aria-multiselectable={multiSelect}
        >
          {onRenderList(props, this._onRenderList)}
        </FocusZone>
      </div>
    );
  }

  /** Render List of items */
  private _onRenderList = (props: ISelectableDroppableTextProps<IDropdown, HTMLDivElement>): JSX.Element => {
    const { onRenderItem = this._onRenderItem } = props;

    return <>{props.options.map((item: any, index: number) => onRenderItem({ ...item, index }, this._onRenderItem))}</>;
  };

  private _onRenderItem = (item: IDropdownOption): JSX.Element | null => {
    switch (item.itemType) {
      case SelectableOptionMenuItemType.Divider:
        return this._renderSeparator(item);
      case SelectableOptionMenuItemType.Header:
        return this._renderHeader(item);
      default:
        return this._renderOption(item);
    }
  };

  private _renderSeparator(item: IDropdownOption): JSX.Element | null {
    const { index, key } = item;
    if (index! > 0) {
      return <div role="separator" key={key} className={this._classNames.dropdownDivider} />;
    }
    return null;
  }

  private _renderHeader(item: IDropdownOption): JSX.Element {
    const { onRenderOption = this._onRenderOption } = this.props;
    const { key } = item;
    return (
      <div key={key} className={this._classNames.dropdownItemHeader}>
        {onRenderOption(item, this._onRenderOption)}
      </div>
    );
  }

  private _renderOption = (item: IDropdownOption): JSX.Element => {
    const { onRenderOption = this._onRenderOption } = this.props;
    const { selectedIndices = [] } = this.state;
    const isItemSelected = item.index !== undefined && selectedIndices ? selectedIndices.indexOf(item.index) > -1 : false;

    // select the right className based on the combination of selected/disabled
    const itemClassName = item.hidden // predicate: item hidden
      ? this._classNames.dropdownItemHidden
      : isItemSelected && item.disabled === true // predicate: both selected and disabled
      ? this._classNames.dropdownItemSelectedAndDisabled
      : isItemSelected // predicate: selected only
      ? this._classNames.dropdownItemSelected
      : item.disabled === true // predicate: disabled only
      ? this._classNames.dropdownItemDisabled
      : this._classNames.dropdownItem;

    const { title = item.text } = item;

    const multiSelectItemStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.multiSelectItem as IStyleFunctionOrObject<ICheckboxStyleProps, ICheckboxStyles>)
      : undefined;

    return !this.props.multiSelect ? (
      <CommandButton
        id={this._listId + item.index}
        key={item.key}
        data-index={item.index}
        data-is-focusable={!item.disabled}
        disabled={item.disabled}
        className={itemClassName}
        onClick={this._onItemClick(item)}
        onMouseEnter={this._onItemMouseEnter.bind(this, item)}
        onMouseLeave={this._onMouseItemLeave.bind(this, item)}
        onMouseMove={this._onItemMouseMove.bind(this, item)}
        role="option"
        aria-selected={isItemSelected ? 'true' : 'false'}
        ariaLabel={item.ariaLabel}
        title={title}
      >
        {onRenderOption(item, this._onRenderOption)}
      </CommandButton>
    ) : (
      <Checkbox
        id={this._listId + item.index}
        key={item.key}
        data-index={item.index}
        data-is-focusable={!item.disabled}
        disabled={item.disabled}
        onChange={this._onItemClick(item)}
        inputProps={{
          onMouseEnter: this._onItemMouseEnter.bind(this, item),
          onMouseLeave: this._onMouseItemLeave.bind(this, item),
          onMouseMove: this._onItemMouseMove.bind(this, item)
        }}
        label={item.text}
        title={title}
        onRenderLabel={this._onRenderItemLabel.bind(this, item)}
        className={itemClassName}
        role="option"
        aria-selected={isItemSelected ? 'true' : 'false'}
        checked={isItemSelected}
        styles={multiSelectItemStyles}
      />
    );
  };

  /** Render content of item (i.e. text/icon inside of button) */
  private _onRenderOption = (item: IDropdownOption): JSX.Element => {
    return <span className={this._classNames.dropdownOptionText}>{item.text}</span>;
  };

  /** Render custom label for drop down item */
  private _onRenderItemLabel = (item: IDropdownOption): JSX.Element | null => {
    const { onRenderOption = this._onRenderOption } = this.props;
    return onRenderOption(item, this._onRenderOption);
  };

  private _onPositioned = (positions?: ICalloutPositionedInfo): void => {
    if (this._focusZone.current) {
      // Focusing an element can trigger a reflow. Making this wait until there is an animation
      // frame can improve perf significantly.
      this._requestAnimationFrame(() => {
        const selectedIndices = this.state.selectedIndices;
        if (this._focusZone.current) {
          if (selectedIndices && selectedIndices[0] && !this.props.options[selectedIndices[0]].disabled) {
            const element: HTMLElement = getDocument()!.querySelector(`#${this._id}-list${selectedIndices[0]}`) as HTMLElement;
            this._focusZone.current.focusElement(element);
          } else {
            this._focusZone.current.focus();
          }
        }
      });
    }

    if (!this.state.calloutRenderEdge || this.state.calloutRenderEdge !== positions!.targetEdge) {
      this.setState({
        calloutRenderEdge: positions!.targetEdge
      });
    }
  };

  private _onItemClick = (item: IDropdownOption): ((event: React.MouseEvent<HTMLDivElement>) => void) => {
    return (event: React.MouseEvent<HTMLDivElement>): void => {
      if (!item.disabled) {
        this.setSelectedIndex(event, item.index!);
        if (!this.props.multiSelect) {
          // only close the callout when it's in single-select mode
          this.setState({
            isOpen: false
          });
        }
      }
    };
  };

  /**
   * Scroll handler for the callout to make sure the mouse events
   * for updating focus are not interacting during scroll
   */
  private _onScroll = (): void => {
    if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
      clearTimeout(this._scrollIdleTimeoutId);
      this._scrollIdleTimeoutId = undefined;
    } else {
      this._isScrollIdle = false;
    }

    this._scrollIdleTimeoutId = setTimeout(() => {
      this._isScrollIdle = true;
    }, this._scrollIdleDelay);
  };

  private _onItemMouseEnter(item: any, ev: React.MouseEvent<HTMLElement>): void {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    const targetElement = ev.currentTarget as HTMLElement;
    targetElement.focus();
  }

  private _onItemMouseMove(item: any, ev: React.MouseEvent<HTMLElement>): void {
    const targetElement = ev.currentTarget as HTMLElement;
    this._gotMouseMove = true;

    if (!this._isScrollIdle || document.activeElement === targetElement) {
      return;
    }

    targetElement.focus();
  }

  private _onMouseItemLeave = (item: any, ev: React.MouseEvent<HTMLElement>): void => {
    if (this._shouldIgnoreMouseEvent()) {
      return;
    }

    /**
     * IE11 focus() method forces parents to scroll to top of element.
     * Edge and IE expose a setActive() function for focusable divs that
     * sets the page focus but does not scroll the parent element.
     */
    if (this._host.current) {
      if ((this._host.current as any).setActive) {
        try {
          (this._host.current as any).setActive();
        } catch (e) {
          /* no-op */
        }
      } else {
        this._host.current.focus();
      }
    }
  };

  private _shouldIgnoreMouseEvent(): boolean {
    return !this._isScrollIdle || !this._gotMouseMove;
  }

  private _onDismiss = (): void => {
    this.setState({ isOpen: false });

    if (this._dropDown.current) {
      this._dropDown.current.focus();
    }
  };

  /** Get all selected indexes for multi-select mode */
  private _getSelectedIndexes(options: IDropdownOption[], selectedKey: string | number | string[] | number[] | null | undefined): number[] {
    if (selectedKey === undefined) {
      if (this.props.multiSelect) {
        return this._getAllSelectedIndices(options);
      }
      const selectedIndex = this._getSelectedIndex(options, null);
      return selectedIndex !== -1 ? [selectedIndex] : [];
    } else if (!Array.isArray(selectedKey)) {
      const selectedIndex = this._getSelectedIndex(options, selectedKey);
      return selectedIndex !== -1 ? [selectedIndex] : [];
    }

    const selectedIndices: number[] = [];
    for (const key of selectedKey) {
      const selectedIndex = this._getSelectedIndex(options, key);
      selectedIndex !== -1 && selectedIndices.push(selectedIndex);
    }
    return selectedIndices;
  }

  private _getAllSelectedIndices(options: IDropdownOption[]): number[] {
    return options.map((option: IDropdownOption, index: number) => (option.selected ? index : -1)).filter(index => index !== -1);
  }

  private _getSelectedIndex(options: IDropdownOption[], selectedKey: string | number | null): number {
    return findIndex(options, option => {
      // tslint:disable-next-line:triple-equals
      if (selectedKey != null) {
        return option.key === selectedKey;
      } else {
        return !!option.isSelected || !!option.selected;
      }
    });
  }

  private _onDropdownBlur = (ev: React.FocusEvent<HTMLDivElement>): void => {
    // If Dropdown disabled do not proceed with this logic.
    const disabled = this._isDisabled();
    if (disabled) {
      return;
    }

    // hasFocus tracks whether the root element has focus so always update the state.
    this.setState({ hasFocus: false });

    if (this.state.isOpen) {
      // Do not onBlur when the callout is opened
      return;
    }
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  };

  private _onDropdownKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    // If Dropdown disabled do not process any keyboard events.
    const disabled = this._isDisabled();
    if (disabled) {
      return;
    }

    // Take note if we are processing an alt (option) or meta (command) keydown.
    // See comment in _shouldHandleKeyUp for reasoning.
    this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
      if (ev.defaultPrevented) {
        return;
      }
    }

    let newIndex: number | undefined;
    const selectedIndex = this.state.selectedIndices.length ? this.state.selectedIndices[0] : -1;
    const containsExpandCollapseModifier = ev.altKey || ev.metaKey;
    const isOpen = this.state.isOpen;

    switch (ev.which) {
      case KeyCodes.enter:
        this.setState({
          isOpen: !isOpen
        });
        break;

      case KeyCodes.escape:
        if (!isOpen) {
          return;
        }

        this.setState({
          isOpen: false
        });
        break;

      case KeyCodes.up:
        if (containsExpandCollapseModifier) {
          if (isOpen) {
            this.setState({ isOpen: false });
            break;
          }

          return;
        }
        if (this.props.multiSelect) {
          this.setState({ isOpen: true });
        } else if (!this._isDisabled()) {
          newIndex = this._moveIndex(ev, -1, selectedIndex - 1, selectedIndex);
        }
        break;

      case KeyCodes.down:
        if (containsExpandCollapseModifier) {
          ev.stopPropagation();
          ev.preventDefault();
        }
        if ((containsExpandCollapseModifier && !isOpen) || this.props.multiSelect) {
          this.setState({ isOpen: true });
        } else if (!this._isDisabled()) {
          newIndex = this._moveIndex(ev, 1, selectedIndex + 1, selectedIndex);
        }
        break;

      case KeyCodes.home:
        if (!this.props.multiSelect) {
          newIndex = this._moveIndex(ev, 1, 0, selectedIndex);
        }
        break;

      case KeyCodes.end:
        if (!this.props.multiSelect) {
          newIndex = this._moveIndex(ev, -1, this.props.options.length - 1, selectedIndex);
        }
        break;

      case KeyCodes.space:
        // event handled in _onDropdownKeyUp
        break;

      default:
        return;
    }

    if (newIndex !== selectedIndex) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  };

  private _onDropdownKeyUp = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    // If Dropdown disabled do not process any keyboard events.
    const disabled = this._isDisabled();
    if (disabled) {
      return;
    }

    const shouldHandleKey = this._shouldHandleKeyUp(ev);
    const isOpen = this.state.isOpen;

    if (this.props.onKeyUp) {
      this.props.onKeyUp(ev);
      if (ev.defaultPrevented) {
        return;
      }
    }
    switch (ev.which) {
      case KeyCodes.space:
        this.setState({
          isOpen: !isOpen
        });
        break;

      default:
        if (shouldHandleKey && isOpen) {
          this.setState({ isOpen: false });
        }
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  /**
   * Returns true if the key for the event is alt (Mac option) or meta (Mac command).
   */
  private _isAltOrMeta(ev: React.KeyboardEvent<HTMLElement>): boolean {
    return ev.which === KeyCodes.alt || ev.key === 'Meta';
  }

  /**
   * We close the menu on key up only if ALL of the following are true:
   * - Most recent key down was alt or meta (command)
   * - The alt/meta key down was NOT followed by some other key (such as down/up arrow to
   *   expand/collapse the menu)
   * - We're not on a Mac (or iOS)
   *
   * This is because on Windows, pressing alt moves focus to the application menu bar or similar,
   * closing any open context menus. There is not a similar behavior on Macs.
   */
  private _shouldHandleKeyUp(ev: React.KeyboardEvent<HTMLElement>): boolean {
    const keyPressIsAltOrMetaAlone = this._lastKeyDownWasAltOrMeta && this._isAltOrMeta(ev);
    this._lastKeyDownWasAltOrMeta = false;
    return !!keyPressIsAltOrMetaAlone && !(isMac() || isIOS());
  }

  private _onZoneKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    let elementToFocus;

    // Take note if we are processing an alt (option) or meta (command) keydown.
    // See comment in _shouldHandleKeyUp for reasoning.
    this._lastKeyDownWasAltOrMeta = this._isAltOrMeta(ev);
    const containsExpandCollapseModifier = ev.altKey || ev.metaKey;

    switch (ev.which) {
      case KeyCodes.up:
        if (containsExpandCollapseModifier) {
          this.setState({ isOpen: false });
        } else {
          if (this._host.current) {
            elementToFocus = getLastFocusable(this._host.current, this._host.current.lastChild as HTMLElement, true);
          }
        }
        break;

      // All directional keystrokes should be canceled when the zone is rendered.
      // This avoids the body scroll from reacting and thus dismissing the dropdown.
      case KeyCodes.home:
      case KeyCodes.end:
      case KeyCodes.pageUp:
      case KeyCodes.pageDown:
        break;

      case KeyCodes.down:
        if (!containsExpandCollapseModifier && this._host.current) {
          elementToFocus = getFirstFocusable(this._host.current, this._host.current.firstChild as HTMLElement, true);
        }
        break;

      case KeyCodes.escape:
        this.setState({ isOpen: false });
        break;

      case KeyCodes.tab:
        this.setState({ isOpen: false });
        return;

      default:
        return;
    }

    if (elementToFocus) {
      elementToFocus.focus();
    }

    ev.stopPropagation();
    ev.preventDefault();
  };

  private _onZoneKeyUp = (ev: React.KeyboardEvent<HTMLElement>): void => {
    const shouldHandleKey = this._shouldHandleKeyUp(ev);

    if (shouldHandleKey && this.state.isOpen) {
      this.setState({ isOpen: false });
      ev.preventDefault();
    }
  };

  private _onDropdownClick = (ev: React.MouseEvent<HTMLDivElement>): void => {
    if (this.props.onClick) {
      this.props.onClick(ev);
      if (ev.defaultPrevented) {
        return;
      }
    }

    const { isOpen } = this.state;
    const disabled = this._isDisabled();

    if (!disabled && !this._shouldOpenOnFocus()) {
      this.setState({
        isOpen: !isOpen
      });
    }

    this._isFocusedByClick = false; // reset
  };

  private _onDropdownMouseDown = (): void => {
    this._isFocusedByClick = true;
  };

  private _onFocus = (ev: React.FocusEvent<HTMLDivElement>): void => {
    const { isOpen, selectedIndices } = this.state;
    const { multiSelect } = this.props;

    const disabled = this._isDisabled();

    if (!disabled) {
      if (!this._isFocusedByClick && !isOpen && selectedIndices.length === 0 && !multiSelect) {
        // Per aria: https://www.w3.org/TR/wai-aria-practices-1.1/#listbox_kbd_interaction
        this._moveIndex(ev, 1, 0, -1);
      }
      if (this.props.onFocus) {
        this.props.onFocus(ev);
      }
      const state: Pick<IDropdownState, 'hasFocus'> | Pick<IDropdownState, 'hasFocus' | 'isOpen'> = { hasFocus: true };
      if (this._shouldOpenOnFocus()) {
        (state as Pick<IDropdownState, 'hasFocus' | 'isOpen'>).isOpen = true;
      }

      this.setState(state);
    }
  };

  /**
   * Because the isDisabled prop is deprecated, we have had to repeat this logic all over the place.
   * This helper method avoids all the repetition.
   */
  private _isDisabled: () => boolean | undefined = () => {
    let { disabled } = this.props;
    const { isDisabled } = this.props;

    // Remove this deprecation workaround at 1.0.0
    if (isDisabled !== undefined) {
      disabled = isDisabled;
    }

    return disabled;
  };

  private _onRenderLabel = (props: IDropdownProps): JSX.Element | null => {
    const { label, required, disabled } = props;

    const labelStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.label as IStyleFunctionOrObject<ILabelStyleProps, ILabelStyles>)
      : undefined;

    return label ? (
      <Label className={this._classNames.label} id={this._labelId} required={required} styles={labelStyles} disabled={disabled}>
        {label}
      </Label>
    ) : null;
  };

  /**
   * Returns true if dropdown should set to open on focus.
   * Otherwise, isOpen state should be toggled on click
   */
  private _shouldOpenOnFocus(): boolean {
    const { hasFocus } = this.state;
    const { openOnKeyboardFocus } = this.props;
    return !this._isFocusedByClick && openOnKeyboardFocus === true && !hasFocus;
  }
}
