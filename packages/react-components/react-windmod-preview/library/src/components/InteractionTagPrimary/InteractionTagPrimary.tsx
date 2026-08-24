'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderInteractionTagPrimary,
  useInteractionTagPrimary,
  useInteractionTagPrimaryContextValues,
} from '@fluentui/react-headless-components-preview/interaction-tag';

import type { AvatarShape, AvatarSize } from '../Avatar/Avatar.types';
import { useInteractionTagContext } from '../InteractionTag/InteractionTagContext';
import type { InteractionTagPrimaryProps, InteractionTagPrimaryState } from './InteractionTagPrimary.types';
import { useInteractionTagPrimaryStyles } from './useInteractionTagPrimaryStyles';

// The Avatar look an InteractionTag imposes on the primary's `media` slot, keyed by the tag's look.
// Values are Griffel's `avatarSizeMap`/`avatarShapeMap` (react-tags/.../useInteractionTagPrimary.ts:13-22);
// the headless state omits both, so windmod re-derives them. Same maps as Tag.tsx.
const AVATAR_SIZE: Record<NonNullable<InteractionTagPrimaryState['size']>, AvatarSize> = {
  medium: 28,
  small: 20,
  'extra-small': 16,
};

const AVATAR_SHAPE: Record<NonNullable<InteractionTagPrimaryState['shape']>, AvatarShape> = {
  rounded: 'square',
  circular: 'circular',
};

/**
 * The primary, focusable action of an InteractionTag. Takes no look props: appearance, shape and
 * size come only from the tag, which is also how Griffel's counterpart behaves.
 */
export const InteractionTagPrimary: ForwardRefComponent<InteractionTagPrimaryProps> = React.forwardRef((props, ref) => {
  const { appearance = 'filled', shape = 'rounded', size = 'medium' } = useInteractionTagContext();

  const state: InteractionTagPrimaryState = {
    ...useInteractionTagPrimary(props, ref),
    appearance,
    avatarShape: AVATAR_SHAPE[shape],
    avatarSize: AVATAR_SIZE[size],
    shape,
    size,
  };

  return renderInteractionTagPrimary(
    useInteractionTagPrimaryStyles(state),
    useInteractionTagPrimaryContextValues(state),
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<InteractionTagPrimaryProps>;

InteractionTagPrimary.displayName = 'InteractionTagPrimary';
