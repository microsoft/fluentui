import * as React from 'react';
import { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuListContext } from '../../contexts/menuListContext';
import { useMenuItem, menuItemShorthandProps } from '../MenuItem/useMenuItem';
import { AcceptIcon } from '../../utils/DefaultIcons';

/**
 * Consts listing which props are shorthand props.
 */
export const menuItemCheckboxShorthandProps = [...menuItemShorthandProps] as const;

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: MenuItemCheckboxProps,
): MenuItemCheckboxState => {
  const state = useMenuItem(props, ref, {
    role: 'menuitemcheckbox',
    checkmark: { as: 'span', children: <AcceptIcon /> },
    persistOnClick: true,
  }) as MenuItemCheckboxState;

  const toggleCheckbox = useMenuListContext(context => context.toggleCheckbox);
  const { onClick: onClickOriginal } = state;
  const checked = useMenuListContext(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  state.checked = checked;
  state['aria-checked'] = state.checked;

  // MenuItem state already transforms keyDown to click events
  state.onClick = e => {
    if (state.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    toggleCheckbox?.(e, state.name, state.value, state.checked);
    onClickOriginal?.(e);
  };

  return state;
};
