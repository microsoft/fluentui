'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useInteractionTagContextValues } from '@fluentui/react-headless-components-preview/interaction-tag';
import type { InteractionTagProps } from './InteractionTag.types';
import { renderInteractionTag } from './renderInteractionTag';
import { useInteractionTag } from './useInteractionTag';
import { useInteractionTagStyles } from './useInteractionTagStyles.styles';

export const InteractionTag: ForwardRefComponent<InteractionTagProps> = React.forwardRef((props, ref) => {
  const state = useInteractionTag(props, ref);
  const contextValues = useInteractionTagContextValues(state);
  useInteractionTagStyles(state);
  return renderInteractionTag(state, contextValues);
});

InteractionTag.displayName = 'InteractionTag';
