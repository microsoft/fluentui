import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuListContext } from '../menuListContext';
import { useMenuItemSelectable } from '../selectable';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemCheckboxShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps<MenuItemCheckboxProps>({ deepMerge: menuItemCheckboxShorthandProps });

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemCheckboxProps,
): MenuItemCheckboxState => {
  // Ensure that the `ref` prop can be used by other things (like useFocusRects) to refer to the root.
  // NOTE: We are assuming refs should not mutate to undefined. Either they are passed or not.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const resolvedRef = ref || React.useRef<HTMLElement>();
  const mergedProps = mergeProps(
    {
      ref: resolvedRef,
      as: 'div',
      icon: { as: 'span' },
      checkmark: { as: 'span' },
      role: 'menuitemcheckbox',
      tabIndex: 0,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemCheckboxShorthandProps),
  );

  const { checkedValues: { [mergedProps.name]: checkedItems = [] } = {}, onCheckedValuesChange } = useMenuListContext();

  const state: MenuItemCheckboxState = {
    checkedItems,
    onCheckedValuesChange: onCheckedValuesChange || (() => null),
    checked: checkedItems.indexOf(mergedProps.value) !== -1,
    ...mergedProps,
  };

  useMenuItemSelectable(state, () => {
    const newCheckedItems = [...state.checkedItems];
    const index = state.checkedItems.indexOf(state.value);
    if (index !== -1) {
      newCheckedItems.splice(index, 1);
    } else {
      newCheckedItems.push(state.value);
    }

    return newCheckedItems;
  });
  return state;
};
