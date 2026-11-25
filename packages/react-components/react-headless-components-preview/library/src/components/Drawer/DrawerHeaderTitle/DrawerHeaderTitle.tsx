'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleProps } from './DrawerHeaderTitle.types';
import { renderDrawerHeaderTitle } from './renderDrawerHeaderTitle';
import { useDrawerHeaderTitle } from './useDrawerHeaderTitle';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * DrawerHeaderTitle contains the accessible title and optional action for a Drawer.
 */
export const DrawerHeaderTitle: ForwardRefComponent<DrawerHeaderTitleProps> = /*#__PURE__*/ composeComponent(
  'DrawerHeaderTitle',
  useDrawerHeaderTitle,
  renderDrawerHeaderTitle,
);
