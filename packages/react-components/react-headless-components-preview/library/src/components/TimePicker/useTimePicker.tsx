'use client';

import * as React from 'react';
import {
  useTimePickerComboboxState_unstable,
  useTimePickerSelection_unstable,
} from '@fluentui/react-timepicker-preview';
import type { ComboboxProps } from '../Combobox/Combobox.types';
import { useCombobox } from '../Combobox/useCombobox';
import { Option } from '../Dropdown/Option';
import { toDataAttributeValue } from '../../utils';
import type { TimePickerProps, TimePickerState } from './TimePicker.types';

/**
 * Returns the state for a TimePicker component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTimePicker`.
 */
export const useTimePicker = (props: TimePickerProps, ref: React.Ref<HTMLInputElement>): TimePickerState => {
  const selection = useTimePickerSelection_unstable<ComboboxProps>(props);

  const comboboxProps: ComboboxProps = {
    ...selection.comboboxProps,
    children: selection.options.map(option => (
      <Option key={option.key} value={option.key}>
        {option.text}
      </Option>
    )),
  };
  const comboboxState = useCombobox(comboboxProps, ref);

  const state = useTimePickerComboboxState_unstable(comboboxState, selection);

  return {
    ...state,
    root: {
      ...state.root,
      'data-freeform': toDataAttributeValue(state.freeform),
    },
  };
};
