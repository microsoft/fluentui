'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuSplitGroupProps } from './Menu.types';
import { renderMenuSplitGroup } from './renderMenu';
import { useMenuSplitGroup, useMenuSplitGroupContextValues } from './useMenu';
import { useMenuSplitGroupStyles } from './useMenuStyles.styles';

export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);
  const contextValues = useMenuSplitGroupContextValues(state);
  useMenuSplitGroupStyles(state);
  return renderMenuSplitGroup(state, contextValues);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';
