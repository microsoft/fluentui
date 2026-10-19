'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { InteractionTagProps } from './InteractionTag.types';
import { useInteractionTag } from './useInteractionTag';
import { useInteractionTagContextValues } from './useInteractionTagContextValues';
import { renderInteractionTag } from './renderInteractionTag';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A visual representation of an attribute that can have primary and/or secondary actions.
 * Composed with `InteractionTagPrimary` and optionally `InteractionTagSecondary` children.
 */
export const InteractionTag: ForwardRefComponent<InteractionTagProps> = /*#__PURE__*/ composeComponent(
  'InteractionTag',
  useInteractionTag,
  renderInteractionTag,
  useInteractionTagContextValues,
);
