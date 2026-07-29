'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { InteractionTagPrimaryProps } from './InteractionTagPrimary.types';
import { useInteractionTagPrimary } from './useInteractionTagPrimary';
import { useInteractionTagPrimaryContextValues } from './useInteractionTagPrimaryContextValues';
import { renderInteractionTagPrimary } from './renderInteractionTagPrimary';

/**
 * The primary, focusable action of an `InteractionTag`.
 */
export const InteractionTagPrimary: ForwardRefComponent<InteractionTagPrimaryProps> = React.forwardRef((props, ref) => {
  const state = useInteractionTagPrimary(props, ref);
  const contextValues = useInteractionTagPrimaryContextValues(state);
  return renderInteractionTagPrimary(state, contextValues);
});

InteractionTagPrimary.displayName = 'InteractionTagPrimary';
