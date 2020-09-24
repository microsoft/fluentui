import * as React from 'react';
import { makeMergeProps, getSlots, resolveShorthandProps } from '@fluentui/react-compose/lib/next/index';
import {
  AvatarProps,
  AvatarState,
  AvatarSizeValue,
  avatarSizeValues,
  defaultAvatarSize,
  AvatarTokenSet,
} from './Avatar.types';
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

/**
 * The "size class" of the avatar is the closest AvatarSizeValue that is less-or-equal to the given custom size.
 * This is used in scss style rules to pick the appropriate font size, icon size, etc.
 */
const calcSizeClass = (customSize: number): AvatarSizeValue => {
  // Note: deliberately skipping i = 0 because it's the default return value below
  for (let i = avatarSizeValues.length - 1; i > 0; i--) {
    if (customSize >= avatarSizeValues[i]) {
      return avatarSizeValues[i];
    }
  }

  return avatarSizeValues[0];
};

interface AvatarStyleProps {
  size: AvatarSizeValue;
  tokens: AvatarTokenSet | undefined;
  inactive: boolean | undefined;
  activeRing: boolean | undefined;
  activeShadow: boolean | undefined;
  activeGlow: boolean | undefined;
}

const calcStyleProps = (state: AvatarState): AvatarStyleProps => ({
  // Make sure the size prop has a valid size from AvatarSizeValues
  size: state.customSize ? calcSizeClass(state.customSize) : state.size || defaultAvatarSize,
  // If a custom size was specified, override the width/height tokens
  tokens: state.customSize
    ? { width: `${state.customSize}px`, height: `${state.customSize}px`, ...state.tokens }
    : undefined,
  inactive: state.active === false,
  activeRing: state.active
    ? state.activeDisplay === 'ring' || state.activeDisplay === 'ring-shadow' || state.activeDisplay === 'ring-glow'
    : undefined,
  activeShadow: state.active ? state.activeDisplay === 'shadow' || state.activeDisplay === 'ring-shadow' : undefined,
  activeGlow: state.active ? state.activeDisplay === 'glow' || state.activeDisplay === 'ring-glow' : undefined,
});

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps) => {
  const state = mergeProps(
    {
      as: 'span',
      display: props.image ? 'image' : 'label',
      label: { as: 'span' },
      image: { as: Image },
      badge: { as: nullRender },
      activeDisplay: 'ring',
      inactive: props.active === false,
      getInitials: defaultGetInitials,
      ref: useMergedRefs(ref, React.useRef(null)),
    },
    defaultProps,
    resolveShorthandProps(props, avatarShorthandProps),
  );

  // Add in props used for styling
  mergeProps(state, calcStyleProps(state));

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
