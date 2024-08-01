import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useHueSlider_unstable } from './useHueSlider';
import { renderHueSlider_unstable } from './renderHueSlider';
import { useHueSliderStyles_unstable } from './useHueSliderStyles.styles';
import type { HueSliderProps } from './HueSlider.types';

/**
 * HueSlider component - TODO: add more docs
 */
export const HueSlider: ForwardRefComponent<HueSliderProps> = React.forwardRef((props, ref) => {
  const state = useHueSlider_unstable(props, ref);

  useHueSliderStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useHueSliderStyles_unstable')(state);
  return renderHueSlider_unstable(state);
});

HueSlider.displayName = 'HueSlider';
