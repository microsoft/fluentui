import * as React from 'react';
import { renderRangedSlider } from './renderRangedSlider';
import { useRangedSlider } from './useRangedSlider';
import { useRangedSliderStyles } from './useRangedSliderStyles';
import type { RangedSliderProps } from './RangedSlider.types';

/**
 * Define a styled RangedSlider, using the `useRangedSlider` hook
 */
export const RangedSlider = React.forwardRef<HTMLDivElement, RangedSliderProps>((props, ref) => {
  const state = useRangedSlider(props, ref);

  useRangedSliderStyles(state);

  return renderRangedSlider(state);
});
RangedSlider.displayName = 'RangedSlider';
