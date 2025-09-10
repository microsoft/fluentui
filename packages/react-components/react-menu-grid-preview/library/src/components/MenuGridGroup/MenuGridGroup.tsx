import * as React from 'react';
import { useMenuGridGroup_unstable } from './useMenuGridGroup';
import { renderMenuGridGroup_unstable } from './renderMenuGridGroup';
import { useMenuGridGroupContextValues_unstable } from './useMenuGridGroupContextValues';
import type { MenuGridGroupProps } from './MenuGridGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGridGroupStyles_unstable } from './useMenuGridGroupStyles.styles';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a MenuGridGroup, using the `useMenuGridGroup_unstable` hook.
 */
export const MenuGridGroup: ForwardRefComponent<MenuGridGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuGridGroup_unstable(props, ref);
  const contextValues = useMenuGridGroupContextValues_unstable(state);

  useMenuGridGroupStyles_unstable(state);

  // useCustomStyleHook_unstable('useMenuGridGroupStyles_unstable')(state);

  return renderMenuGridGroup_unstable(state, contextValues);
});

MenuGridGroup.displayName = 'MenuGridGroup';
