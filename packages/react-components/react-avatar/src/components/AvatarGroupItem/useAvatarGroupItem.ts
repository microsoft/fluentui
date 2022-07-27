import * as React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroupContext } from '../../contexts/AvatarGroupContext';
import { defaultAvatarGroupSize } from '../AvatarGroup/useAvatarGroup';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useContextSelector, useHasParentContext } from '@fluentui/react-context-selector';
import type { AvatarGroupItemProps, AvatarGroupItemState } from './AvatarGroupItem.types';

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
  const groupIsOverflow = useContextSelector(AvatarGroupContext, ctx => ctx.isOverflow);
  const groupSize = useContextSelector(AvatarGroupContext, ctx => ctx.size);
  const layout = useContextSelector(AvatarGroupContext, ctx => ctx.layout);
  // Since the primary slot is not an intrinsic element, getPartitionedNativeProps cannot be used here.
  const { style, className, ...avatarSlotProps } = props;
  const size = groupSize ?? defaultAvatarGroupSize;
  const hasAvatarGroupContext = useHasParentContext(AvatarGroupContext);

  if (process.env.NODE_ENV !== 'production' && !hasAvatarGroupContext) {
    // eslint-disable-next-line no-console
    console.warn('AvatarGroupItem must only be used inside an AvatarGroup component.');
  }

  return {
    isOverflowItem: groupIsOverflow,
    layout,
    size,
    components: {
      root: 'div',
      avatar: Avatar,
      overflowLabel: 'span',
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        style,
        className,
        role: groupIsOverflow ? 'listitem' : undefined,
      },
    }),
    avatar: resolveShorthand(props.avatar, {
      required: true,
      defaultProps: {
        ref,
        size,
        color: 'colorful',
        ...avatarSlotProps,
      },
    }),
    overflowLabel: resolveShorthand(props.overflowLabel, {
      required: true,
      defaultProps: {
        children: props.name,
      },
    }),
  };
};
