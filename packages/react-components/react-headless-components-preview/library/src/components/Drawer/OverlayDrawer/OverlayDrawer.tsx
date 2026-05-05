'use client';

import * as React from 'react';
import { useDrawerContextValue } from '@fluentui/react-drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OverlayDrawerProps } from './OverlayDrawer.types';
import { renderOverlayDrawer } from './renderOverlayDrawer';
import { useOverlayDrawer } from './useOverlayDrawer';

/**
 * OverlayDrawer contains supplementary content in a native dialog surface.
 */
export const OverlayDrawer: ForwardRefComponent<OverlayDrawerProps> = React.forwardRef((props, ref) => {
  const state = useOverlayDrawer(props, ref);
  const contextValue = useDrawerContextValue();

  return renderOverlayDrawer(state, contextValue);
});

OverlayDrawer.displayName = 'OverlayDrawer';
