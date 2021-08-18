import * as React from 'react';
import { makeMergeProps, resolveShorthandProps } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import { AvatarProps, AvatarState, AvatarNamedColor } from './Avatar.types';
import {
  Person16Regular,
  Person20Regular,
  Person24Regular,
  Person28Regular,
  Person32Regular,
  Person48Regular,
} from '@fluentui/react-icons';
import { PresenceBadge } from '@fluentui/react-badge';

/**
 * Names of the shorthand properties in AvatarProps
 */
export const avatarShorthandPropsCompat: AvatarShorthandPropsCompat[] = ['label', 'image', 'badge', 'icon'];

const mergeProps = makeMergeProps<AvatarState>({ deepMerge: avatarShorthandPropsCompat });

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>, defaultProps?: AvatarProps): AvatarState => {
  const state = mergeProps(
    {
      as: 'span',
      label: { as: 'span' },
      icon: { as: 'span' },
      size: 32,
      color: 'neutral',
      activeDisplay: 'ring',
      getInitials,
      ref,
    },
    defaultProps && resolveAvatarShorthandPropsCompat(defaultProps),
    resolveAvatarShorthandPropsCompat(props),
  );

  const { size, badge, label, icon } = state;

  // If a label was not provided, use the initials and fall back to the icon if initials aren't available
  if (!label.children) {
    const initials = state.getInitials(state.name || '', /*isRtl: */ false);
    if (initials) {
      label.children = initials;
    } else {
      state.showIcon = true;
      if (!icon.children) {
        if (size <= 24) {
          icon.children = <Person16Regular />;
        } else if (size <= 40) {
          icon.children = <Person20Regular />;
        } else if (size <= 48) {
          icon.children = <Person24Regular />;
        } else if (size <= 56) {
          icon.children = <Person28Regular />;
        } else if (size <= 72) {
          icon.children = <Person32Regular />;
        } else {
          icon.children = <Person48Regular />;
        }
      }
    }
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
const resolveAvatarShorthandPropsCompat = (props: AvatarProps) => {
  let { image, badge } = props;

  if (typeof image === 'string') {
    image = { as: 'img', src: image, children: null };
  }

  if (typeof badge === 'string') {
    badge = { as: PresenceBadge, status: badge };
  }

  if (image !== props.image || badge !== props.badge) {
    props = { ...props, image, badge };
  }

  return resolveShorthandProps(props, avatarShorthandPropsCompat);
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
