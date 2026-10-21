'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerBodyProps } from './DrawerBody.types';
import { renderDrawerBody } from './renderDrawerBody';
import { useDrawerBody } from './useDrawerBody';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * DrawerBody provides a container for the main content of a Drawer.
 */
export const DrawerBody: ForwardRefComponent<DrawerBodyProps> = /*#__PURE__*/ composeComponent(
  'DrawerBody',
  useDrawerBody,
  renderDrawerBody,
);
