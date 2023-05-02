import * as React from 'react';
import { useDrawerTitle_unstable } from './useDrawerTitle';
import { renderDrawerTitle_unstable } from './renderDrawerTitle';
import { useDrawerTitleStyles_unstable } from './useDrawerTitleStyles.styles';
import type { DrawerTitleProps } from './DrawerTitle.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DrawerHeader provides a structured header for the drawer component.
 */
export const DrawerTitle: ForwardRefComponent<DrawerTitleProps> = React.forwardRef((props, ref) => {
  const state = useDrawerTitle_unstable(props, ref);

  useDrawerTitleStyles_unstable(state);
  return renderDrawerTitle_unstable(state);
});

DrawerTitle.displayName = 'DrawerTitle';
