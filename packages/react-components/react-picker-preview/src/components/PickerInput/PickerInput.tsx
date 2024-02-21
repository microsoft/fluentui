import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { usePickerInput_unstable } from './usePickerInput';
import { renderPickerInput_unstable } from './renderPickerInput';
import { usePickerInputStyles_unstable } from './usePickerInputStyles.styles';
import type { PickerInputProps } from './PickerInput.types';

/**
 * PickerInput component - TODO: add more docs
 */
export const PickerInput: ForwardRefComponent<PickerInputProps> = React.forwardRef((props, ref) => {
  const state = usePickerInput_unstable(props, ref);

  usePickerInputStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('usePickerInputStyles_unstable')(state);
  return renderPickerInput_unstable(state);
});

PickerInput.displayName = 'PickerInput';
