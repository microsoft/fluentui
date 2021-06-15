import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import { AvatarProps, AvatarState, AvatarNamedColor, AvatarShorthandProps, AvatarSizeValue } from './Avatar.types';
import {
  Person12Regular,
  Person16Regular,
  Person24Regular,
  Person48Regular,
  People16Regular,
  People24Regular,
  People32Regular,
  Guest16Regular,
  Guest24Regular,
  Guest28Regular,
} from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';

export type AvatarIconSizeValue = 12 | 16 | 24 | 40 | 48;
export const getAvatarIconSize = (size: AvatarSizeValue): AvatarIconSizeValue => {
  if (size <= 24) {
    return 12;
  } else if (size <= 40) {
    return 16;
  } else if (size <= 72) {
    return 24;
  } else if (size <= 96) {
    return 40;
  } else {
    return 48;
  }
};

export const useAvatarIconSizeStyles = makeStyles({
  12: { width: '12px', height: '12px' },
  16: { width: '16px', height: '16px' },
  24: { width: '24px', height: '24px' },
  40: { width: '40px', height: '40px' },
  48: { width: '48px', height: '48px' },
});

const builtInIcons = {
  person: {
    12: Person12Regular,
    16: Person16Regular,
    24: Person24Regular,
    40: Person48Regular,
    48: Person48Regular,
  },
  group: {
    12: People16Regular,
    16: People16Regular,
    24: People24Regular,
    40: People32Regular,
    48: People32Regular,
  },
  guest: {
    12: Guest16Regular,
    16: Guest16Regular,
    24: Guest24Regular,
    40: Guest28Regular,
    48: Guest28Regular,
  },
};

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

  const { size, badge } = state;

  const iconSizeStyles = useAvatarIconSizeStyles();

  // If a label was not provided, use the following priority:
  // icon => initials => person icon
  if (!state.label.children) {
    if (!state.icon) {
      const initials = state.getInitials(state.name || '', /*isRtl: */ false);
      if (initials) {
        state.label.children = initials;
      } else {
        state.icon = 'person';
      }
    }

    if (state.icon) {
      if (typeof state.icon !== 'string') {
        state.label.children = state.icon;
      } else {
        const iconSize = getAvatarIconSize(size);
        const Icon = builtInIcons[state.icon][iconSize];
        state.label.children = <Icon className={iconSizeStyles[iconSize]} />;
      }
    }
  } else {
    // The icon won't be rendered if the label's slot was already
    state.icon = undefined;
  }

  // Provide a default badge size based on the avatar size
  if (badge && badge.size === undefined) {
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
