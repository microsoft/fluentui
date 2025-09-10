import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAlphaSlider_unstable } from './useAlphaSlider';
import { renderAlphaSlider_unstable } from './renderAlphaSlider';
import { useAlphaSliderStyles_unstable } from './useAlphaSliderStyles.styles';
import type { AlphaSliderProps } from './AlphaSlider.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * AlphaSlider component
 */
export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = React.forwardRef((props, ref) => {
  const state = useAlphaSlider_unstable(props, ref);

  useAlphaSliderStyles_unstable(state);
  useCustomStyleHook_unstable('useAlphaSliderStyles_unstable')(state);

  return renderAlphaSlider_unstable(state);
});

AlphaSlider.displayName = 'AlphaSlider';
