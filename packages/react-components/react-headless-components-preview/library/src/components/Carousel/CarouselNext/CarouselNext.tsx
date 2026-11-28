'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../../utils/composeComponent';
import type { CarouselNextProps } from './CarouselNext.types';
import { renderCarouselNext } from './renderCarouselNext';
import { useCarouselNext } from './useCarouselNext';

/** Moves to the next group. Hidden at the last group unless `Carousel` is circular. */
export const CarouselNext: ForwardRefComponent<CarouselNextProps> = /*#__PURE__*/ composeComponent(
  'CarouselNext',
  useCarouselNext,
  renderCarouselNext,
);
