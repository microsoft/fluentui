'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SpinnerProps } from './Spinner.types';
import { useSpinner } from './useSpinner';
import { renderSpinner } from './renderSpinner';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A spinner component for loading indicators.
 */
export const Spinner: ForwardRefComponent<SpinnerProps> = /*#__PURE__*/ composeComponent(
  'Spinner',
  useSpinner,
  renderSpinner,
);
