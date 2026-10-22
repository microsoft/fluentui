'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RangeSliderProps } from './RangeSlider.types';
import { useRangeSlider } from './useRangeSlider';
import { renderRangeSlider } from './renderRangeSlider';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A range slider for selecting a start and an end value with two thumbs on one rail.
 * Give each thumb its own accessible name through the `startInput` and `endInput` slots.
 */
export const RangeSlider: ForwardRefComponent<RangeSliderProps> = /*#__PURE__*/ composeComponent(
  'RangeSlider',
  useRangeSlider,
  renderRangeSlider,
);
