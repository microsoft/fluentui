'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useInteractionTagPrimaryContextValues } from '@fluentui/react-headless-components-preview/interaction-tag';
import type { InteractionTagPrimaryProps } from './InteractionTagPrimary.types';
import { renderInteractionTagPrimary } from './renderInteractionTagPrimary';
import { useInteractionTagPrimary } from './useInteractionTagPrimary';
import { useInteractionTagPrimaryStyles } from './useInteractionTagPrimaryStyles.styles';

export const InteractionTagPrimary: ForwardRefComponent<InteractionTagPrimaryProps> = React.forwardRef((props, ref) => {
  const state = useInteractionTagPrimary(props, ref);
  const contextValues = useInteractionTagPrimaryContextValues(state);
  useInteractionTagPrimaryStyles(state);
  return renderInteractionTagPrimary(state, contextValues);
});

InteractionTagPrimary.displayName = 'InteractionTagPrimary';
