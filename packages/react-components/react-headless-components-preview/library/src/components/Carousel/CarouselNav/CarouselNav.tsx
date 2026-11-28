'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../../utils/composeComponent';
import type { CarouselNavProps } from './CarouselNav.types';
import { renderCarouselNav } from './renderCarouselNav';
import { useCarouselNav } from './useCarouselNav';

/**
 * One tab per group, with roving tabindex. Left/Right (mirrored in RTL), Home and End move focus and
 * activate the destination group. Its children are a render function or a template, rendered once per group.
 */
export const CarouselNav: ForwardRefComponent<CarouselNavProps> = /*#__PURE__*/ composeComponent(
  'CarouselNav',
  useCarouselNav,
  renderCarouselNav,
);
