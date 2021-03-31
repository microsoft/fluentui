import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps } from '@fluentui/react-utilities';
import { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuListContext } from '../../menuListContext';
import { useMenuItem, menuItemShorthandProps } from '../MenuItem/useMenuItem';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemCheckboxShorthandProps = [...menuItemShorthandProps, 'checkmark'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<MenuItemCheckboxState>({ deepMerge: menuItemCheckboxShorthandProps });

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemCheckboxProps,
): MenuItemCheckboxState => {
  const baseState = useMenuItem(props, ref, {
    role: 'menuitemcheckbox',
  });

  // React elements cannot be extended and will break `resolveShorthandProps`
  // set to undefined since it will be resolved again anyway
  ((baseState as unknown) as MenuItemCheckboxProps).checkmark = undefined;
  const state = mergeProps(baseState, defaultProps, resolveShorthandProps(props, menuItemCheckboxShorthandProps));

  const toggleCheckbox = useMenuListContext(context => context.toggleCheckbox);
  const { onClick: onClickOriginal } = state;
  const checked = useMenuListContext(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  state.checked = checked;
  state['aria-checked'] = state.checked;

  state.onClick = e => {
    if (state.disabled) {
      return;
    }

    toggleCheckbox?.(e, state.name, state.value, state.checked);
    onClickOriginal?.(e);
  };

  return state;
};
