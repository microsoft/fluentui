'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useRangeSlider_unstable } from './useRangeSlider';
import { renderRangeSlider_unstable } from './renderRangeSlider';
import { useRangeSliderStyles_unstable } from './useRangeSliderStyles.styles';
import type { RangeSliderProps } from './RangeSlider.types';

/**
 * RangeSlider lets users select a range, between a start and an end value, by dragging two thumbs along a rail.
 */
export const RangeSlider: ForwardRefComponent<RangeSliderProps> = React.forwardRef((props, ref) => {
  const state = useRangeSlider_unstable(props, ref);

  useRangeSliderStyles_unstable(state);

  return renderRangeSlider_unstable(state);
});

RangeSlider.displayName = 'RangeSlider';
