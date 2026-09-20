'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { InteractionTagSecondaryProps } from './InteractionTagSecondary.types';
import { renderInteractionTagSecondary } from './renderInteractionTagSecondary';
import { useInteractionTagSecondary } from './useInteractionTagSecondary';
import { useInteractionTagSecondaryStyles } from './useInteractionTagSecondaryStyles.styles';

export const InteractionTagSecondary: ForwardRefComponent<InteractionTagSecondaryProps> = React.forwardRef(
  (props, ref) => {
    const state = useInteractionTagSecondary(props, ref);
    useInteractionTagSecondaryStyles(state);
    return renderInteractionTagSecondary(state);
  },
);

InteractionTagSecondary.displayName = 'InteractionTagSecondary';
