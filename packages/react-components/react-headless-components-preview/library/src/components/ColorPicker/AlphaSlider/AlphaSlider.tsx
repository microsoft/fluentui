'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AlphaSliderProps } from './AlphaSlider.types';
import { useAlphaSlider } from './useAlphaSlider';
import { renderAlphaSlider } from './renderAlphaSlider';

/**
 * A headless slider for selecting color opacity or transparency.
 */
export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = React.forwardRef((props, ref) => {
  const state = useAlphaSlider(props, ref);

  return renderAlphaSlider(state);
});

AlphaSlider.displayName = 'AlphaSlider';
