import * as React from 'react';
import { mergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { AvatarProps, AvatarState, NumericSizeValue } from './Avatar.types';
import { useMergedRefs } from '@uifabric/react-hooks';
import { getInitials, nullRender } from '@uifabric/utilities';
import { Image } from '../Image/index';
import { SizeValue } from '../utils/commonTypes';
import { ContactIcon } from '@fluentui/react-icons';

const avatarShorthandProps: (keyof AvatarProps)[] = ['label', 'image', 'badge'];

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
      <slots.badge {...slotProps.badge} />
    </slots.root>
  );
};

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps) => {
  const state = mergeProps(
    {
      as: 'span',
      label: {
        as: 'span',
        children: (props.getInitials || getInitials)(props.name || '', /*isRtl:*/ false),
      },
      image: { as: Image },
      badge: { as: 'span', size: getBadgeSize(props.size) },
      icon: <ContactIcon />,
      ref: useMergedRefs(ref, React.useRef(null)),
      tokens: props.size && { size: `${props.size}px` },
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  if (!state.display) {
    // Pick the default display mode based on whether the image and/or label exist
    state.display = props.image ? 'image' : state.label.children ? 'label' : 'icon';
  }

  // Update the displayed content based on the final display mode
  switch (state.display) {
    case 'icon':
      state.label.children = state.icon;
      state.image = { as: nullRender };
      break;

    case 'label':
      state.image = { as: nullRender };
      break;
  }

  return { state, render: renderAvatar };
};
