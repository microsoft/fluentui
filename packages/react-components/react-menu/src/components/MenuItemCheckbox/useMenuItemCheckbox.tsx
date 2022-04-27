import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { Checkmark16Filled } from '@fluentui/react-icons';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import { useMenuItem_unstable } from '../MenuItem/useMenuItem';
import type { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox_unstable = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<HTMLElement>,
): MenuItemCheckboxState => {
  const state = useMenuItem_unstable(
    {
      role: 'menuitemcheckbox',
      persistOnClick: true,
      ...props,
      checkmark: resolveShorthand(props.checkmark, {
        defaultProps: { children: <Checkmark16Filled /> },
        required: true,
      }),
    },
    ref,
  ) as MenuItemCheckboxState;

  const toggleCheckbox = useMenuListContext_unstable(context => context.toggleCheckbox);
  const { onClick: onClickOriginal } = state.root;
  const checked = useMenuListContext_unstable(context => {
    const checkedItems = context.checkedValues?.[state.name] || [];
    return checkedItems.indexOf(state.value) !== -1;
  });

  state.checked = checked;
  state.root['aria-checked'] = state.checked;

  // MenuItem state already transforms keyDown to click events
  state.root.onClick = e => {
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
