'use client';

import { useAvatarGroupContextValues as useAvatarGroupContextValues_unstable } from '@fluentui/react-avatar';

import type { AvatarGroupContextValues, AvatarGroupState } from './AvatarGroup.types';

/**
 * Builds the context value shared with the AvatarGroupItems and AvatarGroupPopover
 * rendered inside the AvatarGroup.
 */
export const useAvatarGroupContextValues = useAvatarGroupContextValues_unstable as (
  state: AvatarGroupState,
) => AvatarGroupContextValues;
