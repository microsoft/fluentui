'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarDividerProps } from './ToolbarDivider.types';
import { useToolbarDivider } from './useToolbarDivider';
import { renderToolbarDivider } from './renderToolbarDivider';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A divider component designed to be used inside a Toolbar to visually separate groups of controls.
 * Its orientation is automatically inverted relative to the toolbar's orientation.
 */
export const ToolbarDivider: ForwardRefComponent<ToolbarDividerProps> = /*#__PURE__*/ composeComponent(
  'ToolbarDivider',
  useToolbarDivider,
  renderToolbarDivider,
);
