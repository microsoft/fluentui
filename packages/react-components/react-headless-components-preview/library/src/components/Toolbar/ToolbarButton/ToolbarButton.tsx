'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarButtonProps } from './ToolbarButton.types';
import { useToolbarButton } from './useToolbarButton';
import { renderToolbarButton } from './renderToolbarButton';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A button component designed to be used inside a Toolbar, inheriting toolbar context such as size.
 */
export const ToolbarButton: ForwardRefComponent<ToolbarButtonProps> = /*#__PURE__*/ composeComponent(
  'ToolbarButton',
  useToolbarButton,
  renderToolbarButton,
);
