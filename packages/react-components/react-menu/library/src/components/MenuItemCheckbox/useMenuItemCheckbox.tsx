import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { Checkmark16Filled } from '@fluentui/react-icons';
import { useMenuListContext_unstable } from '../../contexts/menuListContext';
import { useMenuItem_unstable } from '../MenuItem/useMenuItem';
import type { MenuItemCheckboxProps, MenuItemCheckboxState } from './MenuItemCheckbox.types';
import type { ARIAButtonElement, ARIAButtonElementIntersection } from '@fluentui/react-aria';

/** Returns the props and state required to render the component */
export const useMenuItemCheckbox_unstable = (
  props: MenuItemCheckboxProps,
  ref: React.Ref<ARIAButtonElement<'div'>>,
): MenuItemCheckboxState => {
  const toggleCheckbox = useMenuListContext_unstable(context => context.toggleCheckbox);
  const { name, value } = props;

  const checked = useMenuListContext_unstable(context => {
    const checkedItems = context.checkedValues?.[name] || [];
    return checkedItems.indexOf(value) !== -1;
  });

  const state: MenuItemCheckboxState = {
    ...useMenuItem_unstable(
      {
        role: 'menuitemcheckbox',
        persistOnClick: true,
        ...props,
        'aria-checked': checked,
        checkmark: slot.optional(props.checkmark, {
          defaultProps: { children: <Checkmark16Filled /> },
          renderByDefault: true,
          elementType: 'span',
        }),
        onClick: (e: React.MouseEvent<ARIAButtonElementIntersection<'div'>>) => {
          toggleCheckbox?.(e, name, value, checked);
          props.onClick?.(e);
        },
      },
      ref,
    ),
    name,
    value,
    checked,
  };

  return state;
};
