'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuGroupProps } from './MenuGroup.types';
import { renderMenuGroup } from './renderMenuGroup';
import { useMenuGroup, useMenuGroupContextValues } from './useMenuGroup';
import { useMenuGroupStyles } from './useMenuGroupStyles.styles';

export const MenuGroup: ForwardRefComponent<MenuGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroup(props, ref);
  const contextValues = useMenuGroupContextValues(state);
  useMenuGroupStyles(state);
  return renderMenuGroup(state, contextValues);
});

MenuGroup.displayName = 'MenuGroup';
