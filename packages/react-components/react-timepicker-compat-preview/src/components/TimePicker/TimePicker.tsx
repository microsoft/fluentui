import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTimePicker_unstable } from './useTimePicker';
import { renderTimePicker_unstable } from './renderTimePicker';
import { useTimePickerStyles_unstable } from './useTimePickerStyles.styles';
import type { TimePickerProps } from './TimePicker.types';

/**
 * TimePicker component - TODO: add more docs
 */
export const TimePicker: ForwardRefComponent<TimePickerProps> = React.forwardRef((props, ref) => {
  const state = useTimePicker_unstable(props, ref);

  useTimePickerStyles_unstable(state);
  return renderTimePicker_unstable(state);
});

TimePicker.displayName = 'TimePicker';
