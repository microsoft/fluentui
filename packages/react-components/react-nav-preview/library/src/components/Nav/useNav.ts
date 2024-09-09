import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useMergedRefs,
  slot,
  getIntrinsicElementProps,
  EventHandler,
} from '@fluentui/react-utilities';

import type { NavProps, NavState, OnNavItemSelectData } from './Nav.types';
import type { NavItemRegisterData, NavItemValue } from '../NavContext.types';

// /**
//  * Initial value for the uncontrolled case of the list of open indexes
//  */
function initializeUncontrolledOpenCategories({
  defaultOpenCategories,
  multiple,
}: Pick<NavProps, 'defaultOpenCategories' | 'multiple'>): NavItemValue[] {
  if (defaultOpenCategories !== undefined) {
    if (Array.isArray(defaultOpenCategories)) {
      return multiple ? defaultOpenCategories : [defaultOpenCategories[0]];
    }
    return [defaultOpenCategories];
  }
  return [];
}

/**
 * Normalizes various value index types into an array of indexes
 */
function normalizeValues<Value = NavItemValue>(index?: Value | Value[]): Value[] | undefined {
  if (index === undefined) {
    return undefined;
  }
  return Array.isArray(index) ? index : [index];
}

/**
 * Updates the list of open indexes based on an index that changes
 * @param value - the index that will change
 * @param previousOpenItems - list of current open indexes
 * @param multiple - if Nav supports open categories at the same time
 */
const updateOpenItems = (value: NavItemValue, previousOpenItems: NavItemValue[], multiple: boolean) => {
  if (multiple) {
    if (previousOpenItems.includes(value)) {
      return previousOpenItems.filter(i => i !== value);
    } else {
      return [...previousOpenItems, value];
    }
  }

  return previousOpenItems[0] === value ? [] : [value];
};

/**
 * Create the state required to render Nav.
 *
 * The returned state can be modified with hooks such as useNavStyles,
 * before being passed to renderNav.
 *
 * @param props - props from this instance of Nav
 * @param ref - reference to root HTMLDivElement of Nav
 */
export const useNav_unstable = (props: NavProps, ref: React.Ref<HTMLDivElement>): NavState => {
  const {
    onNavItemSelect,
    onNavCategoryItemToggle,
    multiple = true,
    size = 'medium',
    defaultOpenCategories,
    openCategories: controlledOpenCategoryItems,
  } = props;

  const innerRef = React.useRef<HTMLElement>(null);

  const [openCategories, setOpenCategories] = useControllableState({
    state: React.useMemo(() => normalizeValues(controlledOpenCategoryItems), [controlledOpenCategoryItems]),
    defaultState: () => initializeUncontrolledOpenCategories({ defaultOpenCategories, multiple }),
    initialState: [],
  });

  const onRequestNavCategoryItemToggle: EventHandler<OnNavItemSelectData> = useEventCallback((event, data) => {
    const nextOpenItems = updateOpenItems(data.categoryValue, openCategories, multiple);
    onNavCategoryItemToggle?.(event, data);
    setOpenCategories(nextOpenItems);
  });

  const [selectedCategoryValue, setSelectedCategoryValue] = useControllableState({
    state: props.selectedCategoryValue,
    defaultState: props.defaultSelectedCategoryValue,
    initialState: undefined,
  });
  const [selectedValue, setSelectedValue] = useControllableState({
    state: props.selectedValue,
    defaultState: props.defaultSelectedValue,
    initialState: undefined,
  });

  // considered usePrevious, but it is sensitive to re-renders
  // this could cause the previous to move to current in the case where the navItem list re-renders.
  // these refs avoid getRegisteredNavItems changing when selectedValue changes and causing
  // renders for navItems that have not changed.
  const currentSelectedValue = React.useRef<NavItemValue | undefined>(undefined);
  const previousSelectedValue = React.useRef<NavItemValue | undefined>(undefined);

  const currentSelectedCategoryValue = React.useRef<NavItemValue | undefined>(undefined);
  const previousSelectedCategoryValue = React.useRef<NavItemValue | undefined>(undefined);

  React.useEffect(() => {
    previousSelectedValue.current = currentSelectedValue.current;
    currentSelectedValue.current = selectedValue;

    previousSelectedCategoryValue.current = currentSelectedCategoryValue.current;
    currentSelectedCategoryValue.current = selectedCategoryValue;
  }, [selectedValue, selectedCategoryValue]);

  const onSelect: EventHandler<OnNavItemSelectData> = useEventCallback((event, data) => {
    setSelectedValue(data.value);
    setSelectedCategoryValue(data.categoryValue);
    onNavItemSelect?.(event, data);
  });

  const registeredNavItems = React.useRef<Record<string, NavItemRegisterData>>({});

  const onRegister = React.useCallback((data: NavItemRegisterData) => {
    registeredNavItems.current[JSON.stringify(data.value)] = data;
  }, []);

  const onUnregister = React.useCallback((data: NavItemRegisterData) => {
    delete registeredNavItems.current[JSON.stringify(data.value)];
  }, []);

  const getRegisteredNavItems = React.useCallback(() => {
    return {
      selectedValue: currentSelectedValue.current,
      previousSelectedValue: previousSelectedValue.current,
      selectedCategoryValue: currentSelectedCategoryValue.current,
      previousSelectedCategoryValue: previousSelectedCategoryValue.current,
      registeredNavItems: registeredNavItems.current,
    };
  }, []);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: useMergedRefs(ref, innerRef) as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
    selectedValue,
    selectedCategoryValue,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredNavItems,
    onRequestNavCategoryItemToggle,
    openCategories,
    multiple,
    size,
  };
};
