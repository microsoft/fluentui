import * as React from 'react';
import { useMenuGridRow_unstable } from './useMenuGridRow';
import { renderMenuGridRow_unstable } from './renderMenuGridRow';
import { useMenuGridRowContextValues_unstable } from './useMenuGridRowContextValues';
import type { MenuGridRowProps } from './MenuGridRow.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGridRowStyles_unstable } from './useMenuGridRowStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a MenuGridRow, using the `useMenuGridRow_unstable` hook.
 */
export const MenuGridRow: ForwardRefComponent<MenuGridRowProps> = React.forwardRef((props, ref) => {
  const state = useMenuGridRow_unstable(props, ref);
  const contextValues = useMenuGridRowContextValues_unstable(state);

  useMenuGridRowStyles_unstable(state);
  useCustomStyleHook_unstable('useMenuGridRowStyles_unstable')(state);

  return renderMenuGridRow_unstable(state, contextValues);
});

MenuGridRow.displayName = 'MenuGroup';
