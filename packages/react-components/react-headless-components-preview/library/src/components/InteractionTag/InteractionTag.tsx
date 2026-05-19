'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { InteractionTagProps } from './InteractionTag.types';
import { useInteractionTag, useInteractionTagContextValues } from './useInteractionTag';
import { renderInteractionTag } from './renderInteractionTag';

/**
 * A visual representation of an attribute that can have primary and/or secondary actions.
 * Composed with `InteractionTagPrimary` and optionally `InteractionTagSecondary` children.
 */
export const InteractionTag: ForwardRefComponent<InteractionTagProps> = React.forwardRef((props, ref) => {
  const state = useInteractionTag(props, ref);
  const contextValues = useInteractionTagContextValues(state);
  return renderInteractionTag(state, contextValues);
});

InteractionTag.displayName = 'InteractionTag';
