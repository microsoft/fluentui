import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useRadioPicker_unstable } from './useRadioPicker';
import { renderRadioPicker_unstable } from './renderRadioPicker';
import { useRadioPickerStyles_unstable } from './useRadioPickerStyles.styles';
import type { RadioPickerProps } from './RadioPicker.types';

/**
 * RadioPicker component - TODO: add more docs
 */
export const RadioPicker: ForwardRefComponent<RadioPickerProps> = React.forwardRef((props, ref) => {
  const state = useRadioPicker_unstable(props, ref);

  useRadioPickerStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('useRadioPickerStyles_unstable')(state);
  return renderRadioPicker_unstable(state);
});

RadioPicker.displayName = 'RadioPicker';
