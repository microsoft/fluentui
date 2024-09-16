import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useDrawerBody_unstable } from './useDrawerBody';
import { renderDrawerBody_unstable } from './renderDrawerBody';
import { useDrawerBodyStyles_unstable } from './useDrawerBodyStyles.styles';
import type { DrawerBodyProps } from './DrawerBody.types';

/**
 * DrawerBody provides with a container for the main content of a Drawer.
 */
export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = React.forwardRef((props, ref) => {
  const state = useDrawerBody_unstable(props, ref);

  useDrawerBodyStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerBodyStyles_unstable')(state);

  return renderDrawerBody_unstable(state);
});

DrawerBody.displayName = 'DrawerBody';
