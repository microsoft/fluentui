import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utils';
import { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuListContext } from '../../menuListContext';
import { useMenuItemSelectable } from '../../selectable';
import { useMergedRefs } from '@fluentui/react-hooks';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemCheckboxShorthandProps = ['icon', 'checkmark'];

const mergeProps = makeMergeProps<MenuItemCheckboxState>({ deepMerge: menuItemCheckboxShorthandProps });

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemCheckboxProps,
): MenuItemCheckboxState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'div',
      icon: { as: 'span' },
      checkmark: { as: 'span' },
      role: 'menuitemcheckbox',
      tabIndex: 0,
    },
    defaultProps,
    resolveShorthandProps(props, menuItemCheckboxShorthandProps),
  );

  const { checkedValues: { [state.name]: checkedItems = [] } = {}, onCheckedValueChange } = useMenuListContext();
  state.checkedItems = checkedItems;
  state.onCheckedValueChange = onCheckedValueChange || (() => null);
  state.checked = checkedItems.indexOf(state.value) !== -1;

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
