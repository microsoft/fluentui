'use client';

import * as React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroupContext, useAvatarGroupContext_unstable } from '../../contexts/AvatarGroupContext';
import { defaultAvatarGroupSize } from '../AvatarGroup/useAvatarGroup';
import { slot } from '@fluentui/react-utilities';
import { useHasParentContext } from '@fluentui/react-context-selector';
import type {
  AvatarGroupItemBaseProps,
  AvatarGroupItemBaseState,
  AvatarGroupItemProps,
  AvatarGroupItemState,
} from './AvatarGroupItem.types';

/**
 * Create the state required to render AvatarGroupItem.
 *
 * The returned state can be modified with hooks such as useAvatarGroupItemStyles_unstable,
 * before being passed to renderAvatarGroupItem_unstable.
 *
 * @param props - props from this instance of AvatarGroupItem
 * @param ref - reference to root HTMLElement of AvatarGroupItem
 */
export const useAvatarGroupItem_unstable = (
  props: AvatarGroupItemProps,
  ref: React.Ref<HTMLElement>,
): AvatarGroupItemState => {
  const state = useAvatarGroupItemBase_unstable(props, ref);
  const groupSize = useAvatarGroupContext_unstable(ctx => ctx.size);
  const size = groupSize ?? defaultAvatarGroupSize;

  return {
    size,
    ...state,
    components: {
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      ...state.components,
      avatar: Avatar,
    },
    avatar: slot.always(props.avatar, {
      defaultProps: { size, color: 'colorful', ...state.avatar },
      elementType: Avatar,
    }),
  };
};

/**
 * Create the base state required to render AvatarGroupItem, without default slot props or component types.
 *
 * The returned state can be modified with hooks such as useAvatarGroupItemStyles_unstable,
 * before being passed to renderAvatarGroupItem_unstable.
 *
 * @param props - props from this instance of AvatarGroupItem
 * @param ref - reference to root HTMLElement of AvatarGroupItem
 * @returns AvatarGroupItem state without default slot props or component types
 */
export const useAvatarGroupItemBase_unstable = (
  props: AvatarGroupItemBaseProps,
  ref: React.Ref<HTMLElement>,
): AvatarGroupItemBaseState => {
  const groupIsOverflow = useAvatarGroupContext_unstable(ctx => ctx.isOverflow);
  const layout = useAvatarGroupContext_unstable(ctx => ctx.layout);
  // Since the primary slot is not an intrinsic element, getPartitionedNativeProps cannot be used here.
  const { style, className, overflowLabel, ...avatarSlotProps } = props;
  const hasAvatarGroupContext = useHasParentContext(AvatarGroupContext);

  if (process.env.NODE_ENV !== 'production' && !hasAvatarGroupContext) {
    // eslint-disable-next-line no-console
    console.warn('AvatarGroupItem must only be used inside an AvatarGroup component.');
  }

  return {
    isOverflowItem: groupIsOverflow,
    layout,
    components: {
      root: groupIsOverflow ? 'li' : 'div',
      avatar: 'span',
      overflowLabel: 'span',
    },
    root: slot.always(props.root, {
      defaultProps: {
        style,
        className,
      },
      elementType: groupIsOverflow ? 'li' : 'div',
    }),
    avatar: slot.always(props.avatar, {
      defaultProps: {
        ref,
        ...avatarSlotProps,
      },
      elementType: 'span',
    }),
    overflowLabel: slot.always(overflowLabel, {
      defaultProps: {
        // Avatar already has its aria-label set to the name, this will prevent the name to be read twice.
        'aria-hidden': true,
        children: props.name,
      },
      elementType: 'span',
    }),
  };
};
