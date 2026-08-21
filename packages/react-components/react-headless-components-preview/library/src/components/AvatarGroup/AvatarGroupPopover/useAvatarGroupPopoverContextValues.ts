'use client';

import * as React from 'react';
import type { AvatarGroupContextValue, AvatarGroupContextValues } from '@fluentui/react-avatar';

import type { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

/**
 * Builds the context value provided to the overflowed AvatarGroupItems rendered
 * inside the popover surface. `isOverflow` switches the items to their overflow
 * (list) presentation.
 */
export const useAvatarGroupPopoverContextValues = (state: AvatarGroupPopoverState): AvatarGroupContextValues => {
  const avatarGroup = React.useMemo<AvatarGroupContextValue>(() => ({ isOverflow: true }), []);

  return { avatarGroup };
};
