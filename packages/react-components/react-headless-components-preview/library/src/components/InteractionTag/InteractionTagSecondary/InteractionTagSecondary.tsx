'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { InteractionTagSecondaryProps } from './InteractionTagSecondary.types';
import { useInteractionTagSecondary } from './useInteractionTagSecondary';
import { renderInteractionTagSecondary } from './renderInteractionTagSecondary';

/**
 * The dismiss / secondary action of an `InteractionTag`. Renders a button with
 * `Delete`/`Backspace` keyboard handling that calls the parent group's dismiss
 * handler. Does not render an icon by default - supply one via `children`.
 */
export const InteractionTagSecondary: ForwardRefComponent<InteractionTagSecondaryProps> = React.forwardRef(
  (props, ref) => {
    const state = useInteractionTagSecondary(props, ref);
    return renderInteractionTagSecondary(state);
  },
);

InteractionTagSecondary.displayName = 'InteractionTagSecondary';
