'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTimePicker } from './useTimePicker';
import { renderTimePicker } from './renderTimePicker';
import { useTimePickerContextValues } from './useTimePickerContextValues';
import type { TimePickerProps } from './TimePicker.types';

/**
 * A TimePicker lets a user pick a time of day from a list of options, or type a custom time in freeform mode.
 */
export const TimePicker: ForwardRefComponent<TimePickerProps> = React.forwardRef((props, ref) => {
  const state = useTimePicker(props, ref as React.Ref<HTMLInputElement>);
  const contextValues = useTimePickerContextValues(state);

  return renderTimePicker(state, contextValues);
});

TimePicker.displayName = 'TimePicker';
