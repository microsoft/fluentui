import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorSlider_unstable } from './useColorSlider';
import { renderColorSlider_unstable } from './renderColorSlider';
import { useColorSliderStyles_unstable } from './useColorSliderStyles.styles';
import type { ColorSliderProps } from './ColorSlider.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * ColorSlider component
 */
export const ColorSlider: ForwardRefComponent<ColorSliderProps> = React.forwardRef((props, ref) => {
  const state = useColorSlider_unstable(props, ref);

  useColorSliderStyles_unstable(state);
  useCustomStyleHook_unstable('useColorSliderStyles_unstable')(state);

  return renderColorSlider_unstable(state);
});

ColorSlider.displayName = 'ColorSlider';
