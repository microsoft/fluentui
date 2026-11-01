'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { InteractionTagPrimaryProps } from './InteractionTagPrimary.types';
import { useInteractionTagPrimary } from './useInteractionTagPrimary';
import { useInteractionTagPrimaryContextValues } from './useInteractionTagPrimaryContextValues';
import { renderInteractionTagPrimary } from './renderInteractionTagPrimary';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * The primary, focusable action of an `InteractionTag`.
 */
export const InteractionTagPrimary: ForwardRefComponent<InteractionTagPrimaryProps> = /*#__PURE__*/ composeComponent(
  'InteractionTagPrimary',
  useInteractionTagPrimary,
  renderInteractionTagPrimary,
  useInteractionTagPrimaryContextValues,
);
