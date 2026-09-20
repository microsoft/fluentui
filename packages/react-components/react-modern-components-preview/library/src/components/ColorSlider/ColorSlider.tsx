'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorSliderProps } from './ColorSlider.types';
import { renderColorSlider } from './renderColorSlider';
import { useColorSlider } from './useColorSlider';
import { useColorSliderStyles } from './useColorSliderStyles.styles';

export const ColorSlider: ForwardRefComponent<ColorSliderProps> = React.forwardRef((props, ref) => {
  const state = useColorSlider(props, ref);
  useColorSliderStyles(state);
  return renderColorSlider(state);
});

ColorSlider.displayName = 'ColorSlider';
