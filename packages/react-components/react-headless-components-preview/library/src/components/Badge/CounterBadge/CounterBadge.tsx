'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CounterBadgeProps } from './CounterBadge.types';
import { renderCounterBadge } from './renderCounterBadge';
import { useCounterBadge } from './useCounterBadge';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A headless badge for displaying a count or dot.
 */
export const CounterBadge: ForwardRefComponent<CounterBadgeProps> = /*#__PURE__*/ composeComponent(
  'CounterBadge',
  useCounterBadge,
  renderCounterBadge,
);
