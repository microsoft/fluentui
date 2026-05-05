'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleProps } from './DrawerHeaderTitle.types';
import { renderDrawerHeaderTitle } from './renderDrawerHeaderTitle';
import { useDrawerHeaderTitle } from './useDrawerHeaderTitle';

/**
 * DrawerHeaderTitle contains the accessible title and optional action for a Drawer.
 */
export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> = React.forwardRef((props, ref) => {
  const state = useDrawerHeaderTitle(props, ref);

  return renderDrawerHeaderTitle(state);
});

DrawerHeaderTitle.displayName = 'DrawerHeaderTitle';
