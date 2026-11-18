'use client';

import { useAvatarGroupPopover } from './useAvatarGroupPopover';
import { useAvatarGroupPopoverContextValues } from './useAvatarGroupPopoverContextValues';
import { renderAvatarGroupPopover } from './renderAvatarGroupPopover';
import { composeComponentWithoutRef } from '../../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../../utils/composeComponent';
import type { AvatarGroupPopoverProps } from './AvatarGroupPopover.types';

/**
 * The AvatarGroupPopover renders the overflowed AvatarGroupItems of an AvatarGroup
 * inside a headless Popover, triggered by a button showing the overflow count.
 */
export const AvatarGroupPopover: ComponentWithoutRef<AvatarGroupPopoverProps> =
  /*#__PURE__*/ composeComponentWithoutRef(
    'AvatarGroupPopover',
    useAvatarGroupPopover,
    useAvatarGroupPopoverContextValues,
    renderAvatarGroupPopover,
  );
