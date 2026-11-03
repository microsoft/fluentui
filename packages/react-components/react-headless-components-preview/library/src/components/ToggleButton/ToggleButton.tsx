'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ToggleButtonProps } from './ToggleButton.types';
import { useToggleButton } from './useToggleButton';
import { renderToggleButton } from './renderToggleButton';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A button component that can be toggled between checked and unchecked states.
 */
export const ToggleButton: ForwardRefComponent<ToggleButtonProps> = /*#__PURE__*/ composeComponent(
  'ToggleButton',
  useToggleButton,
  renderToggleButton,
);
