'use client';

import type * as React from 'react';
import { useCardPreviewBase_unstable } from '@fluentui/react-card';

import type { CardPreviewProps, CardPreviewState } from './CardPreview.types';

/**
 * Returns the state for a CardPreview component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderCardPreview`.
 */
export const useCardPreview = (props: CardPreviewProps, ref: React.Ref<HTMLElement>): CardPreviewState => {
  const state: CardPreviewState = useCardPreviewBase_unstable(props, ref);

  return state;
};
