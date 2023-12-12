import * as React from 'react';
import {
  useControllableState,
  useEventCallback,
  useMergedRefs,
  slot,
  getIntrinsicElementProps,
} from '@fluentui/react-utilities';
import type { EventHandler, NavProps, NavState, OnNavItemSelectData } from './Nav.types';

// todo - light this up
// import { useArrowNavigationItem } from '@fluentui/react-tabster';
import type { NavItemRegisterData } from '../NavContext.types';
import { NavCategoryItemValue } from '../NavCategoryItem/NavCategoryItem.types';

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
  const { onNavItemSelect } = props;

  const innerRef = React.useRef<HTMLElement>(null);

  const [selectedValue, setSelectedValue] = useControllableState({
    state: props.selectedValue,
    defaultState: props.defaultSelectedValue,
    initialState: undefined,
  });

  // considered usePrevious, but it is sensitive to re-renders
  // this could cause the previous to move to current in the case where the navItem list re-renders.
  // these refs avoid getRegisteredNavItems changing when selectedValue changes and causing
  // renders for navItems that have not changed.
  const currentSelectedValue = React.useRef<NavCategoryItemValue | undefined>(undefined);
  const previousSelectedValue = React.useRef<NavCategoryItemValue | undefined>(undefined);

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
  };
};
