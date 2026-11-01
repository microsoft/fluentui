'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CardProps } from './Card.types';
import { useCard, useCardContextValue } from './useCard';
import { renderCard } from './renderCard';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A card provides scaffolding for hosting actions and content for a single topic.
 */
export const Card: ForwardRefComponent<CardProps> = /*#__PURE__*/ composeComponent(
  'Card',
  useCard,
  renderCard,
  useCardContextValue,
);
