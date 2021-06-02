import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import { AvatarProps, AvatarState, AvatarNamedColor, AvatarShorthandProps } from './Avatar.types';
import { DefaultAvatarIcon } from './DefaultAvatarIcon';

/**
 * Names of the shorthand properties in AvatarProps
 */
export const avatarShorthandProps: AvatarShorthandProps[] = ['label', 'image', 'badge'];

const mergeProps = makeMergeProps<AvatarState>({ deepMerge: avatarShorthandProps });

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps): AvatarState => {
  const state = mergeProps(
    {
      as: 'span',
      label: { as: 'span' },
      image: { as: 'img' },
      size: 32,
      color: 'neutral',
      activeDisplay: 'ring',
      getInitials,
      ref,
    },
    defaultProps && resolveAvatarShorthandProps(defaultProps),
    resolveAvatarShorthandProps(props),
  );

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

  // Provide a default badge size based on the avatar size
  if (state.badge && state.badge.size === undefined) {
    const { size, badge } = state;
    if (size >= 96) {
      badge.size = 'larger';
    } else if (size >= 64) {
      badge.size = 'large';
    } else if (size >= 56) {
      badge.size = 'medium';
    } else if (size >= 40) {
      badge.size = 'small';
    } else if (size >= 28) {
      badge.size = 'smaller';
    } else {
      badge.size = 'smallest';
    }
  }

  if (state.color === 'colorful') {
    const value = state.idForColor || state.name;
    if (value) {
      state.color = avatarColors[getHashCode(value) % avatarColors.length];
    }
  }

  return state;
};

/**
 * Avatar treats shorthand for the image and badge props differently. Rather than the string being
 * the child of those slots, they translate to the image's src and the badge's status prop.
 */
const resolveAvatarShorthandProps = (props: AvatarProps) => {
  const image = typeof props.image === 'string' ? { src: props.image, children: null } : props.image;
  const badge = typeof props.badge === 'string' ? { status: props.badge, children: null } : props.badge;
  if (image !== props.image || badge !== props.badge) {
    props = { ...props, image, badge };
  }
  return resolveShorthandProps(props, avatarShorthandProps);
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
