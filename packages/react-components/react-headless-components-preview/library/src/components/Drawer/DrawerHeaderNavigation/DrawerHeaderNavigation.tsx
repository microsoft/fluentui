'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationProps } from './DrawerHeaderNavigation.types';
import { renderDrawerHeaderNavigation } from './renderDrawerHeaderNavigation';
import { useDrawerHeaderNavigation } from './useDrawerHeaderNavigation';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * DrawerHeaderNavigation contains navigation content for a Drawer header.
 */
export const DrawerHeaderNavigation: ForwardRefComponent<DrawerHeaderNavigationProps> = /*#__PURE__*/ composeComponent(
  'DrawerHeaderNavigation',
  useDrawerHeaderNavigation,
  renderDrawerHeaderNavigation,
);
