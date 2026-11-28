'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { composeComponent } from '../../../utils/composeComponent';
import type { CarouselAutoplayButtonProps } from './CarouselAutoplayButton.types';
import { renderCarouselAutoplayButton } from './renderCarouselAutoplayButton';
import { useCarouselAutoplayButton } from './useCarouselAutoplayButton';

/**
 * Play/Pause action for user-started autoplay. Never starts rotation by itself; unavailable with reduced motion.
 */
export const CarouselAutoplayButton: ForwardRefComponent<CarouselAutoplayButtonProps> = /*#__PURE__*/ composeComponent(
  'CarouselAutoplayButton',
  useCarouselAutoplayButton,
  renderCarouselAutoplayButton,
);
