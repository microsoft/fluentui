import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { usePickerControl_unstable } from './usePickerControl';
import { renderPickerControl_unstable } from './renderPickerControl';
import { usePickerControlStyles_unstable } from './usePickerControlStyles.styles';
import type { PickerControlProps } from './PickerControl.types';
import { usePickerControlContextValues } from './usePickerControlContextValues';

/**
 * PickerControl component - TODO: add more docs
 */
export const PickerControl: ForwardRefComponent<PickerControlProps> = React.forwardRef((props, ref) => {
  const state = usePickerControl_unstable(props, ref);

  usePickerControlStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  useCustomStyleHook_unstable('usePickerControlStyles_unstable')(state);
  return renderPickerControl_unstable(state, usePickerControlContextValues(state));
});

PickerControl.displayName = 'PickerControl';
