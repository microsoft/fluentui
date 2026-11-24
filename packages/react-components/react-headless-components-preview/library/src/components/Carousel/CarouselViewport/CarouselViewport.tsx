'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../../utils/composeComponent';
import type { CarouselViewportProps } from './CarouselViewport.types';
import { renderCarouselViewport } from './renderCarouselViewport';
import { useCarouselViewport } from './useCarouselViewport';

/**
 * Shows the selected group and hides the rest. Each direct child is one slide; wrap content in `CarouselCard`.
 * Inactive groups are `hidden`, `inert` and `aria-hidden`.
 */
export const CarouselViewport: ForwardRefComponent<CarouselViewportProps> = /*#__PURE__*/ composeComponent(
  'CarouselViewport',
  useCarouselViewport,
  renderCarouselViewport,
);
