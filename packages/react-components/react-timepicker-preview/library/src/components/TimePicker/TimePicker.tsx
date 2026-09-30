'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTimePicker_unstable } from './useTimePicker';
import { useTimePickerContextValues_unstable } from './useTimePickerContextValues';
import { useTimePickerStyles_unstable } from './useTimePickerStyles.styles';
import { renderTimePicker_unstable } from './renderTimePicker';
import type { TimePickerProps } from './TimePicker.types';

/**
 * TimePicker lets a user pick a time of day from a list of options, or type a custom time in freeform mode.
 */
export const TimePicker: ForwardRefComponent<TimePickerProps> = React.forwardRef((props, ref) => {
  const state = useTimePicker_unstable(props, ref);

  const contextValues = useTimePickerContextValues_unstable(state);

  useTimePickerStyles_unstable(state);

  return renderTimePicker_unstable(state, contextValues);
});

TimePicker.displayName = 'TimePicker';
