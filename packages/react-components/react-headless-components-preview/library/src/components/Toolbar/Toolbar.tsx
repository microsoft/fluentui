'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarProps } from './Toolbar.types';
import { useToolbar, useToolbarContextValues } from './useToolbar';
import { renderToolbar } from './renderToolbar';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A toolbar component that provides a container for grouping a set of controls such as buttons and menu items.
 */
export const Toolbar: ForwardRefComponent<ToolbarProps> = /*#__PURE__*/ composeComponent(
  'Toolbar',
  useToolbar,
  renderToolbar,
  useToolbarContextValues,
);
