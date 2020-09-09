import * as React from 'react';
import { mergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import { AvatarProps, AvatarState, AvatarSizeValue, avatarSizes, defaultAvatarSize } from './Avatar.types';
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

/**
 * The "size class" of the avatar is the closest AvatarSizeValue that is less-or-equal to the given custom size.
 * This is used in scss style rules to pick the appropriate font size, icon size, etc.
 */
const calcSizeClass = (customSize: number): AvatarSizeValue => {
  // Note: deliberately skipping i = 0 because it's the default return value below
  for (let i = avatarSizes.length - 1; i > 0; i--) {
    if (customSize >= avatarSizes[i]) {
      return avatarSizes[i];
    }
  }

  return avatarSizes[0];
};

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps) => {
  const { size = defaultAvatarSize, customSize } = props;

  const state = mergeProps(
    {
      as: 'span',
      display: props.image ? 'image' : 'label',
      label: { as: 'span' },
      image: { as: Image },
      badge: { as: nullRender },
      getInitials: defaultGetInitials,
      ref: useMergedRefs(ref, React.useRef(null)),
      sizeClass: customSize ? calcSizeClass(customSize) : size,
      tokens: { size: `${customSize || size}px` },
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  // Display the initials if there's no label
  if (!state.label.children) {
    const initials = state.getInitials(state.name || '', /*isRtl: */ false);
    if (initials) {
      state.label.children = initials;
    } else {
      state.display = 'icon'; // If there are no initials, fall back to the icon
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
