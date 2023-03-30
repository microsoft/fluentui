import * as React from 'react';
import { useDrawer_unstable } from './useDrawer';
import { renderDrawer_unstable } from './renderDrawer';
import { useDrawerStyles_unstable } from './useDrawerStyles';
import type { DrawerProps } from './Drawer.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Drawer component - TODO: add more docs
 */
export const Drawer: ForwardRefComponent<DrawerProps> = React.forwardRef((props, ref) => {
  const state = useDrawer_unstable(props, ref);

  useDrawerStyles_unstable(state);
  return renderDrawer_unstable(state);
});

Drawer.displayName = 'Drawer';
