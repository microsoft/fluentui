import * as React from 'react';
import { useControllableState } from '@fluentui/react-utilities';
import type { TimePickerProps, TimePickerState, TimeSelectionData } from './TimePicker.types';
import { ComboboxProps, useCombobox_unstable, Option } from '@fluentui/react-combobox';
import {
  dateToKey,
  keyToDate,
  formatTimeString,
  getDateStartAnchor,
  getDateEndAnchor,
  getTimesBetween,
} from './timeMath';

/**
 * Create the state required to render TimePicker.
 *
 * The returned state can be modified with hooks such as useTimePickerStyles_unstable,
 * before being passed to renderTimePicker_unstable.
 *
 * @param props - props from this instance of TimePicker
 * @param ref - reference to root HTMLElement of TimePicker
 */
export const useTimePicker_unstable = (props: TimePickerProps, ref: React.Ref<HTMLInputElement>): TimePickerState => {
  const {
    dateAnchor: dateAnchorInProps,
    defaultSelectedTime: defaultSelectedTimeInProps,
    endHour = 24,
    hour12 = false,
    increment = 30,
    onTimeSelect,
    selectedTime: selectedTimeInProps,
    showSeconds = false,
    startHour = 0,
    ...rest
  } = props;

  const fallbackDateAnchor = React.useRef(new Date()).current;
  const dateAnchor = dateAnchorInProps ?? selectedTimeInProps ?? defaultSelectedTimeInProps ?? fallbackDateAnchor;

  const dateStartAnchor = React.useMemo(() => getDateStartAnchor(dateAnchor, startHour), [dateAnchor, startHour]);
  const dateEndAnchor = React.useMemo(
    () => getDateEndAnchor(dateAnchor, startHour, endHour),
    [dateAnchor, endHour, startHour],
  );

  const options: Date[] = React.useMemo(
    () => getTimesBetween(dateStartAnchor, dateEndAnchor, increment),
    [increment, dateStartAnchor, dateEndAnchor],
  );

  const [selectedTime, setSelectedTime] = useControllableState<Date | undefined>({
    state: props.selectedTime,
    defaultState: props.defaultSelectedTime,
    initialState: undefined,
  });

  const selectedOptions = React.useMemo(() => {
    const selectedOption = options.find(date => dateToKey(date) === dateToKey(selectedTime));
    return [dateToKey(selectedOption)];
  }, [options, selectedTime]);

  const handleOptionSelect: ComboboxProps['onOptionSelect'] = React.useCallback(
    (e, data) => {
      const timeSelectionData: TimeSelectionData = { selectedTime: keyToDate(data.optionValue) };
      onTimeSelect?.(e, timeSelectionData);
      setSelectedTime(timeSelectionData.selectedTime);
    },
    [setSelectedTime, onTimeSelect],
  );

  const dateToText = React.useCallback(
    (date: Date) => formatTimeString(date, showSeconds, hour12),
    [hour12, showSeconds],
  );
  const state = useCombobox_unstable(
    {
      ...rest,
      selectedOptions,
      onOptionSelect: handleOptionSelect,
      children: options.map(date => {
        const optionValue = dateToKey(date);
        return (
          <Option key={optionValue} value={optionValue}>
            {dateToText(date)}
          </Option>
        );
      }),
    },
    ref,
  );

  return state;
};
