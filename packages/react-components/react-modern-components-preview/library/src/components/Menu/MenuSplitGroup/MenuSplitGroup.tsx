'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';
import { renderMenuSplitGroup } from './renderMenuSplitGroup';
import { useMenuSplitGroup, useMenuSplitGroupContextValues } from './useMenuSplitGroup';
import { useMenuSplitGroupStyles } from './useMenuSplitGroupStyles.styles';

export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);
  const contextValues = useMenuSplitGroupContextValues(state);
  useMenuSplitGroupStyles(state);
  return renderMenuSplitGroup(state, contextValues);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';
