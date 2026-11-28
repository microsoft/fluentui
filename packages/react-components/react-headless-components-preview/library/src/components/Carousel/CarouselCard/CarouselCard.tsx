'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../../utils/composeComponent';
import type { CarouselCardProps } from './CarouselCard.types';
import { renderCarouselCard } from './renderCarouselCard';
import { useCarouselCard } from './useCarouselCard';

/** One card inside `CarouselViewport`, labeled with its position, like "Slide 1 of 5". */
export const CarouselCard: ForwardRefComponent<CarouselCardProps> = /*#__PURE__*/ composeComponent(
  'CarouselCard',
  useCarouselCard,
  renderCarouselCard,
);
