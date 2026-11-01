'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { OverflowProps } from './Overflow.types';
import { useOverflow } from './useOverflow';
import { useOverflowContextValues } from './useOverflowContextValues';
import { renderOverflow } from './renderOverflow';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Provides an overflow context for `OverflowItem` descendants without any built-in styling.
 */
export const Overflow: ForwardRefComponent<OverflowProps> = /*#__PURE__*/ composeComponent(
  'Overflow',
  useOverflow,
  renderOverflow,
  useOverflowContextValues,
);
