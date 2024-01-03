import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useRadioPicker_unstable } from './useRadioPicker';
import { renderRadioPicker_unstable } from './renderRadioPicker';
import { useRadioPickerStyles_unstable } from './useRadioPickerStyles.styles';
import type { RadioPickerProps } from './RadioPicker.types';
import { useRadioPickerContextValues } from './useRadioPickerContextValues';

/**
 * RadioPicker component - TODO: add more docs
 */
export const RadioPicker: ForwardRefComponent<RadioPickerProps> = React.forwardRef((props, ref) => {
  const state = useRadioPicker_unstable(props, ref);
  const contextValues = useRadioPickerContextValues(state);

  useRadioPickerStyles_unstable(state);
  useCustomStyleHook_unstable('useRadioPickerStyles_unstable')(state);

  return renderRadioPicker_unstable(state, contextValues);
});

RadioPicker.displayName = 'RadioPicker';
