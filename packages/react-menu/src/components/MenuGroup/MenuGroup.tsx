import * as React from 'react';
import { useMenuGroup } from './useMenuGroup';
import { renderMenuGroup } from './renderMenuGroup';
import { useMenuGroupContextValues } from './useMenuGroupContextValues';
import type { MenuGroupProps } from './MenuGroup.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuGroupStyles } from './useMenuGroupStyles';

/**
 * Define a styled MenuGroup, using the `useMenuGroup` hook.
 */
export const MenuGroup: ForwardRefComponent<MenuGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroup(props, ref);
  const contextValues = useMenuGroupContextValues(state);

  useMenuGroupStyles(state);

  return renderMenuGroup(state, contextValues);
});

MenuGroup.displayName = 'MenuGroup';
