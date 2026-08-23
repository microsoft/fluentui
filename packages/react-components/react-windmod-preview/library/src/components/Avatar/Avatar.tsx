'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderAvatar, useAvatar } from '@fluentui/react-headless-components-preview/avatar';
import { useProviderContext } from '@fluentui/react-headless-components-preview/provider';
import { PersonRegular } from '@fluentui/react-icons/headless/svg/person';

import type { AvatarNamedColor, AvatarProps, AvatarState } from './Avatar.types';
import { useAvatarStyles } from './useAvatarStyles';

// Hash order is load-bearing: a name must resolve to the same colour it does in the Griffel suite.
const AVATAR_COLORS: AvatarNamedColor[] = [
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

const getHashCode = (str: string): number => {
  let hashCode = 0;

  for (let len: number = str.length - 1; len >= 0; len--) {
    const ch = str.charCodeAt(len);
    const shift = len % 8;

    // eslint-disable-next-line no-bitwise
    hashCode ^= (ch << shift) + (ch >> (8 - shift));
  }

  return hashCode;
};

const ACTIVE_STRINGS = { active: 'active', inactive: 'inactive' } as const;

const firstInitial = (initials: string, rtl: boolean) => {
  const codePoints = [...initials];

  return (rtl ? codePoints[codePoints.length - 1] : codePoints[0]) ?? '';
};

/**
 * An Avatar shows a person or entity as an image, their initials, or a generic icon. Windmod
 * Avatar: the headless avatar decorated with the Fluent visual contract (Tailwind v4 + CSS
 * Modules).
 */
export const Avatar: ForwardRefComponent<AvatarProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-avatar's styled useAvatar.
  const {
    active = 'unset',
    activeAppearance = 'ring',
    color: propColor = 'neutral',
    idForColor,
    shape = 'circular',
    size = 32,
    ...rest
  } = props;

  const { dir } = useProviderContext();
  const base = useAvatar(rest, ref);

  // The headless icon slot ships no glyph of its own, and it is the last rung of the image →
  // initials → icon cascade, so an icon-only Avatar would otherwise be an empty coloured circle.
  // The slot exists only when there is neither an initials nor a visible image, and that decision
  // is made inside the hook, so the restoration has to run on the resolved state. Consumer
  // children always win; `icon={null}` still removes the slot.
  const icon: AvatarState['icon'] = base.icon && { ...base.icon, children: base.icon.children ?? <PersonRegular /> };

  // At 16px only one initial fits. The base derived both from `name`, so the truncation reruns
  // here against the same direction the base read: the rtl branch of getInitials swaps the pair,
  // which puts the leading initial last.
  const derived = slot.resolveShorthand(props.initials)?.children === undefined;
  const initials: AvatarState['initials'] =
    base.initials && size <= 16 && derived && typeof base.initials.children === 'string'
      ? { ...base.initials, children: firstInitial(base.initials.children, dir === 'rtl') }
      : base.initials;

  // `active` is a windmod look prop, so the accessible name it contributes has no other home:
  // the base always returns the element undefined, and the renderer already places it last inside
  // the root. A consumer-supplied name suppresses both branches, as it does in the base.
  let root = base.root;
  let activeAriaLabelElement = base.activeAriaLabelElement;

  if (props['aria-label'] === undefined && props['aria-labelledby'] === undefined && active !== 'unset') {
    const activeText = ACTIVE_STRINGS[active];

    if (root['aria-labelledby']) {
      const activeId = root.id + '__active';

      root = { ...root, 'aria-labelledby': root['aria-labelledby'] + ' ' + activeId };
      activeAriaLabelElement = (
        <span hidden id={activeId}>
          {activeText}
        </span>
      );
    } else if (root['aria-label']) {
      root = { ...root, 'aria-label': root['aria-label'] + ' ' + activeText };
    }
  }

  const color: AvatarState['color'] =
    propColor === 'colorful'
      ? AVATAR_COLORS[getHashCode(idForColor ?? props.name ?? '') % AVATAR_COLORS.length]
      : propColor;

  const state: AvatarState = {
    ...base,
    root,
    icon,
    initials,
    activeAriaLabelElement,
    active,
    activeAppearance,
    color,
    shape,
    size,
  };

  return renderAvatar(useAvatarStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<AvatarProps>;

Avatar.displayName = 'Avatar';
