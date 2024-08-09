import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useColorSlider_unstable } from './useColorSlider';
import { renderColorSlider_unstable } from './renderColorSlider';
import { useColorSliderStyles_unstable } from './useColorSliderStyles.styles';
import type { ColorSliderProps } from './ColorSlider.types';

/**
 * ColorSlider component - TODO: add more docs
 */
export const ColorSlider: ForwardRefComponent<ColorSliderProps> = React.forwardRef((props, ref) => {
  const state = useColorSlider_unstable(props, ref);

  useColorSliderStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useColorSliderStyles_unstable')(state);
  return renderColorSlider_unstable(state);
});

ColorSlider.displayName = 'ColorSlider';
