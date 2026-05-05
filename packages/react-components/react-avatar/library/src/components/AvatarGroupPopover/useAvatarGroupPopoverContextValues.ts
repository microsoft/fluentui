'use client';

import * as React from 'react';
import type { AvatarGroupContextValue, AvatarGroupContextValues } from '../AvatarGroup/AvatarGroup.types';
import type { AvatarGroupPopoverState } from './AvatarGroupPopover.types';

export const useAvatarGroupPopoverContextValues_unstable = (
  state: AvatarGroupPopoverState,
): AvatarGroupContextValues => {
  const avatarGroup = React.useMemo<AvatarGroupContextValue>(
    () => ({
      isOverflow: true,
      size: 24,
    }),
    [],
  );

  return { avatarGroup };
};
