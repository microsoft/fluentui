'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { AlphaSliderProps } from './AlphaSlider.types';
import { renderAlphaSlider } from './renderAlphaSlider';
import { useAlphaSlider } from './useAlphaSlider';
import { useAlphaSliderStyles } from './useAlphaSliderStyles.styles';

export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = React.forwardRef((props, ref) => {
  const state = useAlphaSlider(props, ref);
  useAlphaSliderStyles(state);
  return renderAlphaSlider(state);
});

AlphaSlider.displayName = 'AlphaSlider';
