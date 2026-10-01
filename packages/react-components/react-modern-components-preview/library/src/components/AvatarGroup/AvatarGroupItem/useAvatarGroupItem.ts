'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import {
  useAvatarGroupContext,
  useAvatarGroupItem as useAvatarGroupItemBase,
} from '@fluentui/react-headless-components-preview/avatar-group';
import { Avatar } from '../../Avatar/Avatar';
import type { AvatarGroupItemProps, AvatarGroupItemState } from './AvatarGroupItem.types';

/** Create the state required to render AvatarGroupItem. */
export const useAvatarGroupItem = (props: AvatarGroupItemProps, ref: React.Ref<HTMLElement>): AvatarGroupItemState => {
  const baseState = useAvatarGroupItemBase(props, ref);
  const size = useAvatarGroupContext(context => context.size) ?? 32;

  return {
    ...baseState,
    size,
    components: {
      root: 'div',
      avatar: Avatar,
      overflowLabel: 'span',
    },
    root: {
      ...baseState.root,
      'data-layout': baseState.layout,
      'data-overflow-item': baseState.isOverflowItem ? '' : undefined,
      'data-size': `${size}`,
    },
    avatar: slot.always(props.avatar, {
      defaultProps: { size, color: 'colorful', ...baseState.avatar },
      elementType: Avatar,
    }),
  };
};
