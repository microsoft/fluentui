'use client';

import type * as React from 'react';
import { useAvatarBase_unstable } from '@fluentui/react-avatar';

import type { AvatarProps, AvatarState } from './Avatar.types';

/**
 * Returns the state for an Avatar component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAvatar`.
 */
export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const state: AvatarState = useAvatarBase_unstable(props, ref);

  return state;
};
