'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToolbarRadioButtonProps } from './ToolbarRadioButton.types';
import { useToolbarRadioButton } from './useToolbarRadioButton';
import { renderToolbarRadioButton } from './renderToolbarRadioButton';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A radio button designed to be used inside a Toolbar with mutually exclusive selection behavior.
 */
export const ToolbarRadioButton: ForwardRefComponent<ToolbarRadioButtonProps> = /*#__PURE__*/ composeComponent(
  'ToolbarRadioButton',
  useToolbarRadioButton,
  renderToolbarRadioButton,
);
