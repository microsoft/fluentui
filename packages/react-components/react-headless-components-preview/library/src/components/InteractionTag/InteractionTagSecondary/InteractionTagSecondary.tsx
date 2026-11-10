'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { InteractionTagSecondaryProps } from './InteractionTagSecondary.types';
import { useInteractionTagSecondary } from './useInteractionTagSecondary';
import { renderInteractionTagSecondary } from './renderInteractionTagSecondary';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * The dismiss / secondary action of an `InteractionTag`. Renders a button with
 * `Delete`/`Backspace` keyboard handling that calls the parent group's dismiss
 * handler. Does not render an icon by default - supply one via `children`.
 */
export const InteractionTagSecondary: ForwardRefComponent<InteractionTagSecondaryProps> =
  /*#__PURE__*/ composeComponent('InteractionTagSecondary', useInteractionTagSecondary, renderInteractionTagSecondary);
