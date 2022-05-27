import * as React from 'react';
import { Avatar } from '../Avatar';
import { AvatarGroupContext } from '../../contexts';
import { Label } from '@fluentui/react-label';
import { resolveShorthand } from '@fluentui/react-utilities';
import { useContextSelector } from '@fluentui/react-context-selector';
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
  const groupOverflowItem = useContextSelector(AvatarGroupContext, ctx => ctx.overflowItem);
  const groupSize = useContextSelector(AvatarGroupContext, ctx => ctx.size);
  const itemColor = useContextSelector(AvatarGroupContext, ctx => ctx.color);
  // Since the primary slot is not an input element, getPartitionedNativeProps cannot be used here.
  const { style, className, ...avatarSlotProps } = props;

  return {
    isOverflowItem: groupOverflowItem,
    components: {
      root: 'div',
      avatar: Avatar,
      label: Label,
    },
    root: resolveShorthand(props.root, {
      required: true,
      defaultProps: {
        style,
        className,
        as: groupOverflowItem ? 'li' : 'div',
        role: groupOverflowItem ? 'listitem' : undefined,
      },
    }),
    avatar: resolveShorthand(props.avatar, {
      required: true,
      defaultProps: {
        ref,
        size: groupSize,
        color: itemColor,
        ...avatarSlotProps,
      },
    }),
    label: resolveShorthand(props.label, {
      required: true,
      defaultProps: {
        children: groupOverflowItem ? props.name : null,
      },
    }),
  };
};
