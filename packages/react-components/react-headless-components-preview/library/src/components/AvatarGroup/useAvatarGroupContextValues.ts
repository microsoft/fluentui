'use client';

import * as React from 'react';

import type { AvatarGroupContextValue, AvatarGroupContextValues, AvatarGroupState } from './AvatarGroup.types';

/**
 * Builds the context value shared with the AvatarGroupItems and AvatarGroupPopover
 * rendered inside the AvatarGroup. Only the design-agnostic `layout` is forwarded;
 * the styling `size` is owned by the consumer.
 */
export const useAvatarGroupContextValues = (state: AvatarGroupState): AvatarGroupContextValues => {
  const { layout } = state;

  const avatarGroup = React.useMemo<AvatarGroupContextValue>(() => ({ layout }), [layout]);

  return { avatarGroup };
};
