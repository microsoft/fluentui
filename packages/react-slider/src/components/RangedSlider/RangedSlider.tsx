import * as React from 'react';
import { renderRangedSlider } from './renderRangedSlider';
import { useRangedSlider } from './useRangedSlider';
import { useRangedSliderStyles } from './useRangedSliderStyles';
import type { RangedSliderProps } from './RangedSlider.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * The RangedSlider component allows users to quickly select a range by dragging a lower or upper thumb across a rail.
 */
export const RangedSlider: ForwardRefComponent<RangedSliderProps> = React.forwardRef((props, ref) => {
  const state = useRangedSlider(props, ref);

  useRangedSliderStyles(state);

  return renderRangedSlider(state);
});
RangedSlider.displayName = 'RangedSlider';
