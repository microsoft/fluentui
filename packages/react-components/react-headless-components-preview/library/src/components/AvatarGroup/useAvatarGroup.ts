'use client';

import type * as React from 'react';
import { useAvatarGroupBase_unstable } from '@fluentui/react-avatar';

import type { AvatarGroupProps, AvatarGroupState } from './AvatarGroup.types';

/**
 * Returns the state for an AvatarGroup component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAvatarGroup`.
 */
export const useAvatarGroup = (props: AvatarGroupProps, ref: React.Ref<HTMLDivElement>): AvatarGroupState => {
  const state: AvatarGroupState = useAvatarGroupBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-layout'] = state.layout;

  return state;
};
