'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../utils/composeComponent';
import type { CarouselProps } from './Carousel.types';
import { renderCarousel } from './renderCarousel';
import { useCarousel } from './useCarousel';
import { useCarouselContextValues } from './useCarouselContextValues';

/**
 * A named collection of peer slides shown in fixed groups.
 *
 * Compose it from `CarouselAutoplayButton`, `CarouselPrevious`, `CarouselViewport` with `CarouselCard` children,
 * `CarouselNext` and `CarouselNav`. Rendering a part enables it.
 */
export const Carousel: ForwardRefComponent<CarouselProps> = /*#__PURE__*/ composeComponent(
  'Carousel',
  useCarousel,
  useCarouselContextValues,
  renderCarousel,
);
