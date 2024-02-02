import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useSwatchPicker_unstable } from './useSwatchPicker';
import { renderSwatchPicker_unstable } from './renderSwatchPicker';
import { useSwatchPickerStyles_unstable } from './useSwatchPickerStyles.styles';
import type { SwatchPickerProps } from './SwatchPicker.types';
import { useSwatchPickerContextValues } from '../../contexts/swatchPicker';

/**
 * SwatchPicker component - TODO: add more docs
 */
export const SwatchPicker: ForwardRefComponent<SwatchPickerProps> = React.forwardRef((props, ref) => {
  const state = useSwatchPicker_unstable(props, ref);
  const contextValues = useSwatchPickerContextValues(state).swatchPicker;

  useSwatchPickerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md

  useCustomStyleHook_unstable('useSwatchPickerStyles_unstable')(state);
  // return renderSwatchPicker_unstable(state, {
  //   notifyPreview: state.notifyPreview,
  //   notifySelected: state.notifySelected,
  // });

  return renderSwatchPicker_unstable(state, contextValues);
});

SwatchPicker.displayName = 'SwatchPicker';
