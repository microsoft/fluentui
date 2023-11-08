import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTimePicker_unstable } from './useTimePicker';
import { useTimePickerStyles_unstable } from './useTimePickerStyles.styles';
import type { TimePickerProps } from './TimePicker.types';
import { renderCombobox_unstable, useComboboxContextValues } from '@fluentui/react-combobox';

/**
 * TimePicker component - TODO: add more docs
 */
export const TimePicker: ForwardRefComponent<TimePickerProps> = React.forwardRef((props, ref) => {
  const state = useTimePicker_unstable(props, ref);

  const contextValues = useComboboxContextValues(state);

  useTimePickerStyles_unstable(state);
  // TODO customStyles hook

  return renderCombobox_unstable(state, contextValues);
});

TimePicker.displayName = 'TimePicker';
