'use client';

import type { AvatarGroupContextValues } from '@fluentui/react-avatar';
import { useAvatarGroupPopoverContextValues_unstable } from '@fluentui/react-avatar';

import type { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

/**
 * Builds the context value provided to the overflowed AvatarGroupItems rendered
 * inside the popover surface. `isOverflow` switches the items to their overflow
 * (list) presentation.
 */
export const useAvatarGroupPopoverContextValues = useAvatarGroupPopoverContextValues_unstable as unknown as (
  state: AvatarGroupPopoverState,
) => AvatarGroupContextValues;
