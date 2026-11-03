'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SpinButtonProps } from './SpinButton.types';
import { useSpinButton } from './useSpinButton';
import { renderSpinButton } from './renderSpinButton';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A spin button component for incrementing/decrementing values.
 */
export const SpinButton: ForwardRefComponent<SpinButtonProps> = /*#__PURE__*/ composeComponent(
  'SpinButton',
  useSpinButton,
  renderSpinButton,
);
