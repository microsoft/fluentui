import * as React from 'react';
import { makeMergeProps, resolveShorthandProps, useMergedRefs, useEventCallback } from '@fluentui/react-utilities';
import { useArrowNavigationGroup, useFocusFinders } from '@fluentui/react-focus-management';
import { MenuListProps, MenuListState } from './MenuList.types';

const mergeProps = makeMergeProps<MenuListState>();

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

  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      role: 'menu',
      ...focusAttributes,
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

  const { checkedValues, onCheckedValueChange } = state;
  state.toggleCheckbox = useEventCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string, checked: boolean) => {
      const checkedItems = checkedValues?.[name] || [];
      if (checked) {
        const newCheckedItems = [...checkedItems];
        newCheckedItems.splice(newCheckedItems.indexOf(value), 1);
        onCheckedValueChange?.(e, name, newCheckedItems);
      } else {
        onCheckedValueChange?.(e, name, [...checkedItems, value]);
      }
    },
  );

  state.selectRadio = useEventCallback((e: React.MouseEvent | React.KeyboardEvent, name: string, value: string) => {
    const newCheckedItems = [value];
    onCheckedValueChange?.(e, name, newCheckedItems);
  });

  return state;
};
