'use client';

import type * as React from 'react';
import { useAvatarGroupBase_unstable } from '@fluentui/react-avatar';

import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';

/**
 * Returns the state for an AvatarGroup component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAvatarGroup`.
 */
export const useAvatarGroup = (props: AvatarGroupProps, ref: React.Ref<HTMLElement>): AvatarGroupState => {
  return useAvatarGroupBase_unstable(props, ref as React.Ref<HTMLDivElement>);
};
