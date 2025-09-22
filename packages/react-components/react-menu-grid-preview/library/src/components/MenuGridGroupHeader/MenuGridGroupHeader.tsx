import * as React from 'react';
import { useMenuGridGroupHeader_unstable } from './useMenuGridGroupHeader';
import { renderMenuGridGroupHeader_unstable } from './renderMenuGridGroupHeader';
import type { MenuGridGroupHeaderProps } from './MenuGridGroupHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGridGroupHeaderStyles_unstable } from './useMenuGridGroupHeaderStyles.styles';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a MenuGridGroupHeader, using the `useMenuGridGroupHeader_unstable` hook.
 */
export const MenuGridGroupHeader: ForwardRefComponent<MenuGridGroupHeaderProps> = React.forwardRef((props, ref) => {
  const state = useMenuGridGroupHeader_unstable(props, ref);

  useMenuGridGroupHeaderStyles_unstable(state);

  // useCustomStyleHook_unstable('useMenuGridGroupHeaderStyles_unstable')(state);

  return renderMenuGridGroupHeader_unstable(state);
});

MenuGridGroupHeader.displayName = 'MenuGridGroupHeader';
