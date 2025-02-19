import * as React from 'react';
import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

import type { OverlayDrawerState } from './OverlayDrawer.types';
import { OverlayDrawerSurfaceSlots } from './OverlayDrawerSurface/OverlayDrawerSurface.types';
import { drawerCSSVars, drawerDefaultStyles, useDrawerBaseClassNames } from '../../shared/useDrawerBaseStyles.styles';

export const overlayDrawerClassNames: SlotClassNames<Omit<OverlayDrawerSurfaceSlots, 'backdropMotion'>> = {
  root: 'fui-OverlayDrawer',
  backdrop: 'fui-OverlayDrawer__backdrop',
};

/**
 * Styles for the root slot
 */
const useDrawerResetStyles = makeResetStyles({
  ...createFocusOutlineStyle(),
  ...drawerDefaultStyles,
  position: 'fixed',
  top: 0,
  bottom: 0,
});

const useDrawerRootStyles = makeStyles({
  /* Positioning */
  start: {},
  end: {},
  bottom: {
    top: 'auto',
    height: `var(${drawerCSSVars.drawerSizeVar})`,
    width: '100vw',
  },
  absolute: {
    position: 'absolute',
  },
});

/**
 * Apply styling to the OverlayDrawer slots based on the state
 */
export const useOverlayDrawerStyles_unstable = (state: OverlayDrawerState): OverlayDrawerState => {
  'use no memo';

  const baseClassNames = useDrawerBaseClassNames(state);
  const resetStyles = useDrawerResetStyles();
  const rootStyles = useDrawerRootStyles();

  const absoluteStyles = state.hasMountNodeElement && rootStyles.absolute;
  const backdrop = state.root.backdrop as React.HTMLAttributes<HTMLDivElement> | undefined;

  state.root.className = mergeClasses(
    overlayDrawerClassNames.root,
    baseClassNames,
    resetStyles,
    rootStyles[state.position],
    absoluteStyles,
    state.root.className,
  );

  if (backdrop) {
    backdrop.className = mergeClasses(overlayDrawerClassNames.backdrop, absoluteStyles, backdrop.className);
  }

  return state;
};
