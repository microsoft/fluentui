import * as React from 'react';
import { useDrawerOverlay_unstable } from './useDrawerOverlay';
import { renderDrawerOverlay_unstable } from './renderDrawerOverlay';
import { useDrawerOverlayStyles_unstable } from './useDrawerOverlayStyles.styles';
import type { DrawerOverlayProps } from './DrawerOverlay.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DrawerOverlay contains supplementary content and are used for complex creation, edit, or management experiences.
 */
export const DrawerOverlay: ForwardRefComponent<DrawerOverlayProps> = React.forwardRef((props, ref) => {
  const state = useDrawerOverlay_unstable(props, ref);

  useDrawerOverlayStyles_unstable(state);

  return renderDrawerOverlay_unstable(state);
});

DrawerOverlay.displayName = 'DrawerOverlay';
