'use client';

import { useAvatarGroupPopover } from './useAvatarGroupPopover';
import { useAvatarGroupPopoverContextValues } from './useAvatarGroupPopoverContextValues';
import { renderAvatarGroupPopover } from './renderAvatarGroupPopover';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';

/**
 * The AvatarGroupPopover renders the overflowed AvatarGroupItems of an AvatarGroup
 * inside a headless Popover, triggered by a button showing the overflow count.
 */
export const AvatarGroupPopover = /*#__PURE__*/ composeComponentWithoutRef(
  'AvatarGroupPopover',
  useAvatarGroupPopover,
  useAvatarGroupPopoverContextValues,
  renderAvatarGroupPopover,
);
