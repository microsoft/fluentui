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
// function initializeUncontrolledOpenItems({ defaultOpenItems }: Pick<NavProps, 'defaultOpenItems'>): NavItemValue[] {
//   if (defaultOpenItems !== undefined) {
//     if (Array.isArray(defaultOpenItems)) {
//       return [defaultOpenItems[0]];
//     }
//     return [defaultOpenItems];
//   }
//   return [];
// }

// /**
//  * Normalizes Accordion index into an array of indexes
//  */
// function normalizeValues(index?: NavItemValue | NavItemValue[]): NavItemValue[] | undefined {
//   if (index === undefined) {
//     return undefined;
//   }
//   return Array.isArray(index) ? index : [index];
// }

// temp implementation of the above function.
const normalizeValues = (index?: NavItemValue | NavItemValue[]): NavItemValue[] | undefined => {
  return undefined;
};

/**
 * Updates the list of open indexes based on an index that changes
 * @param value - the index that will change
 * @param previousOpenItems - list of current open indexes
 * @param collapsible - if Nav support multiple SubItemGroups closed at the same time
 */
const updateOpenItems = (value: NavItemValue, previousOpenItems: NavItemValue[], collapsible: boolean) => {
  return previousOpenItems[0] === value && collapsible ? [] : [value];
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
  const { onNavItemSelect, onNavCategoryItemToggle } = props;

  const innerRef = React.useRef<HTMLElement>(null);

  const [openItems, setOpenItems] = useControllableState({
    // normalizeValues(controlledOpenItems), [controlledOpenItems])
    state: React.useMemo(() => normalizeValues(), []),
    defaultState: () => [], // initializeUncontrolledOpenItems({ defaultOpenItems }),
    initialState: [],
  });

  const onRequestNavCategoryItemToggle: EventHandler<OnNavItemSelectData> = useEventCallback((event, data) => {
    const nextOpenItems = updateOpenItems(data.value, openItems, false);
    onNavCategoryItemToggle?.(event, data);
    setOpenItems(nextOpenItems);
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

  React.useEffect(() => {
    previousSelectedValue.current = currentSelectedValue.current;
    currentSelectedValue.current = selectedValue;
  }, [selectedValue]);

  const onSelect: EventHandler<OnNavItemSelectData> = useEventCallback((event, data) => {
    setSelectedValue(data.value);
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
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredNavItems,
    onRequestNavCategoryItemToggle,
    openItems,
  };
};
