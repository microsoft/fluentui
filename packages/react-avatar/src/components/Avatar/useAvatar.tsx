import * as React from 'react';
import { mergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { AvatarProps, AvatarState, NumericSizeValue } from './Avatar.types';
import { useMergedRefs } from '@uifabric/react-hooks';
import { getInitials, nullRender } from '@uifabric/utilities';
import { Image } from '../Image/index';
import { SizeValue } from '../utils/commonTypes';

const avatarShorthandProps: (keyof AvatarProps)[] = ['label', 'image', 'status'];

const getBadgeSize = (size: NumericSizeValue | undefined): SizeValue | undefined => {
  if (size === undefined) return undefined;
  if (size <= 20) return 'smallest';
  if (size <= 24) return 'smaller';
  if (size <= 28) return 'small';
  if (size <= 32) return 'medium';
  if (size <= 44) return 'large';
  if (size <= 64) return 'larger';
  return 'largest';
};

export const renderAvatar = (state: AvatarState) => {
  const { slots, slotProps } = getSlots(state, avatarShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.label {...slotProps.label} />
      <slots.image {...slotProps.image} />
      <slots.status {...slotProps.status} />
    </slots.root>
  );
};

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps) => {
  const state = mergeProps(
    {
      as: 'span',
      label: {
        as: 'span',
        children: props.getInitials ? props.getInitials(props.name || '', false) : getInitials(props.name || '', false),
      },
      image: { as: props.image ? Image : nullRender },
      status: { as: 'span', size: getBadgeSize(props.size) },
      ref: useMergedRefs(ref, React.useRef(null)),
      tokens: { size: props.size ? `${props.size}px` : undefined },
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  return { state, render: renderAvatar };
};
