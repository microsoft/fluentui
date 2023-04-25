import * as React from 'react';
import { useDrawerBody_unstable } from './useDrawerBody';
import { renderDrawerBody_unstable } from './renderDrawerBody';
import { useDrawerBodyStyles_unstable } from './useDrawerBodyStyles';
import type { DrawerBodyProps } from './DrawerBody.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DrawerBody provides with a container for the main content of a Drawer.
 */
export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useDrawerBody_unstable(props, ref);

  useDrawerBodyStyles_unstable(state);
  return renderDrawerBody_unstable(state);
});

DrawerBody.displayName = 'DrawerBody';
