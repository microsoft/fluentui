'use client';

import * as React from 'react';
import { ChevronDownRegular as ChevronDownIcon, DismissRegular as DismissIcon } from '@fluentui/react-icons';
import { Option, useComboboxBase_unstable } from '@fluentui/react-combobox';
import type { BaseComboboxProps } from '@fluentui/react-combobox';
import { useFieldContext_unstable as useFieldContext } from '@fluentui/react-field';
import { useMergedTabsterAttributes_unstable, useTabsterAttributes } from '@fluentui/react-tabster';
import type { TabsterDOMAttribute } from '@fluentui/react-tabster';
import type { TimePickerBaseProps, TimePickerBaseState, TimePickerProps, TimePickerState } from './TimePicker.types';
import { useTimePickerSelection_unstable } from './useTimePickerSelection';
import { useTimePickerComboboxState_unstable } from './useTimePickerComboboxState';

/**
 * Create the base state required to render TimePicker, without design-only props, default icons or Tabster integration.
 *
 * @param props - props from this instance of TimePicker (without appearance and size)
 * @param ref - reference to the input element of TimePicker
 */
export const useTimePickerBase_unstable = (
  props: TimePickerBaseProps,
  ref: React.Ref<HTMLInputElement>,
): TimePickerBaseState => {
  const selection = useTimePickerSelection_unstable<BaseComboboxProps>(props);

  const comboboxProps: BaseComboboxProps = {
    ...selection.comboboxProps,
    children: selection.options.map(option => (
      <Option key={option.key} value={option.key}>
        {option.text}
      </Option>
    )),
  };
  const comboboxState = useComboboxBase_unstable(comboboxProps, ref);

  return useTimePickerComboboxState_unstable(comboboxState, selection);
};

/**
 * Create the state required to render TimePicker.
 *
 * The returned state can be modified with hooks such as useTimePickerStyles_unstable,
 * before being passed to renderTimePicker_unstable.
 *
 * @param props - props from this instance of TimePicker
 * @param ref - reference to the input element of TimePicker
 */
export const useTimePicker_unstable = (props: TimePickerProps, ref: React.Ref<HTMLInputElement>): TimePickerState => {
  const fieldContext = useFieldContext();
  const { appearance = 'outline', size = fieldContext?.size ?? 'medium', ...baseProps } = props;
  const baseState = useTimePickerBase_unstable(baseProps, ref);

  // While open, Escape closes the listbox and must not be handled by Tabster.
  const ignoreEscapeKeyAttribute = useTabsterAttributes({
    focusable: { ignoreKeydown: { Escape: baseState.open } },
  });
  const tabsterAttributes = useMergedTabsterAttributes_unstable(
    ignoreEscapeKeyAttribute,
    baseState.input as Partial<TabsterDOMAttribute>,
  );

  return {
    ...baseState,
    appearance,
    size,
    input: { ...tabsterAttributes, ...baseState.input },
    clearIcon: baseState.clearIcon && {
      ...baseState.clearIcon,
      children: baseState.clearIcon.children ?? <DismissIcon />,
    },
    expandIcon: baseState.expandIcon && {
      ...baseState.expandIcon,
      children: baseState.expandIcon.children ?? <ChevronDownIcon />,
    },
  };
};
