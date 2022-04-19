import * as React from 'react';
import {
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
  warn,
  warnDeprecations,
  warnMutuallyExclusive,
} from '../../Utilities';
import { Callout, DirectionalHint } from '../../Callout';
import { CommandButton } from '../../Button';
import { DropdownMenuItemType } from './Dropdown.types';
import { DropdownSizePosCache } from './utilities/DropdownSizePosCache';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { RectangleEdge } from '../../Positioning';
import { Icon } from '../../Icon';
import { Label } from '../../Label';
import { Panel } from '../../Panel';
import { ResponsiveMode, useResponsiveMode } from '../../ResponsiveMode';
import { SelectableOptionMenuItemType, getAllSelectedOptions } from '../../SelectableOption';
// import and use V7 Checkbox to ensure no breaking changes.
import { Checkbox } from '../../Checkbox';
import { getNextElement, getPreviousElement, getPropsWithDefaults } from '@fluentui/utilities';
import { useMergedRefs, usePrevious } from '@fluentui/react-hooks';
import type { IStyleFunctionOrObject } from '../../Utilities';
import type {
  IDropdownOption,
  IDropdownProps,
  IDropdownStyleProps,
  IDropdownStyles,
  IDropdown,
} from './Dropdown.types';
import type { ICalloutPositionedInfo } from '../../Positioning';
import type { ILabelStyleProps, ILabelStyles } from '../../Label';
import type { IProcessedStyleSet } from '../../Styling';
import type { IPanelStyleProps, IPanelStyles } from '../../Panel';
import type { IWithResponsiveModeState } from '../../ResponsiveMode';
import type { ISelectableDroppableTextProps } from '../../SelectableOption';
import type { ICheckboxStyleProps, ICheckboxStyles } from '../../Checkbox';

const COMPONENT_NAME = 'Dropdown';
const getClassNames = classNamesFunction<IDropdownStyleProps, IDropdownStyles>();

/** Internal only props interface to support mixing in responsive mode */
// eslint-disable-next-line deprecation/deprecation
interface IDropdownInternalProps extends Omit<IDropdownProps, 'ref'>, IWithResponsiveModeState {
  hoisted: {
    rootRef: React.RefObject<HTMLDivElement>;
    selectedIndices: number[];
    setSelectedIndices: React.Dispatch<React.SetStateAction<number[]>>;
  };
}

interface IDropdownState {
  isOpen: boolean;
  /** Used to track whether focus is already within the Dropdown, for openOnFocus handling. */
  hasFocus: boolean;
  calloutRenderEdge?: RectangleEdge;
}

const DEFAULT_PROPS: Partial<IDropdownProps> = {
  options: [],
};

function useSelectedItemsState({
  defaultSelectedKeys,
  selectedKeys,
  defaultSelectedKey,
  selectedKey,
  options,
  multiSelect,
}: IDropdownProps) {
  const oldOptions = usePrevious(options);
  const [selectedIndices, setSelectedIndices] = React.useState<number[]>([]);

  // In controlled component usage where selectedKey is provided, update the selectedIndex
  // state if the key or options change.
  let selectedKeyPropToUse: string | number | string[] | number[] | null | undefined;

  // this does a shallow compare (assumes options are pure), for the purposes of determining whether
  // defaultSelectedKey/defaultSelectedKeys are respected.
  const didOptionsChange = options !== oldOptions;

  if (multiSelect) {
    if (didOptionsChange && defaultSelectedKeys !== undefined) {
      selectedKeyPropToUse = defaultSelectedKeys;
    } else {
      selectedKeyPropToUse = selectedKeys;
    }
  } else {
    if (didOptionsChange && defaultSelectedKey !== undefined) {
      selectedKeyPropToUse = defaultSelectedKey;
    } else {
      selectedKeyPropToUse = selectedKey;
    }
  }

  const oldSelectedKeyProp = usePrevious(selectedKeyPropToUse);

  React.useEffect(() => {
    /** Get all selected indexes for multi-select mode */
    const getSelectedIndexes = (): number[] => {
      if (selectedKeyPropToUse === undefined) {
        if (multiSelect) {
          return getAllSelectedIndices();
        }
        const selectedIndex = getSelectedIndex(null);
        return selectedIndex !== -1 ? [selectedIndex] : [];
      } else if (!Array.isArray(selectedKeyPropToUse)) {
        const selectedIndex = getSelectedIndex(selectedKeyPropToUse);
        return selectedIndex !== -1 ? [selectedIndex] : [];
      }

      const returnValue: number[] = [];
      for (const key of selectedKeyPropToUse) {
        const selectedIndex = getSelectedIndex(key);
        selectedIndex !== -1 && returnValue.push(selectedIndex);
      }
      return returnValue;
    };

    const getAllSelectedIndices = (): number[] => {
      return options
        .map((option: IDropdownOption, index: number) => (option.selected ? index : -1))
        .filter(index => index !== -1);
    };

    const getSelectedIndex = (searchKey: string | number | null | undefined): number => {
      return findIndex(options, option => {
        // eslint-disable-next-line eqeqeq
        if (searchKey != null) {
          return option.key === searchKey;
        } else {
          // eslint-disable-next-line deprecation/deprecation
          return !!option.selected || !!option.isSelected;
        }
      });
    };

    if (
      (selectedKeyPropToUse !== undefined || !oldOptions) &&
      (selectedKeyPropToUse !== oldSelectedKeyProp || didOptionsChange)
    ) {
      setSelectedIndices(getSelectedIndexes());
    }
  }, [didOptionsChange, multiSelect, oldOptions, oldSelectedKeyProp, options, selectedKeyPropToUse]);

  return [selectedIndices, setSelectedIndices] as const;
}

export const DropdownBase: React.FunctionComponent<IDropdownProps> = React.forwardRef<HTMLDivElement, IDropdownProps>(
  (propsWithoutDefaults, forwardedRef) => {
    const props = getPropsWithDefaults(DEFAULT_PROPS, propsWithoutDefaults);

    const rootRef = React.useRef<HTMLDivElement>(null);
    const mergedRootRef = useMergedRefs(forwardedRef, rootRef);

    const responsiveMode = useResponsiveMode(rootRef, props.responsiveMode);
    const [selectedIndices, setSelectedIndices] = useSelectedItemsState(props);

    return (
      <DropdownInternal
        {...(props as Omit<IDropdownProps, 'ref'>)}
        responsiveMode={responsiveMode}
        hoisted={{ rootRef: mergedRootRef, selectedIndices, setSelectedIndices }}
      />
    );
  },
);
DropdownBase.displayName = 'DropdownBase';

class DropdownInternal extends React.Component<IDropdownInternalProps, IDropdownState> implements IDropdown {
  public static defaultProps = {
    options: [] as IDropdownOption[],
  };

  private _host = React.createRef<HTMLDivElement>();
  private _focusZone = React.createRef<FocusZone>();
  private _dropDown = React.createRef<HTMLDivElement>();
  private _id: string;
  private _labelId: string;
  private _listId: string;
  private _optionId: string;
  private _isScrollIdle: boolean;
  /** Flag for tracking if the Callout has previously been positioned.
   *  This is necessary to properly control focus state when the width
   *  of the Dropdown is dynamic (e.g, "fit-content").
   */
  private _hasBeenPositioned: boolean;
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

  constructor(props: IDropdownInternalProps) {
    super(props);

    initializeComponentRef(this);

    const { multiSelect, selectedKey, selectedKeys, defaultSelectedKey, defaultSelectedKeys, options } = props;

    if (process.env.NODE_ENV !== 'production') {
      warnDeprecations(COMPONENT_NAME, props, {
        isDisabled: 'disabled',
        onChanged: 'onChange',
        placeHolder: 'placeholder',
        onRenderPlaceHolder: 'onRenderPlaceholder',
      });

      warnMutuallyExclusive(COMPONENT_NAME, props, {
        defaultSelectedKey: 'selectedKey',
        defaultSelectedKeys: 'selectedKeys',
        selectedKeys: 'selectedKey',
      });

      if (multiSelect) {
        const warnMultiSelect = (prop: keyof IDropdownProps) =>
          warn(`Dropdown property '${prop}' cannot be used when 'multiSelect' is true. Use '${prop}s' instead.`);
        if (selectedKey !== undefined) {
          warnMultiSelect('selectedKey');
        }
        if (defaultSelectedKey !== undefined) {
          warnMultiSelect('defaultSelectedKey');
        }
      } else {
        const warnNotMultiSelect = (prop: keyof IDropdownProps) =>
          warn(`Dropdown property '${prop}s' cannot be used when 'multiSelect' is false/unset. Use '${prop}' instead.`);
        if (selectedKeys !== undefined) {
          warnNotMultiSelect('selectedKey');
        }
        if (defaultSelectedKeys !== undefined) {
          warnNotMultiSelect('defaultSelectedKey');
        }
      }
    }

    this._id = props.id || getId('Dropdown');
    this._labelId = this._id + '-label';
    this._listId = this._id + '-list';
    this._optionId = this._id + '-option';
    this._isScrollIdle = true;
    this._hasBeenPositioned = false;

    this._sizePosCache.updateOptions(options);

    this.state = {
      isOpen: false,
      hasFocus: false,
      calloutRenderEdge: undefined,
    };
  }

  /**
   * All selected options
   */
  public get selectedOptions(): IDropdownOption[] {
    const {
      options,
      hoisted: { selectedIndices },
    } = this.props;

    return getAllSelectedOptions(options, selectedIndices);
  }

  public componentWillUnmount() {
    clearTimeout(this._scrollIdleTimeoutId);
  }

  public componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState) {
    if (prevState.isOpen === true && this.state.isOpen === false) {
      this._gotMouseMove = false;
      this._hasBeenPositioned = false;

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
      styles: propStyles,
      theme,
      panelProps,
      calloutProps,
      onRenderTitle = this._getTitle,
      onRenderContainer = this._onRenderContainer,
      onRenderCaretDown = this._onRenderCaretDown,
      onRenderLabel = this._onRenderLabel,
      hoisted: { selectedIndices },
    } = props;
    const { isOpen, calloutRenderEdge, hasFocus } = this.state;
    // eslint-disable-next-line deprecation/deprecation
    const onRenderPlaceholder = props.onRenderPlaceholder || props.onRenderPlaceHolder || this._getPlaceholder;

    // If our cached options are out of date update our cache
    if (options !== this._sizePosCache.cachedOptions) {
      this._sizePosCache.updateOptions(options);
    }

    const selectedOptions = getAllSelectedOptions(options, selectedIndices);
    const divProps = getNativeProps(props, divProperties);

    const disabled = this._isDisabled();

    const errorMessageId = id + '-errorMessage';
    const ariaActiveDescendant = disabled
      ? undefined
      : isOpen && selectedIndices.length === 1 && selectedIndices[0] >= 0
      ? this._listId + selectedIndices[0]
      : undefined;

    this._classNames = getClassNames(propStyles, {
      theme,
      className,
      hasError: !!(errorMessage && errorMessage.length > 0),
      hasLabel: !!label,
      isOpen,
      required,
      disabled,
      isRenderingPlaceholder: !selectedOptions.length,
      panelClassName: panelProps ? panelProps.className : undefined,
      calloutClassName: calloutProps ? calloutProps.className : undefined,
      calloutRenderEdge: calloutRenderEdge,
    });

    const hasErrorMessage: boolean = !!errorMessage && errorMessage.length > 0;

    return (
      <div
        className={this._classNames.root}
        ref={this.props.hoisted.rootRef}
        aria-owns={isOpen ? this._listId : undefined}
      >
        {onRenderLabel(this.props, this._onRenderLabel)}
        <div
          data-is-focusable={!disabled}
          data-ktp-target={true}
          ref={this._dropDown}
          id={id}
          tabIndex={disabled ? -1 : 0}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label={ariaLabel}
          aria-labelledby={label && !ariaLabel ? mergeAriaAttributeValues(this._labelId, this._optionId) : undefined}
          aria-describedby={hasErrorMessage ? this._id + '-errorMessage' : undefined}
          aria-activedescendant={ariaActiveDescendant}
          aria-required={required}
          aria-disabled={disabled}
          aria-controls={isOpen ? this._listId : undefined}
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
            aria-live={hasFocus ? 'polite' : undefined}
            aria-atomic={hasFocus ? true : undefined}
            aria-invalid={hasErrorMessage}
          >
            {
              // If option is selected render title, otherwise render the placeholder text
              selectedOptions.length
                ? onRenderTitle(selectedOptions, this._onRenderTitle)
                : onRenderPlaceholder(props, this._onRenderPlaceholder)
            }
          </span>
          <span className={this._classNames.caretDownWrapper}>{onRenderCaretDown(props, this._onRenderCaretDown)}</span>
        </div>
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
          isOpen: true,
        });
      }
    }
  }

  public setSelectedIndex(event: React.FormEvent<HTMLDivElement>, index: number): void {
    const {
      options,
      selectedKey,
      selectedKeys,
      multiSelect,
      notifyOnReselect,
      hoisted: { selectedIndices = [] },
    } = this.props;
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
    this.props.hoisted.setSelectedIndices(newIndexes);
    this._onChange(event, options, index, checked, multiSelect);
  }

  private _onChange = (
    event: React.FormEvent<HTMLDivElement>,
    options: IDropdownOption[],
    index: number,
    checked?: boolean,
    multiSelect?: boolean,
  ) => {
    // eslint-disable-next-line deprecation/deprecation
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
  private _getPlaceholder = (): string | undefined => {
    // eslint-disable-next-line deprecation/deprecation
    return this.props.placeholder || this.props.placeHolder;
  };

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
  private _moveIndex(
    event: React.FormEvent<HTMLDivElement>,
    stepValue: number,
    index: number,
    selectedIndex: number,
  ): number {
    const { options } = this.props;
    // Return selectedIndex if nothing has changed or options is empty
    if (selectedIndex === index || options.length === 0) {
      return selectedIndex;
    }

    // If the user is pressing the up or down key we want to make
    // sure that the dropdown cycles through the options without
    // causing the screen to scroll. In _onDropdownKeyDown
    // at the very end is a check to see if newIndex !== selectedIndex.
    // If the index is less than 0 and we set it back to 0, then
    // newIndex will equal selectedIndex and not stop the action
    // of the key press happening and vice versa for indexes greater
    // than or equal to the options length.
    if (index >= options.length) {
      index = 0;
    } else if (index < 0) {
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

  /** Get text in dropdown input as a string */
  private _getTitle = (items: IDropdownOption[], _unused?: unknown): string => {
    const { multiSelectDelimiter = ', ' } = this.props;
    return items.map(i => i.text).join(multiSelectDelimiter);
  };

  /** Render text in dropdown input */
  private _onRenderTitle = (items: IDropdownOption[]): JSX.Element => {
    return <>{this._getTitle(items)}</>;
  };

  /** Render placeholder text in dropdown input */
  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element | null => {
    if (!this._getPlaceholder()) {
      return null;
    }
    return <>{this._getPlaceholder()}</>;
  };

  /** Render Callout or Panel container and pass in list */
  private _onRenderContainer = (props: ISelectableDroppableTextProps<IDropdown, HTMLDivElement>): JSX.Element => {
    const { calloutProps, panelProps } = props;
    const { responsiveMode, dropdownWidth } = this.props;

    const isSmall = responsiveMode! <= ResponsiveMode.medium;

    const panelStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.panel as IStyleFunctionOrObject<IPanelStyleProps, IPanelStyles>)
      : undefined;

    let calloutWidth = undefined;
    let calloutMinWidth = undefined;
    if (dropdownWidth === 'auto') {
      calloutMinWidth = this._dropDown.current ? this._dropDown.current.clientWidth : 0;
    } else {
      calloutWidth = dropdownWidth || (this._dropDown.current ? this._dropDown.current.clientWidth : 0);
    }

    return isSmall ? (
      <Panel
        isOpen={true}
        isLightDismiss={true}
        onDismiss={this._onDismiss}
        hasCloseButton={false}
        styles={panelStyles}
        {...panelProps}
      >
        {this._renderFocusableList(props)}
      </Panel>
    ) : (
      <Callout
        isBeakVisible={false}
        gapSpace={0}
        doNotLayer={false}
        directionalHintFixed={false}
        directionalHint={DirectionalHint.bottomLeftEdge}
        calloutWidth={calloutWidth}
        calloutMinWidth={calloutMinWidth}
        {...calloutProps}
        className={this._classNames.callout}
        target={this._dropDown.current}
        onDismiss={this._onDismiss}
        onScroll={this._onScroll}
        onPositioned={this._onPositioned}
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

    const placeRenderedOptionIntoQueue = (item: IDropdownOption, index: number) => {
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
    props.options.forEach((item: IDropdownOption, index: number) => {
      placeRenderedOptionIntoQueue(item, index);
    });

    // Push remaining items into all renderedList
    queue.items.length > 0 && emptyQueue();

    return <>{renderedList}</>;
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
    const separatorClassName = item.hidden ? this._classNames.dropdownDividerHidden : this._classNames.dropdownDivider;
    if (index! > 0) {
      return <div role="separator" key={key} className={separatorClassName} />;
    }
    return null;
  }

  private _renderHeader(item: IDropdownOption): JSX.Element {
    const { onRenderOption = this._onRenderOption } = this.props;
    const { key, id } = item;
    const headerClassName = item.hidden
      ? this._classNames.dropdownItemHeaderHidden
      : this._classNames.dropdownItemHeader;

    return (
      <div id={id} key={key} className={headerClassName}>
        {onRenderOption(item, this._onRenderOption)}
      </div>
    );
  }

  private _renderOption = (item: IDropdownOption): JSX.Element => {
    const {
      onRenderOption = this._onRenderOption,
      hoisted: { selectedIndices = [] },
    } = this.props;
    const isItemSelected =
      item.index !== undefined && selectedIndices ? selectedIndices.indexOf(item.index) > -1 : false;

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

    const { title } = item;

    const multiSelectItemStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.multiSelectItem as IStyleFunctionOrObject<
          ICheckboxStyleProps,
          ICheckboxStyles
        >)
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
        // eslint-disable-next-line react/jsx-no-bind
        onMouseEnter={this._onItemMouseEnter.bind(this, item)}
        // eslint-disable-next-line react/jsx-no-bind
        onMouseLeave={this._onMouseItemLeave.bind(this, item)}
        // eslint-disable-next-line react/jsx-no-bind
        onMouseMove={this._onItemMouseMove.bind(this, item)}
        role="option"
        aria-selected={isItemSelected ? 'true' : 'false'}
        ariaLabel={item.ariaLabel}
        title={title}
        aria-posinset={this._sizePosCache.positionInSet(item.index)}
        aria-setsize={this._sizePosCache.optionSetSize}
      >
        {onRenderOption(item, this._onRenderOption)}
      </CommandButton>
    ) : (
      <Checkbox
        id={this._listId + item.index}
        key={item.key}
        disabled={item.disabled}
        onChange={this._onItemClick(item)}
        inputProps={{
          'aria-selected': isItemSelected,
          onMouseEnter: this._onItemMouseEnter.bind(this, item),
          onMouseLeave: this._onMouseItemLeave.bind(this, item),
          onMouseMove: this._onItemMouseMove.bind(this, item),
          role: 'option',
          ...({
            'data-index': item.index,
            'data-is-focusable': !item.disabled,
          } as any),
        }}
        label={item.text}
        title={title}
        // eslint-disable-next-line react/jsx-no-bind
        onRenderLabel={this._onRenderItemLabel.bind(this, item)}
        className={itemClassName}
        checked={isItemSelected}
        styles={multiSelectItemStyles}
        ariaPositionInSet={this._sizePosCache.positionInSet(item.index)}
        ariaSetSize={this._sizePosCache.optionSetSize}
        ariaLabel={item.ariaLabel}
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
        const selectedIndices = this.props.hoisted.selectedIndices;
        if (this._focusZone.current) {
          if (
            !this._hasBeenPositioned &&
            selectedIndices &&
            selectedIndices[0] &&
            !this.props.options[selectedIndices[0]].disabled
          ) {
            const element: HTMLElement | null = getDocument()!.getElementById(`${this._id}-list${selectedIndices[0]}`);
            if (element) {
              this._focusZone.current.focusElement(element);
            }
            this._hasBeenPositioned = true;
          } else {
            this._focusZone.current.focus();
          }
        }
      });
    }

    if (!this.state.calloutRenderEdge || this.state.calloutRenderEdge !== positions!.targetEdge) {
      this.setState({
        calloutRenderEdge: positions!.targetEdge,
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
            isOpen: false,
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

    this._scrollIdleTimeoutId = window.setTimeout(() => {
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
  };

  private _onDropdownBlur = (ev: React.FocusEvent<HTMLDivElement>): void => {
    // If Dropdown disabled do not proceed with this logic.
    const disabled = this._isDisabled();
    if (disabled) {
      return;
    }

    if (this.state.isOpen) {
      // Do not call onBlur or update focus state when the callout is opened
      return;
    }

    this.setState({ hasFocus: false });

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
    const selectedIndex = this.props.hoisted.selectedIndices.length ? this.props.hoisted.selectedIndices[0] : -1;
    const containsExpandCollapseModifier = ev.altKey || ev.metaKey;
    const isOpen = this.state.isOpen;

    // eslint-disable-next-line deprecation/deprecation
    switch (ev.which) {
      case KeyCodes.enter:
        this.setState({
          isOpen: !isOpen,
        });
        break;

      case KeyCodes.escape:
        if (!isOpen) {
          return;
        }

        this.setState({
          isOpen: false,
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
    // eslint-disable-next-line deprecation/deprecation
    switch (ev.which) {
      case KeyCodes.space:
        this.setState({
          isOpen: !isOpen,
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
    // eslint-disable-next-line deprecation/deprecation
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

    // eslint-disable-next-line deprecation/deprecation
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

        const document = getDocument();

        if (document) {
          if (ev.shiftKey) {
            getPreviousElement(document.body, this._dropDown.current, false, false, true, true)?.focus();
          } else {
            getNextElement(document.body, this._dropDown.current, false, false, true, true)?.focus();
          }
        }
        break;

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
        isOpen: !isOpen,
      });
    }

    this._isFocusedByClick = false; // reset
  };

  private _onDropdownMouseDown = (): void => {
    this._isFocusedByClick = true;
  };

  private _onFocus = (ev: React.FocusEvent<HTMLDivElement>): void => {
    const disabled = this._isDisabled();

    if (!disabled) {
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
    // eslint-disable-next-line deprecation/deprecation
    const { isDisabled } = this.props;

    // Remove this deprecation workaround at 1.0.0
    if (disabled === undefined) {
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
      <Label
        className={this._classNames.label}
        id={this._labelId}
        required={required}
        styles={labelStyles}
        disabled={disabled}
      >
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
