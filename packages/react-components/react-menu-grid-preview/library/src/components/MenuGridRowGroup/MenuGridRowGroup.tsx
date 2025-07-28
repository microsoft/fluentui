import * as React from 'react';
import { useMenuGridRowGroup_unstable } from './useMenuGridRowGroup';
import { renderMenuGridRowGroup_unstable } from './renderMenuGridRowGroup';
import { useMenuGridRowGroupContextValues_unstable } from './useMenuGridRowGroupContextValues';
import type { MenuGridRowGroupProps } from './MenuGridRowGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGridRowGroupStyles_unstable } from './useMenuGridRowGroupStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a MenuGridRowGroup, using the `useMenuGridRowGroup_unstable` hook.
 */
export const MenuGridRowGroup: ForwardRefComponent<MenuGridRowGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuGridRowGroup_unstable(props, ref);
  const contextValues = useMenuGridRowGroupContextValues_unstable(state);

  useMenuGridRowGroupStyles_unstable(state);
  useCustomStyleHook_unstable('useMenuGridRowGroupStyles_unstable')(state);

  return renderMenuGridRowGroup_unstable(state, contextValues);
});

MenuGridRowGroup.displayName = 'MenuGroup';
