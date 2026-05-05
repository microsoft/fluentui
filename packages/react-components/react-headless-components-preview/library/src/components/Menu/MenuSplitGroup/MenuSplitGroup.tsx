'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuSplitGroup } from './useMenuSplitGroup';
import { renderMenuSplitGroup } from './renderMenuSplitGroup';
import type { MenuSplitGroupProps } from './MenuSplitGroup.types';

export const MenuSplitGroup: ForwardRefComponent<MenuSplitGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuSplitGroup(props, ref);
  return renderMenuSplitGroup(state);
});

MenuSplitGroup.displayName = 'MenuSplitGroup';
