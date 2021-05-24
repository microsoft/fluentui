import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import { Image } from '../Image/index';
import { AvatarProps, AvatarState, AvatarNamedColor, AvatarShorthandProps, AvatarSizeValue } from './Avatar.types';
import { DefaultAvatarIcon } from './DefaultAvatarIcon';
import { BadgeSize } from '@fluentui/react-badge';

/**
 * Names of the shorthand properties in AvatarProps
 */
export const avatarShorthandProps: AvatarShorthandProps[] = ['label', 'image', 'badge'];

const resolveAvatarShorthandProps = (props: AvatarProps) => {
  // If props.badge is a string, the string is the badge's status
  if (typeof props.badge === 'string') {
    props = {
      ...props,
      badge: { status: props.badge },
    };
  }

  return resolveShorthandProps(props, avatarShorthandProps);
};

const mergeProps = makeMergeProps<AvatarState>({ deepMerge: avatarShorthandProps });

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps): AvatarState => {
  const state = mergeProps(
    {
      as: 'span',
      label: { as: 'span' },
      size: 32,
      color: 'neutral',
      activeDisplay: 'ring',
      getInitials,
      ref,
    },
    defaultProps && resolveAvatarShorthandProps(defaultProps),
    resolveAvatarShorthandProps(props),
  );

  if (state.image && !state.image.as) {
    state.image.as = Image;
  }

  // If a label was not provided, use the following priority:
  // icon => initials => default icon
  if (!state.label.children) {
    if (state.icon) {
      state.label.children = state.icon;
    } else {
      const initials = state.getInitials(state.name || '', /*isRtl: */ false);
      if (initials) {
        state.label.children = initials;
      } else {
        // useAvatarStyles expects state.icon to be set if displaying an icon
        state.label.children = state.icon = <DefaultAvatarIcon />;
      }
    }
  }

  if (state.badge && !state.badge.size) {
    state.badge.size = getBadgeSize(state.size);
  }

  if (state.color === 'colorful') {
    const value = state.idForColor || state.name;
    if (value) {
      state.color = avatarColors[getHashCode(value) % avatarColors.length];
    }
  }

  return state;
};

const getBadgeSize = (size: AvatarSizeValue): BadgeSize => {
  if (size < 24) {
    return 'smallest';
  } else if (size < 28) {
    return 'smaller';
  } else if (size < 52) {
    return 'small';
  } else if (size < 72) {
    return 'medium';
  } else if (size < 96) {
    return 'large';
  } else {
    return 'larger';
  }
};

const avatarColors: AvatarNamedColor[] = [
  'darkRed',
  'cranberry',
  'red',
  'pumpkin',
  'peach',
  'marigold',
  'gold',
  'brass',
  'brown',
  'forest',
  'seafoam',
  'darkGreen',
  'lightTeal',
  'teal',
  'steel',
  'blue',
  'royalBlue',
  'cornflower',
  'navy',
  'lavender',
  'purple',
  'grape',
  'lilac',
  'pink',
  'magenta',
  'plum',
  'beige',
  'mink',
  'platinum',
  'anchor',
];

const getHashCode = (str: string): number => {
  let hashCode = 0;
  for (let len: number = str.length - 1; len >= 0; len--) {
    const ch = str.charCodeAt(len);
    const shift = len % 8;
    hashCode ^= (ch << shift) + (ch >> (8 - shift)); // eslint-disable-line no-bitwise
  }

  return hashCode;
};
