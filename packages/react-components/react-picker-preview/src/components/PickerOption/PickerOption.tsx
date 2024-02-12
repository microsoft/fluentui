import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { usePickerOption_unstable } from './usePickerOption';
import { renderPickerOption_unstable } from './renderPickerOption';
import { usePickerOptionStyles_unstable } from './usePickerOptionStyles.styles';
import type { PickerOptionProps } from './PickerOption.types';

/**
 * PickerOption component - TODO: add more docs
 */
export const PickerOption: ForwardRefComponent<PickerOptionProps> = React.forwardRef((props, ref) => {
  const state = usePickerOption_unstable(props, ref);

  usePickerOptionStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('usePickerOptionStyles_unstable')(state);
  return renderPickerOption_unstable(state);
});

PickerOption.displayName = 'PickerOption';
