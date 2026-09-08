'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ColorSliderProps } from './ColorSlider.types';
import { useColorSlider } from './useColorSlider';
import { renderColorSlider } from './renderColorSlider';

/**
 * A headless slider for selecting a hue, saturation, or value color channel.
 */
export const ColorSlider: ForwardRefComponent<ColorSliderProps> = React.forwardRef((props, ref) => {
  const state = useColorSlider(props, ref);

  return renderColorSlider(state);
});

ColorSlider.displayName = 'ColorSlider';
