import * as React from 'react';
import {
  makeMergePropsCompat,
  resolveShorthandProps,
  useMergedRefs,
  useEventCallback,
  useControllableValue,
} from '@fluentui/react-utilities';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-tabster';
import { MenuListProps, MenuListState } from './MenuList.types';
import { useMenuContext } from '../../contexts/menuContext';

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuListState>();

/**
 * Returns the props and state required to render the component
 */
export const useMenuList = (
  props: MenuListProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuListProps,
): MenuListState => {
  const focusAttributes = useArrowNavigationGroup({ circular: true });
  const { findAllFocusable } = useFocusFinders();
  const menuContext = useMenuContextSelectors();

  if (usingPropsAndMenuContext(props, menuContext)) {
    // TODO throw warnings in development safely
    // eslint-disable-next-line no-console
    console.warn('You are using both MenuList and Menu props, we recommend you to use Menu props when available');
  }

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      role: 'menu',
      'aria-labelledby': menuContext.triggerId,
      hasIcons: menuContext.hasIcons,
      hasCheckmarks: menuContext.hasCheckmarks,
      ...focusAttributes,
      ...(menuContext.hasMenuContext && { ...menuContext }),

      // TODO: This is needed because Menu 'controls' the MenuList and will cause switching controlled state warnings
      // Solution is to define 'initial value' in useControllableValue like in v0
      ...(menuContext.hasMenuContext && !menuContext.checkedValues && { checkedValues: {} }),
    },
    defaultProps,
    resolveShorthandProps(props, []),
  );

  state.setFocusByFirstCharacter = React.useCallback(
    (e: React.KeyboardEvent<HTMLElement>, itemEl: HTMLElement) => {
      // TODO use some kind of children registration to reduce dependency on DOM roles
      const acceptedRoles = ['menuitem', 'menuitemcheckbox', 'menuitemradio'];
      const menuItems = findAllFocusable(
        state.ref.current,
        (el: HTMLElement) => el.hasAttribute('role') && acceptedRoles.indexOf(el.getAttribute('role')!) !== -1,
      );

      let startIndex = menuItems.indexOf(itemEl) + 1;
      if (startIndex === menuItems.length) {
        startIndex = 0;
      }

      const firstChars = menuItems.map(menuItem => menuItem.textContent?.charAt(0).toLowerCase());
      const char = e.key.toLowerCase();

      const getIndexFirstChars = (start: number, firstChar: string) => {
        for (let i = start; i < firstChars.length; i++) {
          if (char === firstChars[i]) {
            return i;
          }
        }
        return -1;
      };

      // Check remaining slots in the menu
      let index = getIndexFirstChars(startIndex, char);

      // If not found in remaining slots, check from beginning
      if (index === -1) {
        index = getIndexFirstChars(0, char);
      }

      // If match was found...
      if (index > -1) {
        menuItems[index].focus();
      }
    },
    [findAllFocusable, state.ref],
  );

  const [checkedValues, setCheckedValues] = useControllableValue(state.checkedValues, state.defaultCheckedValues);
  state.checkedValues = checkedValues;
  const { onCheckedValueChange } = state;
  state.toggleCheckbox = useEventCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string, checked: boolean) => {
      const checkedItems = checkedValues?.[name] || [];
      const newCheckedItems = [...checkedItems];
      if (checked) {
        newCheckedItems.splice(newCheckedItems.indexOf(value), 1);
      } else {
        newCheckedItems.push(value);
      }

      onCheckedValueChange?.(e, name, newCheckedItems);
      setCheckedValues(s => ({ ...s, [name]: newCheckedItems }));
    },
  );

  state.selectRadio = useEventCallback((e: React.MouseEvent | React.KeyboardEvent, name: string, value: string) => {
    const newCheckedItems = [value];
    setCheckedValues(s => ({ ...s, [name]: newCheckedItems }));
    onCheckedValueChange?.(e, name, newCheckedItems);
  });

  return state;
};

/**
 * Adds some sugar to fetching multiple context selector values
 */
const useMenuContextSelectors = () => {
  const hasMenuContext = useMenuContext(context => context.hasMenuContext);
  const checkedValues = useMenuContext(context => context.checkedValues);
  const onCheckedValueChange = useMenuContext(context => context.onCheckedValueChange);
  const defaultCheckedValues = useMenuContext(context => context.defaultCheckedValues);
  const triggerId = useMenuContext(context => context.triggerId);
  const hasIcons = useMenuContext(context => context.hasIcons);
  const hasCheckmarks = useMenuContext(context => context.hasCheckmarks);

  return {
    hasMenuContext,
    checkedValues,
    onCheckedValueChange,
    defaultCheckedValues,
    triggerId,
    hasIcons,
    hasCheckmarks,
  };
};

/**
 * Helper function to detect if props and MenuContext values are both used
 */
const usingPropsAndMenuContext = (props: MenuListProps, contextValue: ReturnType<typeof useMenuContextSelectors>) => {
  let isUsingPropsAndContext = false;
  for (const val in contextValue) {
    if (props[val as keyof Omit<typeof contextValue, 'hasMenuContext' | 'onCheckedValueChange' | 'triggerId'>]) {
      isUsingPropsAndContext = true;
    }
  }

  return contextValue.hasMenuContext && isUsingPropsAndContext;
};
