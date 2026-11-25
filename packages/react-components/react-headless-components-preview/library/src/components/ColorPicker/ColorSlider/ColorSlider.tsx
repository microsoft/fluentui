'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorSliderProps } from './ColorSlider.types';
import { useColorSlider } from './useColorSlider';
import { renderColorSlider } from './renderColorSlider';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A headless slider for selecting a hue, saturation, or value color channel.
 */
export const ColorSlider: ForwardRefComponent<ColorSliderProps> = /*#__PURE__*/ composeComponent(
  'ColorSlider',
  useColorSlider,
  renderColorSlider,
);
