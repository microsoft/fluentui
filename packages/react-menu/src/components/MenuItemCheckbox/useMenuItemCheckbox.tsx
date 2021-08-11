import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { Checkmark16Filled } from '@fluentui/react-icons';
import { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import { useMenuListContext } from '../../contexts/menuListContext';
import { useMenuItem } from '../MenuItem/useMenuItem';

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<HTMLElement>,
): MenuItemCheckboxState => {
  const checkboxProps = {
    role: 'menuitemcheckbox',
    persistOnClick: true,
  };

  const state = useMenuItem(
    {
      ...checkboxProps,
      ...props,
      checkmark: resolveShorthand(props.checkmark, { children: <Checkmark16Filled /> }),
    },
    ref,
  ) as MenuItemCheckboxState;

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
