'use client';

import { useDrawerContextValue } from '@fluentui/react-drawer';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OverlayDrawerProps } from './OverlayDrawer.types';
import { renderOverlayDrawer } from './renderOverlayDrawer';
import { useOverlayDrawer } from './useOverlayDrawer';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * OverlayDrawer contains supplementary content in a native dialog surface.
 */
export const OverlayDrawer: ForwardRefComponent<OverlayDrawerProps> = /*#__PURE__*/ composeComponent(
  'OverlayDrawer',
  useOverlayDrawer,
  renderOverlayDrawer,
  useDrawerContextValue,
);
