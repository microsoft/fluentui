import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { usePickerButton_unstable } from './usePickerButton';
import { renderPickerButton_unstable } from './renderPickerButton';
import { usePickerButtonStyles_unstable } from './usePickerButtonStyles.styles';
import type { PickerButtonProps } from './PickerButton.types';

/**
 * PickerButton component - TODO: add more docs
 */
export const PickerButton: ForwardRefComponent<PickerButtonProps> = React.forwardRef((props, ref) => {
  const state = usePickerButton_unstable(props, ref);

  usePickerButtonStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('usePickerButtonStyles_unstable')(state);
  return renderPickerButton_unstable(state);
});

PickerButton.displayName = 'PickerButton';
