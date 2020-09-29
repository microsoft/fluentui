import * as React from 'react';
import { makeMergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { AvatarProps, AvatarState, defaultAvatarSize } from './Avatar.types';
import { calcAvatarStyleProps } from './calcAvatarStyleProps';
import { useMergedRefs } from '@uifabric/react-hooks';
import { getInitials as defaultGetInitials, nullRender } from '@uifabric/utilities';
import { Image } from '../Image/index';
import { ContactIcon as DefaultAvatarIcon } from '@fluentui/react-icons';

const avatarShorthandProps: (keyof AvatarProps)[] = ['label', 'image', 'badge'];

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

const mergeProps = makeMergeProps({ deepMerge: avatarShorthandProps });

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps) => {
  const state = mergeProps(
    {
      as: 'span',
      components: {
        label: 'span',
        image: props.image ? Image : null,
        badge: nullRender,
      },
      display: props.image ? 'image' : 'label',
      badge: { size: props.size },
      activeDisplay: 'ring',
      size: defaultAvatarSize,
      getInitials: defaultGetInitials,
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  // Add in props used for styling
  mergeProps(state, calcAvatarStyleProps(state));

  // Display the initials if there's no label
  if (!state.label.children) {
    const initials = state.getInitials(state.name || '', /*isRtl: */ false);
    if (initials) {
      state.label.children = initials;
    } else if (state.display === 'label') {
      state.display = 'icon'; // If there are no initials or image, fall back to the icon
    }
  }

  // Display the icon if requested
  if (state.display === 'icon') {
    state.label.children = state.icon || <DefaultAvatarIcon />;
  }

  // Don't show the image if it's not supposed to be displayed
  if (state.display !== 'image') {
    state.image = { as: nullRender };
  }

  return { state, render: renderAvatar };
};
