'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarToggleButtonProps } from './ToolbarToggleButton.types';
import { useToolbarToggleButton } from './useToolbarToggleButton';
import { renderToolbarToggleButton } from './renderToolbarToggleButton';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A toggle button designed to be used inside a Toolbar with toolbar toggle-group behavior.
 */
export const ToolbarToggleButton: ForwardRefComponent<ToolbarToggleButtonProps> = /*#__PURE__*/ composeComponent(
  'ToolbarToggleButton',
  useToolbarToggleButton,
  renderToolbarToggleButton,
);
