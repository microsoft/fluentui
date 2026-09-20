'use client';

import type * as React from 'react';
import { useInteractionTagPrimary as useInteractionTagPrimaryBase } from '@fluentui/react-headless-components-preview/interaction-tag';
import { useInteractionTagVisualContext } from '../../Tag/tagVisualContext';
import type { InteractionTagPrimaryProps, InteractionTagPrimaryState } from './InteractionTagPrimary.types';

const avatarSizeMap = { medium: 28, small: 20, 'extra-small': 16 } as const;

export const useInteractionTagPrimary = (
  props: InteractionTagPrimaryProps,
  ref: React.Ref<HTMLButtonElement>,
): InteractionTagPrimaryState => {
  const { appearance = 'filled', shape = 'rounded', size = 'medium' } = useInteractionTagVisualContext();
  const state = useInteractionTagPrimaryBase(props, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-has-media': state.media || state.icon ? '' : undefined,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    avatarShape: shape === 'circular' ? 'circular' : 'square',
    avatarSize: avatarSizeMap[size],
    shape,
    size,
  };
};
