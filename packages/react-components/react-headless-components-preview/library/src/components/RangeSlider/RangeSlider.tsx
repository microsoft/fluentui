'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { RangeSliderProps } from './RangeSlider.types';
import { useRangeSlider } from './useRangeSlider';
import { renderRangeSlider } from './renderRangeSlider';

/**
 * A range slider for selecting a start and an end value with two thumbs on one rail.
 * Give each thumb its own accessible name through the `startInput` and `endInput` slots.
 */
export const RangeSlider: ForwardRefComponent<RangeSliderProps> = React.forwardRef((props, ref) => {
  const state = useRangeSlider(props, ref);

  return renderRangeSlider(state);
});

RangeSlider.displayName = 'RangeSlider';
