import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import { AvatarNamedColor, AvatarProps, AvatarSizeValue, AvatarState } from './Avatar.types';
import {
  Person16Regular,
  Person20Regular,
  Person24Regular,
  Person28Regular,
  Person32Regular,
  Person48Regular,
} from '@fluentui/react-icons';
import { PresenceBadge } from '@fluentui/react-badge';
import { useFluent } from '@fluentui/react-shared-contexts';

export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const { dir } = useFluent();
  const { size = 32 } = props;
  let { color = 'neutral' } = props;

  // Resolve 'colorful' to a specific color name
  if (color === 'colorful') {
    color = avatarColors[getHashCode(props.idForColor ?? props.name ?? '') % avatarColors.length];
  }

  const state: AvatarState = {
    size,
    activeDisplay: 'ring',
    getInitials,
    ref,

    ...props,

    color,

    components: {
      root: 'span',
      label: 'span',
      icon: 'span',
      image: 'img',
      badge: PresenceBadge,
    },

    label: resolveShorthand(props.label),

    // The icon will be resolved below, only if there is no label text
    icon: undefined,

    // If a string is provided for image, it is the img's src property rather than its children
    image: resolveShorthand(typeof props.image === 'string' ? { src: props.image } : props.image),

    // If a string is provided for badge, it is the PresenceBadge's status property rather than its children
    badge: resolveShorthand(typeof props.badge === 'string' ? { status: props.badge } : props.badge, {
      defaultProps: { size: getBadgeSize(size) },
    }),
  };

  // If a label was not provided, use the initials and fall back to the icon if initials aren't available
  if (!state.label?.children) {
    const initials = state.getInitials(state.name || '', dir === 'rtl');
    if (initials) {
      state.label = { ...state.label, children: initials };
    } else {
      state.icon = resolveShorthand(props.icon, {
        required: true,
        defaultProps: { children: getDefaultIcon(state.size) },
      });
    }
  }

  return state;
};

const getDefaultIcon = (size: AvatarSizeValue) => {
  if (size <= 24) {
    return <Person16Regular />;
  } else if (size <= 40) {
    return <Person20Regular />;
  } else if (size <= 48) {
    return <Person24Regular />;
  } else if (size <= 56) {
    return <Person28Regular />;
  } else if (size <= 72) {
    return <Person32Regular />;
  } else {
    return <Person48Regular />;
  }
};

const getBadgeSize = (size: AvatarSizeValue) => {
  if (size <= 24) {
    return 'smallest';
  } else if (size <= 36) {
    return 'smaller';
  } else if (size <= 48) {
    return 'small';
  } else if (size <= 56) {
    return 'medium';
  } else if (size <= 72) {
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
