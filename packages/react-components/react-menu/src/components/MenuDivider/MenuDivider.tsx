import * as React from 'react';
import { useMenuDivider_unstable } from './useMenuDivider';
import { useMenuDividerStyles_unstable } from './useMenuDividerStyles';
import { renderMenuDivider_unstable } from './renderMenuDivider';
import type { MenuDividerProps } from './MenuDivider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a styled MenuDivider, using the `useMenuDivider_unstable` hook.
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const state = useMenuDivider_unstable(props, ref);

  useMenuDividerStyles_unstable(state);

  const { useMenuDividerStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderMenuDivider_unstable(state);
});

MenuDivider.displayName = 'MenuDivider';
