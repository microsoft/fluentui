import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { getInitials as getInitialsDefault } from '../../utils/index';
import type { AvatarNamedColor, AvatarProps, AvatarSizeValue, AvatarState } from './Avatar.types';
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
  const {
    name = '',
    size = 32,
    square = false,
    active = 'unset',
    activeDisplay = 'ring',
    idForColor,
    getInitials = getInitialsDefault,
  } = props;
  let { color = 'neutral' } = props;

  // Resolve 'colorful' to a specific color name
  if (color === 'colorful') {
    color = avatarColors[getHashCode(props.idForColor ?? props.name ?? '') % avatarColors.length];
  }

  const state: AvatarState = {
    size,
    name,
    square,
    active,
    activeDisplay,
    color,
    idForColor,
    getInitials,

    components: {
      root: 'span',
      label: 'span',
      icon: 'span',
      image: 'img',
      badge: PresenceBadge,
    },

    root: getNativeElementProps('span', { ...props, ref }),
    label: resolveShorthand(props.label),
    icon: undefined, // The icon will be resolved below if there is no label text
    image: resolveShorthand(props.image),
    badge: resolveShorthand(props.badge, {
      defaultProps: { size: getBadgeSize(size) },
    }),
  };

  // If a label was not provided, use the initials and fall back to the icon if initials aren't available
  if (!state.label?.children) {
    const initials = state.getInitials(state.name, dir === 'rtl');
    if (initials) {
      state.label = { ...state.label, children: initials };
    } else {
      state.icon = resolveShorthand(props.icon, {
        required: true,
        defaultProps: {
          children: getDefaultIcon(state.size),
        },
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
