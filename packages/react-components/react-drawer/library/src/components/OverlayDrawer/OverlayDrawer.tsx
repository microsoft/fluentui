import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useDrawerContextValue } from '../../contexts/drawerContext';

import { useOverlayDrawer_unstable } from './useOverlayDrawer';
import { renderOverlayDrawer_unstable } from './renderOverlayDrawer';
import { useOverlayDrawerStyles_unstable } from './useOverlayDrawerStyles.styles';
import type { OverlayDrawerProps } from './OverlayDrawer.types';

/**
 * OverlayDrawer contains supplementary content and are used for complex creation, edit, or management experiences.
 */
export const OverlayDrawer: ForwardRefComponent<OverlayDrawerProps> = React.forwardRef((props, ref) => {
  const state = useOverlayDrawer_unstable(props, ref);
  const contextValue = useDrawerContextValue();

  useOverlayDrawerStyles_unstable(state);
  useCustomStyleHook_unstable('useDrawerOverlayStyles_unstable')(state);
  useCustomStyleHook_unstable('useOverlayDrawerStyles_unstable')(state);

  return renderOverlayDrawer_unstable(state, contextValue);
});

OverlayDrawer.displayName = 'OverlayDrawer';
