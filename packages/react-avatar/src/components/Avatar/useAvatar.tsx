import * as React from 'react';
import { mergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { AvatarProps, AvatarState } from './Avatar.types';
import { useMergedRefs } from '@uifabric/react-hooks';
import { getInitials, nullRender } from '@uifabric/utilities';
import { Image } from '../Image/index';

const avatarShorthandProps: (keyof AvatarProps)[] = ['label', 'image', 'status'];

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
      status: { as: 'span', size: props.size },
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  return { state, render: renderAvatar };
};
