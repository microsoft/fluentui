import * as React from 'react';
import { makeMergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { AvatarProps, AvatarState } from './Avatar.types';
import { useMergedRefs } from '@uifabric/react-hooks';
import { getInitials, nullRender } from '@uifabric/utilities';
import { Image } from '../Image/index';
import { ContactIcon } from '@fluentui/react-icons';

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
      display: props.image ? 'image' : 'label',
      label: { as: 'span' },
      image: { as: Image },
      badge: { as: nullRender },
      icon: <ContactIcon />,
      getInitials: getInitials,
      ref: useMergedRefs(ref, React.useRef(null)),
      tokens: props.size && { size: `${props.size}px` },
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  // Display the initials if the label has no children
  if (!state.label.children) {
    state.label.children = state.getInitials(props.name || '', /*isRtl: */ false);
  }

  // Display the icon instead of the initials if requested or there are no initials
  if (state.display === 'icon' || !state.label.children) {
    state.label.children = state.icon;

    // Make sure the display prop reflects what's being shown, so styles are applied appropriately
    if (state.display === 'label') {
      state.display = 'icon';
    }
  }

  // Don't show the image if it's not supposed to be displayed
  if (state.display !== 'image') {
    state.image.as = nullRender;
  }

  return { state, render: renderAvatar };
};
