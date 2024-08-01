import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useAlphaSlider_unstable } from './useAlphaSlider';
import { renderAlphaSlider_unstable } from './renderAlphaSlider';
import { useAlphaSliderStyles_unstable } from './useAlphaSliderStyles.styles';
import type { AlphaSliderProps } from './AlphaSlider.types';

/**
 * AlphaSlider component - TODO: add more docs
 */
export const AlphaSlider: ForwardRefComponent<AlphaSliderProps> = React.forwardRef((props, ref) => {
  const state = useAlphaSlider_unstable(props, ref);

  useAlphaSliderStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useAlphaSliderStyles_unstable')(state);
  return renderAlphaSlider_unstable(state);
});

AlphaSlider.displayName = 'AlphaSlider';
