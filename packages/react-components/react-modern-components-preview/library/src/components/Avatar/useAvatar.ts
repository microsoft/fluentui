'use client';

import type * as React from 'react';
import { useAvatar as useAvatarBase, useAvatarContext } from '@fluentui/react-headless-components-preview/avatar';
import type { AvatarNamedColor, AvatarProps, AvatarState } from './Avatar.types';

const avatarColors: AvatarNamedColor[] = [
  'dark-red',
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
  'dark-green',
  'light-teal',
  'teal',
  'steel',
  'blue',
  'royal-blue',
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

/**
 * Create the state required to render Avatar.
 */
export const useAvatar = (props: AvatarProps, ref: React.Ref<HTMLElement>): AvatarState => {
  const context = useAvatarContext();
  const {
    activeAppearance = 'ring',
    color: propColor = 'neutral',
    idForColor,
    shape = context.shape ?? 'circular',
    size = context.size ?? 32,
    ...rest
  } = props;
  const state = useAvatarBase(rest, ref);
  const color: AvatarState['color'] =
    propColor === 'colorful'
      ? avatarColors[getHashCode(idForColor ?? props.name ?? '') % avatarColors.length]
      : propColor;
  const badgeSize = state.badge ? getBadgeSize(size) : undefined;

  return {
    ...state,
    root: {
      ...state.root,
      'data-active-appearance': activeAppearance,
      'data-badge-size': badgeSize,
      'data-color': color,
      'data-has-badge': state.badge ? '' : undefined,
      'data-shape': shape,
      'data-size': `${size}`,
    },
    activeAppearance,
    color,
    shape,
    size,
  };
};

const getBadgeSize = (size: AvatarState['size']): NonNullable<AvatarState['root']['data-badge-size']> => {
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
  }

  return 'tiny';
};

const getHashCode = (value: string): number => {
  let hashCode = 0;
  for (let index = value.length - 1; index >= 0; index--) {
    const character = value.charCodeAt(index);
    const shift = index % 8;
    hashCode ^= (character << shift) + (character >> (8 - shift)); // eslint-disable-line no-bitwise
  }

  return hashCode;
};
