'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AlphaSliderProps } from './AlphaSlider.types';
import { useAlphaSlider } from './useAlphaSlider';
import { renderAlphaSlider } from './renderAlphaSlider';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A headless slider for selecting color opacity or transparency.
 */
export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = /*#__PURE__*/ composeComponent(
  'AlphaSlider',
  useAlphaSlider,
  renderAlphaSlider,
);
