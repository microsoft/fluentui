'use client';

import type * as React from 'react';
import { useAvatarBase_unstable } from '@fluentui/react-avatar';
import { slot } from '@fluentui/react-utilities';

import type { AvatarProps, AvatarState } from './Avatar.types';
import { PresenceBadge } from '../../badge';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for an Avatar component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderAvatar`.
 */
export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const baseState = useAvatarBase_unstable(props, ref);

  const state: AvatarState = {
    ...baseState,
    components: { root: 'span', initials: 'span', icon: 'span', image: 'img', badge: PresenceBadge },
    root: {
      ...baseState.root,
      'data-active': toDataAttributeValue(baseState.active !== 'unset' && baseState.active),
    },
    badge: slot.optional(props.badge, {
      defaultProps: baseState.badge,
      elementType: PresenceBadge,
    }),
  };

  return state;
};

/**
 * Returns the value from the nearest Avatar context.
 */
export { useAvatarContext } from '@fluentui/react-avatar';
