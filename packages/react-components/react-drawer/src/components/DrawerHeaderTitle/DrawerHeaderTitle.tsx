import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useDrawerHeaderTitle_unstable } from './useDrawerHeaderTitle';
import { renderDrawerHeaderTitle_unstable } from './renderDrawerHeaderTitle';
import { useDrawerHeaderTitleStyles_unstable } from './useDrawerHeaderTitleStyles.styles';
import type { DrawerHeaderTitleProps } from './DrawerHeaderTitle.types';

/**
 * DrawerHeader provides a structured header for the drawer component.
 */
export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> = React.forwardRef((props, ref) => {
  const state = useDrawerHeaderTitle_unstable(props, ref);

  useDrawerHeaderTitleStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerHeaderTitleStyles_unstable')(state);

  return renderDrawerHeaderTitle_unstable(state);
});

DrawerHeaderTitle.displayName = 'DrawerHeaderTitle';
