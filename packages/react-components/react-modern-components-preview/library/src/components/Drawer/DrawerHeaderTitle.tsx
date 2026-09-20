'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleProps } from './Drawer.types';
import { renderDrawerHeaderTitle } from './renderDrawer';
import { useDrawerHeaderTitle } from './useDrawer';
import { useDrawerHeaderTitleStyles } from './useDrawerStyles.styles';

/**
 * DrawerHeaderTitle contains the accessible title and optional action for a Drawer.
 */
export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> = React.forwardRef((props, ref) => {
  const state = useDrawerHeaderTitle(props, ref);
  useDrawerHeaderTitleStyles(state);
  return renderDrawerHeaderTitle(state);
});

DrawerHeaderTitle.displayName = 'DrawerHeaderTitle';
