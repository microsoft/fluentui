'use client';

import * as React from 'react';
import { useDrawerContextValue } from '@fluentui/react-headless-components-preview/drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OverlayDrawerProps } from './Drawer.types';
import { renderOverlayDrawer } from './renderDrawer';
import { useOverlayDrawer } from './useDrawer';
import { useOverlayDrawerStyles } from './useDrawerStyles.styles';

/**
 * OverlayDrawer contains supplementary content in a native dialog surface.
 */
export const OverlayDrawer: ForwardRefComponent<OverlayDrawerProps> = React.forwardRef((props, ref) => {
  const state = useOverlayDrawer(props, ref);
  const contextValue = useDrawerContextValue();
  useOverlayDrawerStyles(state);
  return renderOverlayDrawer(state, contextValue);
});

OverlayDrawer.displayName = 'OverlayDrawer';
