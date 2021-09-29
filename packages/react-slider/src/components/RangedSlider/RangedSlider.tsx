import * as React from 'react';
import { renderRangedSlider } from './renderRangedSlider';
import { useRangedSlider } from './useRangedSlider';
import { useRangedSliderStyles } from './useRangedSliderStyles';
import type { RangedSliderProps } from './RangedSlider.types';

/**
 * The RangedSlider component allows users to quickly select a range by dragging a lower or upper thumb across a rail.
 */
export const RangedSlider = React.forwardRef<HTMLDivElement, RangedSliderProps>((props, ref) => {
  const state = useRangedSlider(props, ref);

  useRangedSliderStyles(state);

  return renderRangedSlider(state);
});
RangedSlider.displayName = 'RangedSlider';
