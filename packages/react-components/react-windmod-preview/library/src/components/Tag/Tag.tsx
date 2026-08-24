'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTag, useTag, useTagContextValues } from '@fluentui/react-headless-components-preview/tag';
import { DismissRegular } from '@fluentui/react-icons/headless/svg/dismiss';

import type { AvatarShape, AvatarSize } from '../Avatar/Avatar.types';
import { useTagGroupContext } from '../TagGroup/TagGroupContext';
import type { TagProps, TagState } from './Tag.types';
import { useTagStyles } from './useTagStyles';

// The Avatar look a Tag imposes on its `media` slot, keyed by the Tag's own look props. Values are
// Griffel's `tagAvatarSizeMap`/`tagAvatarShapeMap` (react-tags/.../useTag.tsx:10-19) — the headless
// state omits both (they are design-only, so `TagBaseState` drops them), so windmod re-derives them.
const TAG_AVATAR_SIZE: Record<NonNullable<TagProps['size']>, AvatarSize> = {
  medium: 28,
  small: 20,
  'extra-small': 16,
};

const TAG_AVATAR_SHAPE: Record<NonNullable<TagProps['shape']>, AvatarShape> = {
  rounded: 'square',
  circular: 'circular',
};

/**
 * A Tag represents a keyword or phrase attached to a larger item. Windmod Tag: the headless tag
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Tag: ForwardRefComponent<TagProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-tags' styled useTag. A TagGroup publishes both, and Griffel
  // resolves them the same way — `appearance = contextAppearance ?? 'filled'`, `size = contextSize`
  // against a context whose own default is `medium` (react-tags/.../useTag.tsx:119-121,
  // contexts/tagGroupContext.tsx:8-13). `shape` is not published by either library's TagGroup.
  const { appearance: contextAppearance, size: contextSize } = useTagGroupContext();
  const {
    appearance = contextAppearance ?? 'filled',
    shape = 'rounded',
    size = contextSize ?? 'medium',
    ...rest
  } = props;

  const base = useTag(rest, ref);

  // The headless dismissIcon slot ships no glyph of its own, and the renderer draws it on every
  // dismissible Tag, so an unrestored slot is a correctly-padded empty hole. The slot only exists
  // when the hook decided to build it, so the restoration has to run on the resolved state:
  // materialising it earlier would give a non-dismissible Tag a dismissIcon and silently drop the
  // root's trailing padding. Consumer children always win; `dismissIcon={null}` still removes the slot.
  const dismissIcon: TagState['dismissIcon'] = base.dismissIcon && {
    ...base.dismissIcon,
    children: base.dismissIcon.children ?? <DismissRegular />,
  };

  // `useTagContextValues` is Griffel's own `useTagAvatarContextValues_unstable`, which reads
  // `avatarShape`/`avatarSize` off the state it is handed. The headless state carries neither, so
  // without this derivation the Tag would publish `{ avatar: { size: undefined, shape: undefined } }`
  // and a nested Avatar would fall back to its own 32/circular defaults instead of the Tag's look.
  const state: TagState = {
    ...base,
    dismissIcon,
    appearance,
    avatarShape: TAG_AVATAR_SHAPE[shape],
    avatarSize: TAG_AVATAR_SIZE[size],
    shape,
    size,
  };

  return renderTag(useTagStyles(state), useTagContextValues(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<TagProps>;

Tag.displayName = 'Tag';
