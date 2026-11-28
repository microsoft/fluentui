'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../../utils/composeComponent';
import type { CarouselPreviousProps } from './CarouselPrevious.types';
import { renderCarouselPrevious } from './renderCarouselPrevious';
import { useCarouselPrevious } from './useCarouselPrevious';

/** Moves to the previous group. Hidden at the first group unless `Carousel` is circular. */
export const CarouselPrevious: ForwardRefComponent<CarouselPreviousProps> = /*#__PURE__*/ composeComponent(
  'CarouselPrevious',
  useCarouselPrevious,
  renderCarouselPrevious,
);
