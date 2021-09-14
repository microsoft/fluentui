import * as React from 'react';
import { useRangedSlider } from './useRangedSlider';
import { renderRangedSlider } from './renderRangedSlider';
import { useRangedSliderStyles } from './useRangedSliderStyles';
import type { RangedSliderProps } from './RangedSlider.types';

/**
 * Define a styled RangedSlider, using the `useRangedSlider` hook
 */
export const RangedSlider: React.ForwardRefExoticComponent<RangedSliderProps> = React.forwardRef((props, ref) => {
  const state = useRangedSlider(props, ref);

  useRangedSliderStyles(state);

  return renderRangedSlider(state);
});
RangedSlider.displayName = 'RangedSlider';
