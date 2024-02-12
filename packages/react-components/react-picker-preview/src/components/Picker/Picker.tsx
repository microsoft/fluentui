import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { usePicker_unstable } from './usePicker';
import { renderPicker_unstable } from './renderPicker';
import type { PickerProps } from './Picker.types';
import { usePickerContextValues } from './usePickerContextValues';

/**
 * Picker component - TODO: add more docs
 */
export const Picker: ForwardRefComponent<PickerProps> = React.forwardRef((props, ref) => {
  const state = usePicker_unstable(props, ref);

  return renderPicker_unstable(state, usePickerContextValues(state));
});

Picker.displayName = 'Picker';
