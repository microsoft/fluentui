'use client';

import type * as React from 'react';

import type { AvatarGroupPopoverProps } from './AvatarGroupPopover.types';
import { useAvatarGroupPopover } from './useAvatarGroupPopover';
import { useAvatarGroupPopoverContextValues } from './useAvatarGroupPopoverContextValues';
import { renderAvatarGroupPopover } from './renderAvatarGroupPopover';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';

/**
 * The AvatarGroupPopover renders the overflowed AvatarGroupItems of an AvatarGroup
 * inside a headless Popover, triggered by a button showing the overflow count.
 */
export const AvatarGroupPopover: React.FC<AvatarGroupPopoverProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'AvatarGroupPopover',
  useAvatarGroupPopover,
  useAvatarGroupPopoverContextValues,
  renderAvatarGroupPopover,
);
