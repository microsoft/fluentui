'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ARIAButtonElement } from '@fluentui/react-aria';
import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';

/**
 * Headless MenuItemCheckbox component.
 *
 * Renders a multi-select item with `role="menuitemcheckbox"` and ARIA
 * `aria-checked` driven by the parent MenuList's controlled `checkedValues`.
 */
export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = React.forwardRef<
  ARIAButtonElement<'div'>,
  MenuItemCheckboxProps
>((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);
  return renderMenuItemCheckbox(state);
}) as ForwardRefComponent<MenuItemCheckboxProps>;

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
