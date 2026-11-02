'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BadgeProps } from './Badge.types';
import { useBadge } from './useBadge';
import { renderBadge } from './renderBadge';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A badge component for displaying counts or labels.
 */
export const Badge: ForwardRefComponent<BadgeProps> = /*#__PURE__*/ composeComponent('Badge', useBadge, renderBadge);
