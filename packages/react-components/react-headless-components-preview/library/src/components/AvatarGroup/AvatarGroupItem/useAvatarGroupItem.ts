'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { useAvatarGroupItemBase_unstable } from '@fluentui/react-avatar';

import { Avatar } from '../../Avatar/Avatar';
import type { AvatarGroupItemProps, AvatarGroupItemState } from './AvatarGroupItem.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for an AvatarGroupItem component, given its props and ref.
 *
 * Reuses the design-agnostic base hook from `@fluentui/react-avatar` for the
 * root/overflow-label wiring, then swaps the `avatar` slot to render the
 * headless `Avatar` from this package instead of the styled v9 Avatar.
 */
export const useAvatarGroupItem = (props: AvatarGroupItemProps, ref: React.Ref<HTMLElement>): AvatarGroupItemState => {
  const state = useAvatarGroupItemBase_unstable(props, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-overflow-item': toDataAttributeValue(state.isOverflowItem),
    },
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      avatar: Avatar,
    },
    avatar: slot.always(props.avatar, {
      defaultProps: { ...state.avatar },
      elementType: Avatar,
    }),
  };
};
