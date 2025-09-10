import * as React from 'react';
import { useMenuGridItem_unstable } from './useMenuGridItem';
import { renderMenuGridItem_unstable } from './renderMenuGridItem';
import type { MenuGridItemProps } from './MenuGridItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGridItemStyles_unstable } from './useMenuGridItemStyles.styles';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a MenuGridItem, using the `useMenuGridItem_unstable` hook.
 */
export const MenuGridItem: ForwardRefComponent<MenuGridItemProps> = React.forwardRef((props, ref) => {
  const state = useMenuGridItem_unstable(props, ref);

  useMenuGridItemStyles_unstable(state);

  // useCustomStyleHook_unstable('useMenuGridItemStyles_unstable')(state);

  return renderMenuGridItem_unstable(state);
});

MenuGridItem.displayName = 'MenuGridItem';
