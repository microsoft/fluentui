'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderInteractionTag,
  useInteractionTag,
  useInteractionTagContextValues,
} from '@fluentui/react-headless-components-preview/interaction-tag';

import { mergeContextProps } from '../../utils/mergeContextProps';
import { useTagGroupContext } from '../TagGroup/TagGroupContext';
import type { InteractionTagProps, InteractionTagState } from './InteractionTag.types';
import { InteractionTagContextProvider } from './InteractionTagContext';
import { useInteractionTagStyles } from './useInteractionTagStyles';

/**
 * An InteractionTag is a Tag whose primary and secondary actions are separately focusable.
 * Windmod InteractionTag: the headless interaction tag decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const InteractionTag: ForwardRefComponent<InteractionTagProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them. Defaults
  // mirror @fluentui/react-tags' styled useInteractionTag, including its TagGroup fallbacks, whose
  // own context default is `medium`/`filled`. `shape` is published by neither library's TagGroup.
  const {
    appearance = 'filled',
    shape = 'rounded',
    size = 'medium',
    ...rest
  } = mergeContextProps(useTagGroupContext(), props);

  const styled: InteractionTagState = { ...useInteractionTag(rest, ref), appearance, shape, size };

  // Two contexts, two audiences. The Griffel values are built from the styled state so a Griffel
  // primary nested here receives the look too — the headless state omits all three, and Griffel's
  // shape ternary then falls to `circular` rather than to nothing. The windmod context is the
  // reader half the headless surface does not export; our own primary and secondary consume it.
  const look = React.useMemo(() => ({ appearance, shape, size }), [appearance, shape, size]);

  return (
    <InteractionTagContextProvider value={look}>
      {renderInteractionTag(useInteractionTagStyles(styled), useInteractionTagContextValues(styled))}
    </InteractionTagContextProvider>
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<InteractionTagProps>;

InteractionTag.displayName = 'InteractionTag';
