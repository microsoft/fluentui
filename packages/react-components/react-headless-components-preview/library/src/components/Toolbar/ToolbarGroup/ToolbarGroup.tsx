'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarGroupProps } from './ToolbarGroup.types';
import { useToolbarGroup } from './useToolbarGroup';
import { renderToolbarGroup } from './renderToolbarGroup';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A group component used inside a Toolbar to visually and semantically group related controls.
 */
export const ToolbarGroup: ForwardRefComponent<ToolbarGroupProps> = /*#__PURE__*/ composeComponent(
  'ToolbarGroup',
  useToolbarGroup,
  renderToolbarGroup,
);
