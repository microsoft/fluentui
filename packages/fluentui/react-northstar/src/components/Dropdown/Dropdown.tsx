import {
  getElementType,
  useAutoControlled,
  useStyles,
  useUnhandledProps,
  useFluentContext,
  useTelemetry,
  ForwardRefWithAs,
  useMergedRefs,
  useIsomorphicLayoutEffect,
} from '@fluentui/react-bindings';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import { indicatorBehavior, AccessibilityAttributes, getCode, keyboardKey, SpacebarKey } from '@fluentui/accessibility';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';
import cx from 'classnames';
import computeScrollIntoView from 'compute-scroll-into-view';

import { ShorthandRenderFunction, ShorthandValue, ShorthandCollection, FluentComponentStaticProps } from '../../types';
import Downshift, {
  DownshiftState,
  StateChangeOptions,
  A11yStatusMessageOptions,
  GetMenuPropsOptions,
  GetPropsCommonOptions,
  GetInputPropsOptions,
  GetToggleButtonPropsOptions,
  GetItemPropsOptions,
  ControllerStateAndHelpers,
} from 'downshift';
import {
  commonPropTypes,
  UIComponentProps,
  isFromKeyboard as detectIsFromKeyboard,
  createShorthand,
  setWhatInputSource,
} from '../../utils';
import { List, ListProps } from '../List/List';
import { DropdownItem, DropdownItemProps } from './DropdownItem';
import { DropdownSelectedItem, DropdownSelectedItemProps } from './DropdownSelectedItem';
import { DropdownSearchInput, DropdownSearchInputProps } from './DropdownSearchInput';
import { Button, ButtonProps } from '../Button/Button';
import { screenReaderContainerStyles } from '../../utils/accessibility/Styles/accessibilityStyles';
import { Box, BoxProps } from '../Box/Box';
import { Portal } from '../Portal/Portal';
import {
  ALIGNMENTS,
  POSITIONS,
  Popper,
  PositioningProps,
  PopperShorthandProps,
  partitionPopperPropsFromShorthand,
  AutoSize,
  AUTOSIZES,
} from '../../utils/positioner';
import { CloseIcon, ChevronDownIcon } from '@fluentui/react-icons-northstar';

export interface DownshiftA11yStatusMessageOptions<Item> extends Required<A11yStatusMessageOptions<Item>> {}

export interface DropdownSlotClassNames {
  clearIndicator: string;
  container: string;
  toggleIndicator: string;
  item: string;
  itemsCount: string;
  itemsList: string;
  searchInput: string;
  selectedItem: string;
  selectedItems: string;
  triggerButton: string;
}

export interface DropdownProps extends UIComponentProps<DropdownProps>, PositioningProps {
  /** The index of the currently selected item, if the dropdown supports multiple selection. */
  activeSelectedIndex?: number;

  /** Whether the ComboBox allows freeform user input, rather than restricting to the provided options. */
  allowFreeform?: boolean;

  /** Identifies the element (or elements) that labels the current element. Will be passed to `triggerButton`. */
  'aria-labelledby'?: AccessibilityAttributes['aria-labelledby'];
  'aria-describedby'?: AccessibilityAttributes['aria-describedby'];

  /** Indicates the entered value does not conform to the format expected by the application. Will be passed to `triggerButton`. */
  'aria-invalid'?: AccessibilityAttributes['aria-invalid'];

  /** A dropdown item can show a check indicator if it is selected. */
  checkable?: boolean;

  /** A slot for a selected indicator in the dropdown list. */
  checkableIndicator?: ShorthandValue<BoxProps>;

  /** A dropdown can be clearable to let users remove their selection. */
  clearable?: boolean;

  /** A slot for the clearing indicator. */
  clearIndicator?: ShorthandValue<BoxProps>;

  /** The initial value for the index of the currently selected item in a multiple selection. */
  defaultActiveSelectedIndex?: number;

  /** The initial value for 'open' in uncontrolled mode. */
  defaultOpen?: boolean;

  /** The initial list item index to highlight. */
  defaultHighlightedIndex?: number;

  /** The initial value for the search query if the dropdown has `search` enabled. */
  defaultSearchQuery?: string;

  /** The initial value (or value array if the array has multiple selection). */
  defaultValue?: ShorthandValue<DropdownItemProps> | ShorthandCollection<DropdownItemProps>;

  /** A dropdown can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A dropdown can fill the width of its container. */
  fluid?: boolean;

  /** Object with callbacks for generating announcements for item selection and removal. */
  getA11ySelectionMessage?: {
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item added to selection.
     * @param item - Dropdown added element.
     */
    onAdd?: (item: ShorthandValue<DropdownItemProps>) => string;
    /**
     * Callback that creates custom accessibility message a screen reader narrates on item removed from selection.
     * @param item - Dropdown removed element.
     */
    onRemove?: (item: ShorthandValue<DropdownItemProps>) => string;
    /**
     * Callback that creates custom accessibility message about the selected items count a screen reader narrates on input field focus.
     * @param count - number of items selected.
     */
    itemsCount?: (count: number) => string;
  };

  /** A label for selected items listbox. */
  a11ySelectedItemsMessage?: string;

  /**
   * Callback that provides status announcement message with number of items in the list, using Arrow Up/Down keys to navigate through them and, if multiple, using Arrow Left/Right to navigate through selected items.
   * @param messageGenerationProps - Object with properties to generate message from. See getA11yStatusMessage from Downshift repo.
   */
  getA11yStatusMessage?: (options: DownshiftA11yStatusMessageOptions<ShorthandValue<DropdownItemProps>>) => string;

  /** A dropdown can highlight the first option when it opens. */
  highlightFirstItemOnOpen?: boolean;

  /** The index of the list item to highlight. */
  highlightedIndex?: number;

  /** A dropdown can be formatted to appear inline next to other elements. */
  inline?: boolean;

  /** A dropdown can have inverted colors. */
  inverted?: boolean;

  /** Array of props for generating list options (Dropdown.Item[]) and selected item labels (Dropdown.SelectedItem[]), if it's a multiple selection. */
  items?: ShorthandCollection<DropdownItemProps>;

  /**
   * A function that converts an item to string. Used when dropdown has `search` enabled.
   * By default, it:
   * - returns the `header` property if it exists on an item
   * - stringifies the item if it is a primitive type
   */
  itemToString?: (item: ShorthandValue<DropdownItemProps>) => string;

  /** Used when comparing two items in multiple selection. Default comparison is by the header prop. */
  itemToValue?: (item: ShorthandValue<DropdownItemProps>) => any;

  /** A message to be displayed in the list header. */
  headerMessage?: ShorthandValue<DropdownItemProps>;

  /** A slot for dropdown list. */
  list?: ShorthandValue<ListProps & { popper?: PopperShorthandProps }>;

  /** A dropdown can show that it is currently loading data. */
  loading?: boolean;

  /** A message to be displayed in the list when the dropdown is loading. */
  loadingMessage?: ShorthandValue<DropdownItemProps>;

  /** When selecting an element with Tab, focus stays on the dropdown by default. If true, the focus will jump to next/previous element in DOM. Only available to multiple selection dropdowns. */
  moveFocusOnTab?: boolean;

  /** A dropdown can allow a user to select multiple items. */
  multiple?: boolean;

  /** A message to be displayed in the list when the dropdown has no items. */
  noResultsMessage?: ShorthandValue<DropdownItemProps>;

  /**
   * Called when the dropdown's selected items index change.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and the new selected value(s).
   */
  onActiveSelectedIndexChange?: (event: React.MouseEvent | React.KeyboardEvent | null, data: DropdownProps) => void;

  /**
   * Called when the dropdown's highlighted index change.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and the new selected value(s).
   */
  onHighlightedIndexChange?: (event: React.MouseEvent | React.KeyboardEvent | null, data: DropdownProps) => void;

  /**
   * Called when the dropdown opens or closes.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `open` reflecting the new open state.
   */
  onOpenChange?: (event: React.MouseEvent | React.KeyboardEvent | null, data: DropdownProps) => void;

  /**
   * Called when the dropdown's search query changes.
   * @param event - React's original SyntheticEvent.
   * @param data - All props, with `searchQuery` reflecting its new value.
   */
  onSearchQueryChange?: (event: React.MouseEvent | React.KeyboardEvent | null, data: DropdownProps) => void;

  /**
   * Called when the dropdown's selected item(s) change.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and the new selected value(s).
   */
  onChange?: (event: React.MouseEvent | React.KeyboardEvent | null, data: DropdownProps) => void;

  /**
   * Called when the focus moves out from dropdown.
   * @param event - React's original SyntheticEvent.
   */
  onBlur?: (event: React.FocusEvent | null) => void;

  /** A dropdown's open state can be controlled. */
  open?: boolean;

  /** A placeholder message for the input field. */
  placeholder?: string;

  /**
   * A render function to customize how items are rendered in the dropdown.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItem?: ShorthandRenderFunction<DropdownItemProps>;

  /**
   * A custom render function for the selected item. Only applicable with the `multiple` prop.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderSelectedItem?: ShorthandRenderFunction<DropdownSelectedItemProps>;

  /** A dropdown can have a search field instead of trigger button. Can receive a custom search function that will replace the default equivalent. */
  search?:
    | boolean
    | ((items: ShorthandCollection<DropdownItemProps>, searchQuery: string) => ShorthandCollection<DropdownItemProps>);

  /** A search dropdown's input can be customized. */
  searchInput?: ShorthandValue<DropdownSearchInputProps>;

  /** Sets search query value (controlled mode). */
  searchQuery?: string;

  /** Controls the appearance of the indicator that shows/hides the list of items. */
  toggleIndicator?: ShorthandValue<BoxProps>;

  /** Controls the appearance of the trigger button if it's a selection dropdown (not a search). */
  triggerButton?: ShorthandValue<ButtonProps>;

  /** Sets the dropdown's currently selected value(s) in controlled mode. */
  value?: ShorthandValue<DropdownItemProps> | ShorthandCollection<DropdownItemProps>;

  /** Dropdown can have errors status  */
  error?: boolean;
}

export type DropdownStylesProps = Required<
  Pick<DropdownProps, 'disabled' | 'error' | 'fluid' | 'inline' | 'inverted' | 'multiple' | 'position' | 'open'>
> & {
  focused: boolean;
  isEmptyClearIndicator: boolean;
  hasToggleIndicator: boolean;
  isFromKeyboard: boolean;
  search: boolean;
  hasItemsSelected: boolean;
};

type DropdownStateForInvoke = {
  activeSelectedIndex?: number | null;
  highlightedIndex?: number | null;
  itemIsFromKeyboard?: boolean;
  open?: boolean;
  searchQuery?: string;
  value?: ShorthandCollection<DropdownItemProps>;
};

export const dropdownClassName = 'ui-dropdown';
export const dropdownSlotClassNames: DropdownSlotClassNames = {
  clearIndicator: `${dropdownClassName}__clear-indicator`,
  container: `${dropdownClassName}__container`,
  toggleIndicator: `${dropdownClassName}__toggle-indicator`,
  item: `${dropdownClassName}__item`,
  itemsCount: `${dropdownClassName}__items-count`,
  itemsList: `${dropdownClassName}__items-list`,
  searchInput: `${dropdownClassName}__searchinput`,
  selectedItem: `${dropdownClassName}__selecteditem`,
  selectedItems: `${dropdownClassName}__selected-items`,
  triggerButton: `${dropdownClassName}__trigger-button`,
};

const a11yStatusCleanupTime = 500;
const charKeyPressedCleanupTime = 500;

/** `normalizedValue` should be normalized always as it can be received from props */
function normalizeValue(multiple: boolean, rawValue: DropdownProps['value']): ShorthandCollection<DropdownItemProps> {
  const normalizedValue = Array.isArray(rawValue) ? rawValue : [rawValue];

  if (multiple) {
    return normalizedValue;
  }

  if (normalizedValue[0] === '') {
    return [];
  }

  return normalizedValue.slice(0, 1);
}

/**
 * Used to compute the filtered items (by value and search query) and, if needed,
 * their string equivalents, in order to be used throughout the component.
 */
function getFilteredValues(
  options: Required<
    Pick<DropdownProps, 'multiple' | 'items' | 'itemToValue' | 'itemToString' | 'search' | 'searchQuery'>
  > & {
    value: ShorthandCollection<DropdownItemProps>;
  },
) {
  const { items, itemToString, itemToValue, multiple, search, searchQuery, value } = options;

  const filteredItemsByValue = multiple ? _.differenceBy(items, value, itemToValue) : items;
  const filteredItemStrings = _.map(filteredItemsByValue, filteredItem => itemToString(filteredItem).toLowerCase());

  if (search) {
    if (_.isFunction(search)) {
      return {
        filteredItems: search(filteredItemsByValue, searchQuery),
        filteredItemStrings,
      };
    }

    return {
      filteredItems: filteredItemsByValue.filter(
        item => itemToString(item).toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1,
      ),
      filteredItemStrings,
    };
  }

  return {
    filteredItems: filteredItemsByValue,
    filteredItemStrings,
  };
}

const isEmpty = prop => {
  return typeof prop === 'object' && !prop.props && !_.get(prop, 'children') && !_.get(prop, 'content');
};

/**
 * A Dropdown allows user to select one or more values from a list of options.
 * Can be created with search and multi-selection capabilities.
 *
 * @accessibility
 * Implements [ARIA Combo Box](https://www.w3.org/TR/wai-aria-practices-1.1/#combobox) design pattern, uses aria-live to announce state changes.
 * @accessibilityIssues
 * [Issue 991203: VoiceOver doesn't narrate properly elements in the input/combobox](https://bugs.chromium.org/p/chromium/issues/detail?id=991203)
 * [JAWS - ESC (ESCAPE) not closing collapsible listbox (dropdown) on first time #528](https://github.com/FreedomScientific/VFO-standards-support/issues/528)
 */
export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Dropdown.displayName, context.telemetry);

  setStart();

  const {
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-invalid': ariaInvalid,
    allowFreeform,
    clearable,
    clearIndicator,
    checkable,
    checkableIndicator,
    className,
    design,
    disabled,
    error,
    fluid,
    getA11ySelectionMessage,
    a11ySelectedItemsMessage,
    getA11yStatusMessage,
    inline,
    inverted,
    itemToString,
    itemToValue,
    items,
    highlightFirstItemOnOpen,
    multiple,
    headerMessage,
    moveFocusOnTab,
    noResultsMessage,
    loading,
    loadingMessage,
    placeholder,
    renderItem,
    renderSelectedItem,
    search,
    searchInput,
    styles,
    toggleIndicator,
    triggerButton,
    variables,
  } = props;

  const {
    align,
    flipBoundary,
    overflowBoundary,
    position,
    positionFixed,
    offset,
    unstable_disableTether,
    unstable_pinned,
    autoSize,
  } = props; // PositioningProps passed directly to Dropdown
  const [list, positioningProps] = partitionPopperPropsFromShorthand(props.list); // PositioningProps passed to Dropdown `list` prop's `popper` key

  const buttonRef = React.useRef<HTMLElement>();
  const inputRef = React.useRef<HTMLInputElement | undefined>() as React.MutableRefObject<HTMLInputElement | undefined>;
  const listRef = React.useRef<HTMLElement>();
  const selectedItemsRef = React.useRef<HTMLDivElement>();
  const containerRef = React.useRef<HTMLDivElement>();

  const defaultTriggerButtonId = React.useMemo(() => _.uniqueId('dropdown-trigger-button-'), []);
  const selectedItemsCountNarrationId = React.useMemo(() => _.uniqueId('dropdown-selected-items-count-'), []);

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Dropdown.handledProps, props);

  const [activeSelectedIndex, setActiveSelectedIndex] = useAutoControlled<number | null | undefined>({
    defaultValue: props.defaultActiveSelectedIndex,
    initialValue: multiple ? null : undefined,
    value: props.activeSelectedIndex,
  });
  const [highlightedIndex, setHighlightedIndex] = useAutoControlled<number | null>({
    defaultValue: props.defaultHighlightedIndex,
    initialValue: highlightFirstItemOnOpen ? 0 : null,
    value: props.highlightedIndex,
  });
  const [open, setOpen] = useAutoControlled({
    defaultValue: props.defaultOpen,
    initialValue: false,
    value: props.open,
  });
  const [searchQuery, setSearchQuery] = useAutoControlled<string | undefined>({
    defaultValue: props.defaultSearchQuery,
    initialValue: search ? '' : undefined,
    value: props.searchQuery,
  });
  const [rawValue, setValue] = useAutoControlled({
    defaultValue: props.defaultValue,
    initialValue: [],
    value: props.value,
  });
  const value = normalizeValue(multiple, rawValue);

  const [a11ySelectionStatus, setA11ySelectionStatus] = React.useState('');
  const [focused, setFocused] = React.useState(false);
  const [isFromKeyboard, setIsFromKeyboard] = React.useState(false);
  const [itemIsFromKeyboard, setItemIsFromKeyboard] = React.useState(false);
  const [startingString, setStartingString] = React.useState<string | undefined>(search ? undefined : '');
  // used for keeping track of the source of the input, as Downshift does not pass events to the handlers
  // for free form dropdown:
  // - if the value is changed based on search query change (from input), accept any value even if not in the list
  // - if the value is changed based on selection from list, use the value from the list item
  const inListbox = React.useRef(false);

  const { filteredItems, filteredItemStrings } = getFilteredValues({
    itemToString,
    itemToValue,
    items,
    multiple,
    search,
    searchQuery,
    value,
  });

  const { classes, styles: resolvedStyles } = useStyles<DropdownStylesProps>(Dropdown.displayName, {
    className: dropdownClassName,
    mapPropsToStyles: () => ({
      disabled,
      error,
      fluid,
      focused,
      isEmptyClearIndicator: isEmpty(clearIndicator),
      hasToggleIndicator: !!toggleIndicator,
      inline,
      inverted,
      isFromKeyboard,
      multiple,
      open,
      position: positioningProps?.position ?? position,
      search: !!search,
      hasItemsSelected: value.length > 0,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const popperRef = useMergedRefs(props.popperRef);

  useIsomorphicLayoutEffect(() => {
    popperRef.current?.updatePosition();
  }, [filteredItems?.length, popperRef]);

  const clearA11ySelectionMessage = React.useMemo(
    () =>
      _.debounce(() => {
        setA11ySelectionStatus('');
      }, a11yStatusCleanupTime),
    [],
  );
  const clearStartingString = React.useMemo(
    () =>
      _.debounce(() => {
        setStartingString('');
      }, charKeyPressedCleanupTime),
    [],
  );

  const handleChange = (e: React.SyntheticEvent) => {
    // Dropdown component doesn't present any `input` component in markup, however all of our
    // components should handle events transparently.
    _.invoke(props, 'onChange', e, { ...props, value });
  };

  const handleOnBlur = (e: React.SyntheticEvent) => {
    // Dropdown component doesn't present any `input` component in markup, however all of our
    // components should handle events transparently.
    if (e.target !== buttonRef.current) {
      _.invoke(props, 'onBlur', e, props);
    }
  };

  const renderTriggerButton = (getToggleButtonProps: (options?: GetToggleButtonPropsOptions) => any): JSX.Element => {
    const content = getSelectedItemAsString(value[0]);
    const triggerButtonId = triggerButton['id'] || defaultTriggerButtonId;
    const triggerButtonContentId = `${triggerButtonId}__content`;
    const triggerButtonProps = getToggleButtonProps({
      disabled,
      onFocus: handleTriggerButtonOrListFocus,
      onBlur: handleTriggerButtonBlur,
      onKeyDown: e => {
        handleTriggerButtonKeyDown(e);
      },
      'aria-invalid': ariaInvalid,
      'aria-label': undefined,
      'aria-labelledby': [ariaLabelledby, triggerButtonContentId].filter(Boolean).join(' '),
      ...(open && { 'aria-expanded': true }),
    });

    const { onClick, onFocus, onBlur, onKeyDown, ...restTriggerButtonProps } = triggerButtonProps;

    return (
      <Ref innerRef={buttonRef}>
        {createShorthand(Button, triggerButton, {
          defaultProps: () => ({
            className: dropdownSlotClassNames.triggerButton,
            disabled,
            id: triggerButtonId,
            fluid: true,
            styles: resolvedStyles.triggerButton,
            ...restTriggerButtonProps,
          }),
          overrideProps: (predefinedProps: ButtonProps) => {
            // It can be a shorthand
            const resolvedContent = _.isPlainObject(predefinedProps.content)
              ? (predefinedProps.content as {})
              : predefinedProps.content
              ? { children: predefinedProps.content }
              : {};

            return {
              content:
                // If `null` is passed we should not render the slot
                predefinedProps.content === null ? null : { content, id: triggerButtonContentId, ...resolvedContent },
              onClick: e => {
                onClick(e);
                _.invoke(predefinedProps, 'onClick', e, predefinedProps);
              },
              onFocus: e => {
                onFocus(e);
                _.invoke(predefinedProps, 'onFocus', e, predefinedProps);
              },
              onBlur: e => {
                if (!disabled) {
                  onBlur(e);
                }

                _.invoke(predefinedProps, 'onBlur', e, predefinedProps);
              },
              onKeyDown: e => {
                if (!disabled) {
                  onKeyDown(e);
                }

                _.invoke(predefinedProps, 'onKeyDown', e, predefinedProps);
              },
            };
          },
        })}
      </Ref>
    );
  };

  const renderSearchInput = (
    accessibilityComboboxProps: Object,
    highlightedIndex: number,
    getInputProps: (options?: GetInputPropsOptions) => any,
    selectItemAtIndex: (index: number, otherStateToSet?: Partial<StateChangeOptions<any>>, cb?: () => void) => void,
    toggleMenu: () => void,
    variables,
  ): JSX.Element => {
    const noPlaceholder = searchQuery?.length > 0 || (multiple && value.length > 0);
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    const comboboxProps = isMac
      ? { ...accessibilityComboboxProps, 'aria-owns': undefined }
      : accessibilityComboboxProps;

    return DropdownSearchInput.create(searchInput || {}, {
      defaultProps: () => ({
        className: dropdownSlotClassNames.searchInput,
        placeholder: noPlaceholder ? '' : placeholder,
        inline,
        variables,
        disabled,
      }),
      overrideProps: handleSearchInputOverrides(
        highlightedIndex,
        selectItemAtIndex,
        toggleMenu,
        comboboxProps,
        getInputProps,
      ),
    });
  };

  const renderSelectedItemsCountNarration = id => {
    // Get narration only if callback is provided, at least one item is selected and only in multiple case
    if (!getA11ySelectionMessage || !getA11ySelectionMessage.itemsCount || value.length === 0 || !multiple) {
      return null;
    }
    const narration = getA11ySelectionMessage.itemsCount(value.length);
    return (
      <span id={id} className={dropdownSlotClassNames.itemsCount} style={screenReaderContainerStyles}>
        {narration}
      </span>
    );
  };
  const renderItemsList = (
    highlightedIndex: number,
    toggleMenu: () => void,
    selectItemAtIndex: (index: number) => void,
    getMenuProps: (options?: GetMenuPropsOptions, otherOptions?: GetPropsCommonOptions) => any,
    getItemProps: (options: GetItemPropsOptions<ShorthandValue<DropdownItemProps>>) => any,
    getInputProps: (options?: GetInputPropsOptions) => any,
  ) => {
    const items = open ? renderItems(getItemProps) : [];
    const { innerRef, ...accessibilityMenuProps } = getMenuProps({ refKey: 'innerRef' }, { suppressRefError: true });

    // If it's just a selection, some attributes and listeners from Downshift input need to go on the menu list.
    if (!search) {
      const accessibilityInputProps = getInputProps();

      accessibilityMenuProps['aria-activedescendant'] = accessibilityInputProps['aria-activedescendant'];
      accessibilityMenuProps['onKeyDown'] = e => {
        handleListKeyDown(e, highlightedIndex, accessibilityInputProps['onKeyDown'], toggleMenu, selectItemAtIndex);
      };
    }

    return (
      <Ref
        innerRef={(listElement: HTMLElement) => {
          handleRef(listRef, listElement);
          handleRef(innerRef, listElement);
        }}
      >
        <Popper
          rtl={context.rtl}
          enabled={open}
          targetRef={containerRef}
          positioningDependencies={[items.length]}
          // positioning props:
          align={align}
          flipBoundary={flipBoundary}
          overflowBoundary={overflowBoundary}
          popperRef={popperRef}
          position={position}
          positionFixed={positionFixed}
          offset={offset}
          unstable_disableTether={unstable_disableTether}
          unstable_pinned={unstable_pinned}
          autoSize={autoSize}
          {...positioningProps}
        >
          {List.create(list, {
            defaultProps: () => ({
              className: dropdownSlotClassNames.itemsList,
              ...accessibilityMenuProps,
              styles: resolvedStyles.list,
              items,
              tabIndex: search ? undefined : -1, // needs to be focused when trigger button is activated.
              'aria-hidden': !open,
            }),

            overrideProps: (predefinedProps: ListProps) => ({
              onFocus: (e: React.SyntheticEvent<HTMLElement>, listProps: ListProps) => {
                handleTriggerButtonOrListFocus();
                _.invoke(predefinedProps, 'onClick', e, listProps);
              },
              onBlur: (e: React.SyntheticEvent<HTMLElement>, listProps: ListProps) => {
                handleListBlur(e);
                _.invoke(predefinedProps, 'onBlur', e, listProps);
              },
            }),
          })}
        </Popper>
      </Ref>
    );
  };

  const renderItems = (getItemProps: (options: GetItemPropsOptions<ShorthandValue<DropdownItemProps>>) => any) => {
    const footerItem = renderItemsListFooter();
    const headerItem = renderItemsListHeader();

    const items = _.map(filteredItems, (item, index) => ({
      children: () => {
        const selected = value.indexOf(item) !== -1;

        return DropdownItem.create(item, {
          defaultProps: () => ({
            className: dropdownSlotClassNames.item,
            active: highlightedIndex === index,
            selected,
            checkable,
            checkableIndicator,
            isFromKeyboard: itemIsFromKeyboard,
            variables,
            ...(typeof item === 'object' &&
              !item.hasOwnProperty('key') && {
                key: (item as any).header,
              }),
          }),
          overrideProps: handleItemOverrides(item, index, getItemProps, selected),
          render: renderItem,
        });
      },
    }));

    if (footerItem) {
      items.push(footerItem);
    }

    return headerItem ? [headerItem, ...items] : items;
  };

  const renderItemsListHeader = () => {
    if (headerMessage) {
      return {
        children: () =>
          DropdownItem.create(headerMessage, {
            defaultProps: () => ({
              key: 'items-list-footer-message',
              styles: resolvedStyles.headerMessage,
            }),
          }),
      };
    }

    return null;
  };

  const renderItemsListFooter = () => {
    if (loading) {
      return {
        children: () =>
          DropdownItem.create(loadingMessage, {
            defaultProps: () => ({
              key: 'loading-message',
              styles: resolvedStyles.loadingMessage,
            }),
          }),
      };
    }

    if (filteredItems && filteredItems.length === 0) {
      return {
        children: () =>
          DropdownItem.create(noResultsMessage, {
            defaultProps: () => ({
              key: 'no-results-message',
              styles: resolvedStyles.noResultsMessage,
            }),
          }),
      };
    }

    return null;
  };

  const selectedItemsCountNarration = renderSelectedItemsCountNarration(selectedItemsCountNarrationId);
  const renderSelectedItems = () => {
    if (value.length === 0) {
      return null;
    }

    const selectedItems = value.map((item: DropdownItemProps, index) =>
      // (!) an item matches DropdownItemProps
      DropdownSelectedItem.create(item, {
        defaultProps: () => ({
          className: dropdownSlotClassNames.selectedItem,
          active: isSelectedItemActive(index),
          disabled,
          variables,
          ...(typeof item === 'object' &&
            !item.hasOwnProperty('key') && {
              key: (item as any).header,
            }),
        }),
        overrideProps: handleSelectedItemOverrides(item),
        render: renderSelectedItem,
      }),
    );
    return (
      <>
        <div role="listbox" tabIndex={-1} aria-label={a11ySelectedItemsMessage}>
          {selectedItems}
        </div>
        {selectedItemsCountNarration}
      </>
    );
  };

  const downshiftStateReducer = (
    state: DownshiftState<ShorthandValue<DropdownItemProps>>,
    changes: StateChangeOptions<ShorthandValue<DropdownItemProps>>,
  ) => {
    const activeElement: Element = context.target.activeElement;

    switch (changes.type) {
      case Downshift.stateChangeTypes.blurButton:
        // Downshift closes the list by default on trigger blur. It does not support the case when dropdown is
        // single selection and focuses list on trigger click/up/down/space/enter. Treating that here.
        if (state.isOpen && activeElement === listRef.current) {
          return {}; // won't change state in this case.
        }
        _.invoke(props, 'onBlur', null);
      default:
        return changes;
    }
  };

  const handleInputValueChange = (
    inputValue: string,
    stateAndHelpers: ControllerStateAndHelpers<ShorthandValue<DropdownItemProps>>,
  ) => {
    const itemSelected = stateAndHelpers.selectedItem && inputValue === itemToString(stateAndHelpers.selectedItem);
    if (
      inputValue !== searchQuery &&
      !itemSelected // when item is selected, `handleStateChange` will update searchQuery.
    ) {
      setStateAndInvokeHandler(['onSearchQueryChange'], null, {
        searchQuery: inputValue,
      });
    }
  };

  const handleStateChange = (changes: StateChangeOptions<ShorthandValue<DropdownItemProps>>) => {
    const { type } = changes;
    const newState = {} as DropdownStateForInvoke;

    switch (type) {
      case Downshift.stateChangeTypes.changeInput: {
        const shouldValueChange = changes.inputValue === '' && !multiple && value.length > 0;

        if (allowFreeform) {
          // set highlighted index to first item starting with search query
          const itemIndex = items.findIndex(i =>
            itemToString(i)?.toLocaleLowerCase().startsWith(changes.inputValue?.toLowerCase()),
          );
          if (itemIndex !== -1) {
            newState.highlightedIndex = itemIndex;
            // for free form always keep searchQuery and inputValue in sync
            // as state change might not be called after last letter was entered
            newState.searchQuery = changes.inputValue;
          }
        } else {
          newState.highlightedIndex = highlightFirstItemOnOpen ? 0 : null;
        }

        if (shouldValueChange) {
          newState.value = [];
        }

        if (open) {
          // we clear value when in single selection user cleared the query.
          const shouldMenuClose = changes.inputValue === '' || changes.selectedItem !== undefined;

          if (shouldMenuClose) {
            newState.open = false;
          }
        } else {
          newState.open = true;
        }

        break;
      }
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        const shouldAddHighlightedIndex = !multiple && items && items.length > 0;
        const isSameItemSelected = changes.selectedItem === undefined;
        const newValue = isSameItemSelected ? value[0] : changes.selectedItem;

        newState.searchQuery = getSelectedItemAsString(newValue);
        if (allowFreeform && !inListbox.current && type === Downshift.stateChangeTypes.keyDownEnter) {
          const itemIndex = items.findIndex(i =>
            itemToString(i)?.toLocaleLowerCase().startsWith(searchQuery?.toLocaleLowerCase()),
          );

          // if there is an item that starts with searchQuery, still apply the search query
          // to do auto complete (you enter '12:', can be completed to '12:00')
          if (itemIndex === -1) {
            delete newState.searchQuery;
          }
        }

        newState.open = false;
        newState.highlightedIndex = shouldAddHighlightedIndex ? items.indexOf(newValue) : null;
        inListbox.current = false;

        if (!isSameItemSelected) {
          newState.value = multiple ? [...value, changes.selectedItem] : [changes.selectedItem];

          if (getA11ySelectionMessage && getA11ySelectionMessage.onAdd) {
            setA11ySelectionMessage(getA11ySelectionMessage.onAdd(newValue));
          }
        }

        if (multiple) {
          context.target?.defaultView.setTimeout(
            () => (selectedItemsRef.current.scrollTop = selectedItemsRef.current.scrollHeight),
            0,
          );
        }

        // timeout because of NVDA, otherwise it narrates old button value/state
        context.target?.defaultView.setTimeout(() => tryFocusTriggerButton(), 100);

        break;
      case Downshift.stateChangeTypes.keyDownEscape:
        if (search && !multiple) {
          newState.value = [];
        }
        newState.open = false;
        newState.highlightedIndex = highlightFirstItemOnOpen ? 0 : null;
        break;
      case Downshift.stateChangeTypes.keyDownArrowDown:
      case Downshift.stateChangeTypes.keyDownArrowUp:
        if (changes.isOpen !== undefined) {
          newState.open = changes.isOpen;
          newState.highlightedIndex = changes.highlightedIndex;

          if (changes.isOpen) {
            const highlightedIndexOnArrowKeyOpen = getHighlightedIndexOnArrowKeyOpen(changes);

            if (_.isNumber(highlightedIndexOnArrowKeyOpen)) {
              newState.highlightedIndex = highlightedIndexOnArrowKeyOpen;
            }

            if (!search) {
              listRef.current.focus();
            }
          } else {
            newState.highlightedIndex = null;
          }
        }
      case Downshift.stateChangeTypes['keyDownHome']:
      case Downshift.stateChangeTypes['keyDownEnd']:
        if (open && _.isNumber(changes.highlightedIndex)) {
          newState.highlightedIndex = changes.highlightedIndex;
          newState.itemIsFromKeyboard = true;
        }

        break;
      case Downshift.stateChangeTypes.mouseUp:
        if (open) {
          newState.open = false;
          if (allowFreeform) {
            const itemIndex = items.findIndex(i =>
              itemToString(i)?.toLowerCase().startsWith(searchQuery?.toLowerCase()),
            );

            // if there is an item that starts with searchQuery, still apply the search query
            // to do auto complete (you enter '12:', can be completed to '12:00')
            if (itemIndex !== -1) {
              newState.searchQuery = itemToString(items[itemIndex]);
            }
          } else {
            newState.highlightedIndex = null;
          }
        }

        break;
      case Downshift.stateChangeTypes.clickButton:
      case Downshift.stateChangeTypes.keyDownSpaceButton:
        newState.open = changes.isOpen;
        newState.itemIsFromKeyboard = isFromKeyboard;

        if (changes.isOpen) {
          const highlightedIndexOnArrowKeyOpen = getHighlightedIndexOnArrowKeyOpen(changes);

          if (_.isNumber(highlightedIndexOnArrowKeyOpen)) {
            newState.highlightedIndex = highlightedIndexOnArrowKeyOpen;
          }

          if (!search) {
            listRef.current.focus();
          }
        } else if (allowFreeform) {
          const itemIndex = items.findIndex(i =>
            itemToString(i)?.toLocaleLowerCase().startsWith(searchQuery.toLowerCase()),
          );

          // if there is an item that starts with searchQuery, still apply the search query
          // to do auto complete (you enter '12:', can be completed to '12:00')
          if (itemIndex !== -1) {
            newState.searchQuery = itemToString(items[itemIndex]);
          }
        } else {
          newState.highlightedIndex = null;
        }
        break;
      case Downshift.stateChangeTypes.itemMouseEnter:
        newState.highlightedIndex = changes.highlightedIndex;
        newState.itemIsFromKeyboard = false;
        break;
      case Downshift.stateChangeTypes.unknown:
        if (changes.selectedItem) {
          newState.value = multiple ? [...value, changes.selectedItem] : [changes.selectedItem];
          newState.searchQuery = multiple ? '' : changes.inputValue;
          newState.open = false;
          newState.highlightedIndex = changes.highlightedIndex;

          tryFocusTriggerButton();
        } else {
          newState.open = changes.isOpen;
        }
      default:
        break;
    }

    if (_.isEmpty(newState)) {
      return;
    }

    const handlers: (keyof DropdownProps)[] = [
      newState.highlightedIndex !== undefined && 'onHighlightedIndexChange',
      newState.open !== undefined && 'onOpenChange',
      newState.searchQuery !== undefined && 'onSearchQueryChange',
      newState.value !== undefined && 'onChange',
    ].filter(Boolean) as (keyof DropdownProps)[];

    setStateAndInvokeHandler(handlers, null, newState);
  };

  const isSelectedItemActive = (index: number): boolean => {
    return index === activeSelectedIndex;
  };

  const handleItemOverrides =
    (
      item: ShorthandValue<DropdownItemProps>,
      index: number,
      getItemProps: (options: GetItemPropsOptions<ShorthandValue<DropdownItemProps>>) => any,
      selected: boolean,
    ) =>
    (predefinedProps: DropdownItemProps) => ({
      accessibilityItemProps: {
        ...getItemProps({
          item,
          index,
          disabled: item['disabled'],
          onClick: e => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            _.invoke(predefinedProps, 'onClick', e, predefinedProps);
          },
        }),
        // for single selection the selected item should have aria-selected, instead of the highlighted
        ...(!multiple && {
          'aria-selected': selected,
        }),
      },
    });

  const handleSelectedItemOverrides =
    (item: ShorthandValue<DropdownItemProps>) => (predefinedProps: DropdownSelectedItemProps) => ({
      onRemove: (e: React.SyntheticEvent, dropdownSelectedItemProps: DropdownSelectedItemProps) => {
        handleSelectedItemRemove(e, item, predefinedProps, dropdownSelectedItemProps);
      },
      onClick: (e: React.SyntheticEvent, dropdownSelectedItemProps: DropdownSelectedItemProps) => {
        setStateAndInvokeHandler(['onActiveSelectedIndexChange'], null, {
          activeSelectedIndex: value.indexOf(item),
        });
        e.stopPropagation();
        _.invoke(predefinedProps, 'onClick', e, dropdownSelectedItemProps);
      },
      onKeyDown: (e: React.KeyboardEvent, dropdownSelectedItemProps: DropdownSelectedItemProps) => {
        handleSelectedItemKeyDown(e, item, predefinedProps, dropdownSelectedItemProps);
      },
    });

  const handleSearchInputOverrides =
    (
      highlightedIndex: number,
      selectItemAtIndex: (index: number, otherStateToSet?: Partial<StateChangeOptions<any>>, cb?: () => void) => void,
      toggleMenu: () => void,
      accessibilityComboboxProps: Object,
      getInputProps: (options?: GetInputPropsOptions) => any,
    ) =>
    (predefinedProps: DropdownSearchInputProps) => {
      const handleInputBlur = (e: React.SyntheticEvent, searchInputProps: DropdownSearchInputProps) => {
        if (!disabled) {
          setFocused(false);
          setIsFromKeyboard(detectIsFromKeyboard());

          e.nativeEvent['preventDownshiftDefault'] = true;
        }

        _.invoke(predefinedProps, 'onInputBlur', e, searchInputProps);
      };

      const handleInputKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        searchInputProps: DropdownSearchInputProps,
      ) => {
        if (!disabled) {
          switch (getCode(e)) {
            // https://github.com/downshift-js/downshift/issues/1097
            // Downshift skips Home/End if Deopdown is opened
            case keyboardKey.Home:
              e.nativeEvent['preventDownshiftDefault'] = filteredItems.length === 0;
              break;
            case keyboardKey.End:
              e.nativeEvent['preventDownshiftDefault'] = filteredItems.length === 0;
              break;
            case keyboardKey.Tab:
              e.stopPropagation();
              handleTabSelection(e, highlightedIndex, selectItemAtIndex, toggleMenu);
              break;
            case keyboardKey.ArrowLeft:
              e.stopPropagation();
              if (!context.rtl) {
                // https://github.com/testing-library/user-event/issues/709
                // JSDOM does not implement `event.view` so prune this code path in test
                if (process.env.NODE_ENV !== 'test') {
                  setWhatInputSource(e.view.document, 'keyboard');
                }
                trySetLastSelectedItemAsActive();
              }
              break;
            case keyboardKey.ArrowRight:
              e.stopPropagation();
              if (context.rtl) {
                // https://github.com/testing-library/user-event/issues/709
                // JSDOM does not implement `event.view` so prune this code path in test
                if (process.env.NODE_ENV !== 'test') {
                  setWhatInputSource(e.view.document, 'keyboard');
                }
                trySetLastSelectedItemAsActive();
              }
              break;
            case keyboardKey.Backspace:
              e.stopPropagation();
              tryRemoveItemFromValue();
              break;
            case keyboardKey.Escape:
              // If dropdown list is open ESC should close it and not propagate to the parent
              // otherwise event should propagate
              if (open) {
                e.stopPropagation();
              }
            case keyboardKey.ArrowUp:
            case keyboardKey.ArrowDown:
              if (allowFreeform) {
                inListbox.current = true;
              }
              break;
            default:
              if (getCode(e) !== keyboardKey.Enter) {
                inListbox.current = false;
              }
              break;
          }
        }

        _.invoke(predefinedProps, 'onInputKeyDown', e, {
          ...searchInputProps,
          highlightedIndex,
          selectItemAtIndex,
        });
      };

      return {
        // getInputProps adds Downshift handlers. We also add our own by passing them as params to that function.
        // user handlers were also added to our handlers previously, at the beginning of this function.
        accessibilityInputProps: {
          ...getInputProps({
            disabled,
            onBlur: e => {
              handleInputBlur(e, predefinedProps);
            },
            onKeyDown: e => {
              handleInputKeyDown(e, predefinedProps);
            },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              // we prevent the onChange input event to bubble up to our Dropdown handler,
              // since in Dropdown it gets handled as onSearchQueryChange.
              e.stopPropagation();

              // A state modification should be triggered there otherwise it will go to an another frame and will break
              // cursor position:
              // https://github.com/facebook/react/issues/955#issuecomment-469352730
              setSearchQuery(e.target.value);
            },
            'aria-labelledby': ariaLabelledby,
            'aria-describedby': ariaDescribedby || selectedItemsCountNarrationId,
          }),
        },
        // same story as above for getRootProps.
        accessibilityComboboxProps,

        inputRef: (node: HTMLInputElement) => {
          handleRef(predefinedProps.inputRef, node);
          inputRef.current = node;
        },
        onFocus: (e: React.FocusEvent, searchInputProps: DropdownSearchInputProps) => {
          if (!disabled) {
            setFocused(true);
            setIsFromKeyboard(detectIsFromKeyboard());
          }

          _.invoke(predefinedProps, 'onFocus', e, searchInputProps);
        },
        onInputBlur: (e: React.FocusEvent, searchInputProps: DropdownSearchInputProps) => {
          handleInputBlur(e, searchInputProps);
        },
        onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, searchInputProps: DropdownSearchInputProps) => {
          handleInputKeyDown(e, searchInputProps);
        },
      };
    };

  /**
   * Custom Tab selection logic, at least until Downshift will implement selection on blur.
   * Also keeps focus on multiple selection dropdown when selecting by Tab.
   */
  const handleTabSelection = (
    e: React.SyntheticEvent,
    highlightedIndex: number,
    selectItemAtIndex: (highlightedIndex: number) => void,
    toggleMenu: () => void,
  ): void => {
    if (open) {
      if (!_.isNil(highlightedIndex) && filteredItems.length && !items[highlightedIndex]['disabled']) {
        selectItemAtIndex(highlightedIndex);

        if (multiple && !moveFocusOnTab) {
          e.preventDefault();
        }
      } else {
        toggleMenu();
      }
    }
  };

  const trySetLastSelectedItemAsActive = () => {
    if (!multiple || (inputRef.current && inputRef.current.selectionStart !== 0)) {
      return;
    }

    if (value.length > 0) {
      // If last element was already active, perform a 'reset' of activeSelectedIndex.
      if (activeSelectedIndex === value.length - 1) {
        setStateAndInvokeHandler(['onActiveSelectedIndexChange'], null, {
          activeSelectedIndex: value.length - 1,
        });
      } else {
        setStateAndInvokeHandler(['onActiveSelectedIndexChange'], null, {
          activeSelectedIndex: value.length - 1,
        });
      }
    }
  };

  const tryRemoveItemFromValue = () => {
    if (
      multiple &&
      (searchQuery === '' || (inputRef.current.selectionStart === 0 && inputRef.current.selectionEnd === 0)) &&
      value.length > 0
    ) {
      removeItemFromValue();
    }
  };

  const handleClear = (e: React.SyntheticEvent<HTMLElement>) => {
    setStateAndInvokeHandler(['onChange', 'onActiveSelectedIndexChange', 'onHighlightedIndexChange'], e, {
      activeSelectedIndex: multiple ? null : undefined,
      highlightedIndex: highlightFirstItemOnOpen ? 0 : null,
      open: false,
      searchQuery: search ? '' : undefined,
      value: [],
    });

    tryFocusSearchInput();
    tryFocusTriggerButton();
  };

  const handleContainerClick = () => {
    tryFocusSearchInput();
  };

  const handleTriggerButtonKeyDown = (e: React.KeyboardEvent) => {
    switch (getCode(e)) {
      case keyboardKey.ArrowLeft:
        if (!context.rtl) {
          trySetLastSelectedItemAsActive();
        }
        return;
      case keyboardKey.ArrowRight:
        if (context.rtl) {
          trySetLastSelectedItemAsActive();
        }
        return;
      default:
        return;
    }
  };

  const handleListKeyDown = (
    e: React.KeyboardEvent,
    highlightedIndex: number,
    accessibilityInputPropsKeyDown: (e) => any,
    toggleMenu: () => void,
    selectItemAtIndex: (index: number) => void,
  ) => {
    const keyCode = getCode(e);
    switch (keyCode) {
      case keyboardKey.Tab:
        handleTabSelection(e, highlightedIndex, selectItemAtIndex, toggleMenu);
        return;
      case keyboardKey.Escape:
        accessibilityInputPropsKeyDown(e);
        tryFocusTriggerButton();
        e.stopPropagation();
        return;
      default:
        const keyString = String.fromCharCode(keyCode);
        if (/[a-zA-Z0-9]/.test(keyString)) {
          setHighlightedIndexOnCharKeyDown(keyString);
        }
        accessibilityInputPropsKeyDown(e);
        return;
    }
  };

  const handleSelectedItemKeyDown = (
    e: React.KeyboardEvent,
    item: ShorthandValue<DropdownItemProps>,
    predefinedProps: DropdownSelectedItemProps,
    dropdownSelectedItemProps: DropdownSelectedItemProps,
  ) => {
    const previousKey = context.rtl ? keyboardKey.ArrowRight : keyboardKey.ArrowLeft;
    const nextKey = context.rtl ? keyboardKey.ArrowLeft : keyboardKey.ArrowRight;

    switch (getCode(e)) {
      case keyboardKey.Delete:
      case keyboardKey.Backspace:
        handleSelectedItemRemove(e, item, predefinedProps, dropdownSelectedItemProps);
        break;
      case previousKey:
        if (value.length > 0 && !_.isNil(activeSelectedIndex) && activeSelectedIndex > 0) {
          setStateAndInvokeHandler(['onActiveSelectedIndexChange'], null, {
            activeSelectedIndex: activeSelectedIndex - 1,
          });
        }
        break;
      case nextKey:
        if (value.length > 0 && !_.isNil(activeSelectedIndex)) {
          if (activeSelectedIndex < value.length - 1) {
            setStateAndInvokeHandler(['onActiveSelectedIndexChange'], null, {
              activeSelectedIndex: activeSelectedIndex + 1,
            });
          } else {
            setStateAndInvokeHandler(['onActiveSelectedIndexChange'], null, {
              activeSelectedIndex: null,
            });

            if (search) {
              e.preventDefault(); // prevents caret to forward one position in input.
              inputRef.current.focus();
            } else {
              buttonRef.current.focus();
            }
          }
        }
        break;
      default:
        break;
    }
    _.invoke(predefinedProps, 'onKeyDown', e, dropdownSelectedItemProps);
  };

  const handleTriggerButtonOrListFocus = () => {
    setFocused(true);
    setIsFromKeyboard(detectIsFromKeyboard());
  };

  const handleTriggerButtonBlur = e => {
    if (listRef.current !== e.relatedTarget) {
      setFocused(false);
      setIsFromKeyboard(detectIsFromKeyboard());
    }
  };

  const handleListBlur = e => {
    if (buttonRef.current !== e.relatedTarget) {
      setFocused(false);
      setIsFromKeyboard(detectIsFromKeyboard());
    }
  };

  /**
   * Sets highlightedIndex to be the item that starts with the character keys the
   * user has typed. Only used in non-search dropdowns.
   *
   * @param keystring - The string the item needs to start with. It is composed by typing keys in fast succession.
   */
  const setHighlightedIndexOnCharKeyDown = (keyString: string): void => {
    const newStartingString = `${startingString}${keyString.toLowerCase()}`;
    let newHighlightedIndex = -1;

    setStartingString(newStartingString);
    clearStartingString();

    if (_.isNumber(highlightedIndex)) {
      newHighlightedIndex = _.findIndex(
        filteredItemStrings,
        item => item.startsWith(newStartingString),
        highlightedIndex + (startingString.length > 0 ? 0 : 1),
      );
    }

    if (newHighlightedIndex < 0) {
      newHighlightedIndex = _.findIndex(filteredItemStrings, item => item.startsWith(newStartingString));
    }

    if (newHighlightedIndex >= 0) {
      setStateAndInvokeHandler(['onHighlightedIndexChange'], null, {
        highlightedIndex: newHighlightedIndex,
      });
    }
  };

  const handleSelectedItemRemove = (
    e: React.SyntheticEvent,
    item: ShorthandValue<DropdownItemProps>,
    predefinedProps: DropdownSelectedItemProps,
    dropdownSelectedItemProps: DropdownSelectedItemProps,
  ) => {
    setStateAndInvokeHandler(['onActiveSelectedIndexChange'], null, {
      activeSelectedIndex: null,
    });
    removeItemFromValue(item);
    tryFocusSearchInput();
    tryFocusTriggerButton();
    _.invoke(predefinedProps, 'onRemove', e, dropdownSelectedItemProps);
  };

  const removeItemFromValue = (item?: ShorthandValue<DropdownItemProps>) => {
    let poppedItem = item;
    let newValue = [...value];

    if (poppedItem) {
      newValue = newValue.filter(currentElement => currentElement !== item);
    } else {
      poppedItem = newValue.pop();
    }

    if (getA11ySelectionMessage && getA11ySelectionMessage.onRemove) {
      setA11ySelectionMessage(getA11ySelectionMessage.onRemove(poppedItem));
    }

    setStateAndInvokeHandler(['onChange'], null, { value: newValue });
  };

  /**
   * Calls setState and invokes event handler exposed to user.
   * We don't have the event object for most events coming from Downshift se we send an empty event
   * because we want to keep the event handling interface
   */
  const setStateAndInvokeHandler = (
    handlerNames: (keyof DropdownProps)[],
    event: React.SyntheticEvent<HTMLElement>,
    newState: DropdownStateForInvoke,
  ) => {
    const proposedValue = _.isNil(newState.value) ? value : newState.value;
    // `proposedValue` should be normalized for single/multiple variations, `null` condition is
    // required as first item can be undefined
    const newValue = multiple ? proposedValue : proposedValue[0] || null;

    if (newState.hasOwnProperty('activeSelectedIndex')) {
      setActiveSelectedIndex(newState.activeSelectedIndex);
    }
    if (newState.hasOwnProperty('highlightedIndex')) {
      setHighlightedIndex(newState.highlightedIndex);
    }
    if (newState.hasOwnProperty('itemIsFromKeyboard')) {
      setItemIsFromKeyboard(newState.itemIsFromKeyboard);
    }
    if (newState.hasOwnProperty('open')) {
      setOpen(newState.open);
    }
    if (newState.hasOwnProperty('searchQuery')) {
      setSearchQuery(newState.searchQuery);
    }
    if (newState.hasOwnProperty('value')) {
      setValue(newState.value);
    }

    handlerNames.forEach(handlerName => {
      _.invoke(props, handlerName, event, { ...props, ...newState, value: newValue });
    });
  };

  const tryFocusTriggerButton = () => {
    if (!search && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  const tryFocusSearchInput = () => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * If there is no value we use the placeholder value
   * otherwise, for single selection we convert the value with itemToString
   * and for multiple selection we return empty string, the values are rendered by renderSelectedItems
   */
  const getSelectedItemAsString = (value: ShorthandValue<DropdownItemProps>): string => {
    if (!value) {
      return search ? '' : placeholder;
    }

    if (multiple) {
      return '';
    }

    return itemToString(value);
  };

  const getHighlightedIndexOnArrowKeyOpen = (
    changes: StateChangeOptions<ShorthandValue<DropdownItemProps>>,
  ): number => {
    const isArrowUp = changes.type === Downshift.stateChangeTypes.keyDownArrowUp;
    const isArrowDown = changes.type === Downshift.stateChangeTypes.keyDownArrowDown;
    const itemsLength = filteredItems.length;

    if (highlightedIndex) {
      return highlightedIndex;
    }

    if (highlightFirstItemOnOpen) {
      // otherwise, if highlightFirstItemOnOpen prop is provied, highlight first item.
      return 0;
    }

    if (!multiple && value.length > 0) {
      // in single selection (search or not search), if there is a selected item, highlight it.
      const offset = isArrowUp ? -1 : isArrowDown ? 1 : 0;
      const newHighlightedIndex = items.indexOf(value[0]) + offset;
      if (newHighlightedIndex >= itemsLength) {
        return 0;
      }
      if (isArrowUp && newHighlightedIndex < 0) {
        return itemsLength - 1;
      }
      if (newHighlightedIndex > 0) {
        return newHighlightedIndex;
      }
    }

    if (isArrowDown) {
      return 0;
    }
    if (isArrowUp) {
      return itemsLength - 1;
    }

    return null;
  };

  /**
   * Function that sets and cleans the selection message after it has been set,
   * so it is not read anymore via virtual cursor.
   */
  const setA11ySelectionMessage = (a11ySelectionStatus: string): void => {
    setA11ySelectionStatus(a11ySelectionStatus);
    clearA11ySelectionMessage();
  };

  React.useEffect(() => {
    return () => {
      clearStartingString.cancel();
      clearA11ySelectionMessage.cancel();
    };
  }, [clearA11ySelectionMessage, clearStartingString]);

  const element = (
    <ElementType
      className={classes.root}
      onBlur={handleOnBlur}
      onChange={handleChange}
      ref={ref}
      {...unhandledProps}
      {...(process.env.NODE_ENV === 'test' && { 'data-test-focused': focused })}
    >
      <Downshift
        isOpen={open}
        inputValue={search ? searchQuery : null}
        stateReducer={downshiftStateReducer}
        itemToString={itemToString}
        // downshift does not work with arrays as selectedItem.
        selectedItem={multiple || !value.length ? null : value[0]}
        scrollIntoView={(node: HTMLElement, menu: HTMLElement) => {
          if (node) {
            const { children } = menu;
            let nodeToScroll = node;
            /**
             * If it's loading downshift doesn't take the last node with loadingMessage
             * in consideration to scrolld so we need to check if the current is the
             * antepenultimate and is so scroll the loading into view, same for headerMessage
             */
            if (loading && children[children.length - 2] === node) {
              nodeToScroll = children[children.length - 1] as HTMLElement;
            } else if (headerMessage && children[1] === node) {
              nodeToScroll = children[0] as HTMLElement;
            }

            // Replicating same config that Downshift uses
            const actions = computeScrollIntoView(nodeToScroll, {
              boundary: menu, // Explicitly set boundary to avoid unnecessary scrolling by checking all parent elements
              scrollMode: 'if-needed',
              block: 'nearest',
              inline: 'nearest',
            });
            actions.forEach(({ el, top, left }) => {
              el.scrollTop = top;
              el.scrollLeft = left;
            });
          }
        }}
        getA11yStatusMessage={getA11yStatusMessage}
        highlightedIndex={highlightedIndex}
        onStateChange={handleStateChange}
        onInputValueChange={handleInputValueChange}
        labelId={ariaLabelledby}
        environment={context.target?.defaultView}
        inputId={searchInput && searchInput['id'] ? searchInput['id'] : undefined}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getRootProps,
          getToggleButtonProps,
          toggleMenu,
          highlightedIndex,
          selectItemAtIndex,
        }) => {
          const { innerRef, ...accessibilityRootPropsRest } = getRootProps(
            { refKey: 'innerRef' },
            { suppressRefError: true },
          );
          const showClearIndicator = clearable && value.length > 0;

          return (
            <Ref innerRef={innerRef}>
              <div
                ref={containerRef}
                className={cx(dropdownSlotClassNames.container, classes.container)}
                onClick={search && !open ? handleContainerClick : undefined}
              >
                <div ref={selectedItemsRef} className={cx(dropdownSlotClassNames.selectedItems, classes.selectedItems)}>
                  {/* We previously were rendering the trigger button after selected items list,
                    after listbox wrapper was introduced we moved it to before and
                     set as absolute to avoid visual regressions   */}
                  {!search && renderTriggerButton(getToggleButtonProps)}
                  {multiple && renderSelectedItems()}
                  {search &&
                    renderSearchInput(
                      accessibilityRootPropsRest,
                      highlightedIndex,
                      getInputProps,
                      selectItemAtIndex,
                      toggleMenu,
                      variables,
                    )}
                </div>
                {showClearIndicator
                  ? Box.create(clearIndicator, {
                      defaultProps: () => ({
                        className: dropdownSlotClassNames.clearIndicator,
                        styles: resolvedStyles.clearIndicator,
                        ...(!search ? { tabIndex: 0, role: 'button' } : { accessibility: indicatorBehavior }),
                      }),
                      overrideProps: (predefinedProps: BoxProps) => ({
                        onClick: (e: React.SyntheticEvent<HTMLElement>) => {
                          _.invoke(predefinedProps, 'onClick', e);
                          handleClear(e);
                        },
                        onKeyDown: (e: React.KeyboardEvent<HTMLElement>) => {
                          _.invoke(predefinedProps, 'onKeyDown', e);
                          const keyCode = getCode(e);
                          if (!search && (keyCode === keyboardKey.Enter || keyCode === SpacebarKey)) {
                            handleClear(e);
                            e.preventDefault();
                          }
                        },
                      }),
                    })
                  : Box.create(toggleIndicator, {
                      defaultProps: () => ({
                        className: dropdownSlotClassNames.toggleIndicator,
                        styles: resolvedStyles.toggleIndicator,
                        accessibility: indicatorBehavior,
                      }),
                      overrideProps: (predefinedProps: BoxProps) => ({
                        onClick: e => {
                          if (!disabled) {
                            getToggleButtonProps({ disabled }).onClick(e);
                          }

                          _.invoke(predefinedProps, 'onClick', e);
                        },
                      }),
                    })}
                {renderItemsList(
                  highlightedIndex,
                  toggleMenu,
                  selectItemAtIndex,
                  getMenuProps,
                  getItemProps,
                  getInputProps,
                )}
              </div>
            </Ref>
          );
        }}
      </Downshift>
      <Portal open={!!getA11ySelectionMessage}>
        <div role="status" aria-live="polite" aria-relevant="additions text" style={screenReaderContainerStyles}>
          {a11ySelectionStatus}
        </div>
      </Portal>
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, DropdownProps> &
  FluentComponentStaticProps<DropdownProps> & {
    Item: typeof DropdownItem;
    SearchInput: typeof DropdownSearchInput;
    SelectedItem: typeof DropdownSelectedItem;
  };

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    children: false,
    content: false,
  }),
  activeSelectedIndex: PropTypes.number,
  allowFreeform: PropTypes.bool,
  checkable: PropTypes.bool,
  checkableIndicator: customPropTypes.shorthandAllowingChildren,
  clearable: PropTypes.bool,
  clearIndicator: customPropTypes.shorthandAllowingChildren,
  defaultActiveSelectedIndex: PropTypes.number,
  defaultOpen: PropTypes.bool,
  defaultHighlightedIndex: PropTypes.number,
  defaultSearchQuery: PropTypes.string,
  defaultValue: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fluid: PropTypes.bool,
  getA11ySelectionMessage: PropTypes.object,
  getA11yStatusMessage: PropTypes.func,
  highlightFirstItemOnOpen: PropTypes.bool,
  highlightedIndex: PropTypes.number,
  inline: PropTypes.bool,
  inverted: PropTypes.bool,
  items: customPropTypes.collectionShorthand,
  itemToString: PropTypes.func,
  itemToValue: PropTypes.func,
  headerMessage: customPropTypes.itemShorthand,
  list: customPropTypes.itemShorthand,
  loading: PropTypes.bool,
  loadingMessage: customPropTypes.itemShorthand,
  moveFocusOnTab: PropTypes.bool,
  multiple: PropTypes.bool,
  noResultsMessage: customPropTypes.itemShorthand,
  onOpenChange: PropTypes.func,
  onSearchQueryChange: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onActiveSelectedIndexChange: PropTypes.func,
  onHighlightedIndexChange: PropTypes.func,
  open: PropTypes.bool,
  placeholder: PropTypes.string,
  renderItem: PropTypes.func,
  renderSelectedItem: PropTypes.func,
  search: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  searchQuery: PropTypes.string,
  searchInput: customPropTypes.itemShorthand,
  toggleIndicator: customPropTypes.shorthandAllowingChildren,
  triggerButton: customPropTypes.itemShorthand,
  value: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
  'aria-labelledby': PropTypes.string,
  'aria-invalid': PropTypes.bool,
  a11ySelectedItemsMessage: PropTypes.string,
  // positioning props
  align: PropTypes.oneOf(ALIGNMENTS),
  flipBoundary: PropTypes.oneOfType([
    PropTypes.object as PropTypes.Requireable<HTMLElement>,
    PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
    PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
  ]),
  overflowBoundary: PropTypes.oneOfType([
    PropTypes.object as PropTypes.Requireable<HTMLElement>,
    PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
    PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
  ]),
  popperRef: customPropTypes.ref,
  position: PropTypes.oneOf(POSITIONS),
  positionFixed: PropTypes.bool,
  offset: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number) as PropTypes.Requireable<[number, number]>,
  ]),
  unstable_disableTether: PropTypes.oneOf([true, false, 'all']),
  unstable_pinned: PropTypes.bool,
  autoSize: PropTypes.oneOf<AutoSize>(AUTOSIZES),
};
Dropdown.handledProps = Object.keys(Dropdown.propTypes) as any;

Dropdown.defaultProps = {
  align: 'start',
  clearIndicator: <CloseIcon outline />,
  itemToString: item => {
    if (!item || React.isValidElement(item)) {
      return '';
    }

    // targets DropdownItem shorthand objects
    return (item as any).header || String(item);
  },
  itemToValue: item => {
    if (!item || React.isValidElement(item)) {
      return '';
    }

    // targets DropdownItem shorthand objects
    return (item as any).header || String(item);
  },
  list: {},
  position: 'below',
  toggleIndicator: <ChevronDownIcon outline />,
  triggerButton: {},
};

Dropdown.Item = DropdownItem;
Dropdown.SearchInput = DropdownSearchInput;
Dropdown.SelectedItem = DropdownSelectedItem;
