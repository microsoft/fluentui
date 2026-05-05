'use client';

import * as React from 'react';
import type { AvatarGroupContextValue, AvatarGroupContextValues, AvatarGroupState } from '../AvatarGroup';

export const useAvatarGroupContextValues = (state: AvatarGroupState): AvatarGroupContextValues => {
  const { layout, size } = state;

  const avatarGroup = React.useMemo<AvatarGroupContextValue>(
    () => ({
      layout,
      size,
    }),
    [layout, size],
  );

  return { avatarGroup };
};
