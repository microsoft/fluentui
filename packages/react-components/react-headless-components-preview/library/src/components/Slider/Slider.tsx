'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SliderProps } from './Slider.types';
import { useSlider } from './useSlider';
import { renderSlider } from './renderSlider';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A slider component for selecting a value in a range.
 */
export const Slider: ForwardRefComponent<SliderProps> = /*#__PURE__*/ composeComponent(
  'Slider',
  useSlider,
  renderSlider,
);
