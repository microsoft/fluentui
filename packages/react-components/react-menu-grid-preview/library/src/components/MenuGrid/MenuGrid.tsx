import * as React from 'react';
import { useMenuGrid_unstable } from './useMenuGrid';
import { renderMenuGrid_unstable } from './renderMenuGrid';
import { useMenuGridContextValues_unstable } from './useMenuGridContextValues';
import { useMenuGridStyles_unstable } from './useMenuGridStyles.styles';
import type { MenuGridProps } from './MenuGrid.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a styled MenuGrid, using the `useMenuGrid_unstable` hook.
 */
export const MenuGrid: ForwardRefComponent<MenuGridProps> = React.forwardRef((props, ref) => {
  const state = useMenuGrid_unstable(props, ref);
  const contextValues = useMenuGridContextValues_unstable(state);

  useMenuGridStyles_unstable(state);

  // useCustomStyleHook_unstable('useMenuGridStyles_unstable')(state);

  return renderMenuGrid_unstable(state, contextValues);
});

MenuGrid.displayName = 'MenuGrid';
