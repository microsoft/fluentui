'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuSplitGroup } from './useMenuSplitGroup';
import { useMenuSplitGroupContextValues } from './useMenuSplitGroupContextValues';
import { renderMenuSplitGroup } from './renderMenuSplitGroup';
import type { MenuSplitGroupProps } from '@fluentui/react-menu';

export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);
  const contextValues = useMenuSplitGroupContextValues(state);

  return renderMenuSplitGroup(state, contextValues);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';
