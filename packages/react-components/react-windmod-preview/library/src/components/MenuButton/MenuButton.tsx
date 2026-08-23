'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuButton, useMenuButton } from '@fluentui/react-headless-components-preview/menu-button';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';

import type { MenuButtonProps, MenuButtonState } from './MenuButton.types';
import { useMenuButtonStyles } from './useMenuButtonStyles';

/**
 * A MenuButton opens a menu, indicated by a chevron. Windmod MenuButton: the headless menu
 * button decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuButton: ForwardRefComponent<MenuButtonProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-button's styled useMenuButton.
  const { appearance = 'secondary', menuIcon, shape = 'rounded', size = 'medium', ...rest } = props;

  // The headless menuIcon slot exists only when the consumer passes a value, so an empty object
  // materialises it for the glyph default below; `null` still removes the slot.
  const state: MenuButtonState = {
    ...useMenuButton({ ...rest, menuIcon: menuIcon === undefined ? {} : menuIcon }, ref),
    appearance,
    shape,
    size,
  };

  // The headless surface ships no glyph of its own; windmod restores the Fluent default in a new
  // state object, never on the one the hook returned. Consumer children always win.
  const styled = useMenuButtonStyles(
    state.menuIcon
      ? { ...state, menuIcon: { ...state.menuIcon, children: state.menuIcon.children ?? <ChevronDownRegular /> } }
      : state,
  );

  return renderMenuButton(styled);
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<MenuButtonProps>;

MenuButton.displayName = 'MenuButton';
