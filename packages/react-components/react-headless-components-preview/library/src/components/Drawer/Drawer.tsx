'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerProps } from './Drawer.types';
import { renderDrawer } from './renderDrawer';
import { useDrawer } from './useDrawer';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Drawer contains supplementary content for complex creation, edit, or management experiences.
 */
export const Drawer: ForwardRefComponent<DrawerProps> = /*#__PURE__*/ composeComponent(
  'Drawer',
  useDrawer,
  renderDrawer,
);
