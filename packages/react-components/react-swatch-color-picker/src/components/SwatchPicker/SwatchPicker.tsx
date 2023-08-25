import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useSwatchPicker_unstable } from './useSwatchPicker';
import { renderSwatchPicker_unstable } from './renderSwatchPicker';
import { useSwatchPickerStyles_unstable } from './useSwatchPickerStyles.styles';
import type { SwatchPickerProps } from './SwatchPicker.types';
import { useSwatchPickerContextValues_unstable } from './useSwatchPickerContextValue';

/**
 * SwatchPicker component - TODO: add more docs
 */
export const SwatchPicker: ForwardRefComponent<SwatchPickerProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPicker_unstable(props, ref);
  const contextValues = useSwatchPickerContextValues_unstable(state);

  useSwatchPickerStyles_unstable(state);
  return renderSwatchPicker_unstable(state, contextValues);
});

SwatchPicker.displayName = 'SwatchPicker';
