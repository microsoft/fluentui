import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNativeSlider_unstable } from './useNativeSlider';
import { renderNativeSlider_unstable } from './renderNativeSlider';
import { useNativeSliderStyles_unstable } from './useNativeSliderStyles.styles';
import type { NativeSliderProps } from './NativeSlider.types';

/**
 * NativeSlider component - TODO: add more docs
 */
export const NativeSlider: ForwardRefComponent<NativeSliderProps> = React.forwardRef((props, ref) => {
  const state = useNativeSlider_unstable(props, ref);

  useNativeSliderStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNativeSliderStyles_unstable')(state);
  return renderNativeSlider_unstable(state);
});

NativeSlider.displayName = 'NativeSlider';
