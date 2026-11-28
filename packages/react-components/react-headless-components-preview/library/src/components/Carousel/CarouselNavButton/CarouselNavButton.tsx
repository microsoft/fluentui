'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../../utils/composeComponent';
import type { CarouselNavButtonProps } from './CarouselNavButton.types';
import { renderCarouselNavButton } from './renderCarouselNavButton';
import { useCarouselNavButton } from './useCarouselNavButton';

/** A dot that selects one group. Labeled with the group position, like "Page 1 of 3". */
export const CarouselNavButton: ForwardRefComponent<CarouselNavButtonProps> = /*#__PURE__*/ composeComponent(
  'CarouselNavButton',
  useCarouselNavButton,
  renderCarouselNavButton,
);
