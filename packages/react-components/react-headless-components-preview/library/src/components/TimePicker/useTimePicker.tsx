'use client';

import * as React from 'react';
import type { ComboboxProps } from '../Combobox/Combobox.types';
import { useCombobox } from '../Combobox/useCombobox';
import { Option } from '../Dropdown/Option';
import { toDataAttributeValue } from '../../utils';
import type { TimePickerProps, TimePickerState } from './TimePicker.types';
import { useTimePickerComboboxState } from './useTimePickerComboboxState';
import { useTimePickerSelection } from './useTimePickerSelection';

/**
 * Returns the state for a TimePicker component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTimePicker`.
 */
export const useTimePicker = (props: TimePickerProps, ref: React.Ref<HTMLInputElement>): TimePickerState => {
  const selection = useTimePickerSelection(props);

  const children = React.useMemo(
    () =>
      selection.options.map(option => (
        <Option key={option.key} value={option.key}>
          {option.text}
        </Option>
      )),
    [selection.options],
  );
  const comboboxProps: ComboboxProps = { ...selection.comboboxProps, children };

  const comboboxState = useCombobox(comboboxProps, ref);
  const state = useTimePickerComboboxState(comboboxState, selection);

  return {
    ...state,
    root: {
      ...state.root,
      'data-freeform': toDataAttributeValue(state.freeform),
    },
  };
};
