import * as React from 'react';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { getInitials } from '../../utils/index';
import type { AvatarNamedColor, AvatarProps, AvatarState } from './Avatar.types';
import { PersonRegular } from '@fluentui/react-icons';
import { PresenceBadge } from '@fluentui/react-badge';
import { useFluent } from '@fluentui/react-shared-contexts';

export const useAvatar_unstable = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const { dir } = useFluent();
  const { name, size = 32, shape = 'circular', active = 'unset', activeAppearance = 'ring', idForColor } = props;
  let { color = 'neutral' } = props;

  // Resolve 'colorful' to a specific color name
  if (color === 'colorful') {
    color = avatarColors[getHashCode(idForColor ?? name ?? '') % avatarColors.length];
  }

  // Resolve the initials slot, defaulted to getInitials.
  let initials: AvatarState['initials'] = resolveShorthand(props.initials, {
    required: true,
    defaultProps: {
      children: getInitials(name, dir === 'rtl'),
      'aria-hidden': true,
    },
  });

  // Resolve the icon slot only if there aren't any initials to display.
  let icon: AvatarState['icon'] = undefined;
  if (!initials?.children) {
    initials = undefined;
    icon = resolveShorthand(props.icon, {
      required: true,
      defaultProps: {
        children: <PersonRegular />,
        'aria-hidden': true,
      },
    });
  }

  // The image's alt text should be the name, but if name is missing, fall back to the initials
  let alt = name;
  if (!alt && typeof initials?.children === 'string') {
    alt = initials.children;
  }

  // Resolve the image slot
  const image = resolveShorthand(props.image, { defaultProps: { alt } });

  // If there's no image, make either the initials or icon have role="img" and aria-label={alt}
  if (!image) {
    const fallbackSlot = initials || icon;
    if (fallbackSlot) {
      fallbackSlot.role ??= 'img';
      fallbackSlot['aria-label'] ??= alt;
      delete fallbackSlot['aria-hidden'];
    }
  }

  return {
    size,
    name,
    shape,
    active,
    activeAppearance,
    color,
    idForColor,

    components: {
      root: 'span',
      initials: 'span',
      icon: 'span',
      image: 'img',
      badge: PresenceBadge,
    },

    root: getNativeElementProps('span', { ...props, ref }, /* excludedPropNames: */ ['name']),
    initials,
    icon,
    image,
    badge: resolveShorthand(props.badge, {
      defaultProps: { size: getBadgeSize(size) },
    }),
  };
};

const getBadgeSize = (size: AvatarState['size']) => {
  if (size >= 96) {
    return 'extra-large';
  } else if (size >= 64) {
    return 'large';
  } else if (size >= 56) {
    return 'medium';
  } else if (size >= 40) {
    return 'small';
  } else if (size >= 28) {
    return 'extra-small';
  } else {
    return 'tiny';
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
