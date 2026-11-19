'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
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

  // Not memoized: the Combobox activates the first option again only when `children` change, which typing relies on.
  const comboboxProps: ComboboxProps = {
    ...selection.comboboxProps,
    children: selection.options.map(option => (
      <Option key={option.key} value={option.key}>
        {option.text}
      </Option>
    )),
  };

  const comboboxState = useCombobox(comboboxProps, ref);
  // The consumer's own key handler, still called for the keys the TimePicker handles instead of the Combobox.
  const onUserKeyDown = slot.resolveShorthand(props.input)?.onKeyDown ?? props.onKeyDown;
  const state = useTimePickerComboboxState(comboboxState, selection, onUserKeyDown);

  return {
    ...state,
    root: {
      ...state.root,
      'data-freeform': toDataAttributeValue(state.freeform),
    },
  };
};
