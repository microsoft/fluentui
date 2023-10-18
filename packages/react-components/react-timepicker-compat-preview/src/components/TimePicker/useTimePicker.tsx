import * as React from 'react';
import { mergeCallbacks, useControllableState } from '@fluentui/react-utilities';
import { Enter } from '@fluentui/keyboard-keys';
import type { Hour, TimePickerOption, TimePickerProps, TimePickerState, TimeSelectionData } from './TimePicker.types';
import { ComboboxProps, useCombobox_unstable, Option } from '@fluentui/react-combobox';
import {
  dateToKey,
  keyToDate,
  formatDateToTimeString as defaultFormatDateToTimeString,
  getDateStartAnchor,
  getDateEndAnchor,
  getTimesBetween,
  getDateFromTimeString,
} from './timeMath';

// TODO before stable, replace useCallback to useEventCallback if needed

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
    formatDateToTimeString,
    onTimeSelect,
    validateFreeFormTime: validateFreeFormTimeInProps,
    selectedTime: selectedTimeInProps,
    showSeconds = false,
    startHour = 0,
    ...rest
  } = props;
  const { freeform = false } = rest;

  const { dateStartAnchor, dateEndAnchor } = useStableDateAnchor(
    dateAnchorInProps ?? selectedTimeInProps ?? defaultSelectedTimeInProps,
    startHour,
    endHour,
  );

  const dateToText = React.useCallback(
    (dateTime: Date) =>
      formatDateToTimeString
        ? formatDateToTimeString(dateTime)
        : defaultFormatDateToTimeString(dateTime, { showSeconds, hour12 }),
    [hour12, formatDateToTimeString, showSeconds],
  );
  const options: TimePickerOption[] = React.useMemo(
    () =>
      getTimesBetween(dateStartAnchor, dateEndAnchor, increment).map(time => ({
        date: time,
        key: dateToKey(time),
        text: dateToText(time),
      })),
    [dateStartAnchor, dateEndAnchor, increment, dateToText],
  );

  const [selectedTime, setSelectedTime] = useControllableState<Date | undefined>({
    state: props.selectedTime,
    defaultState: props.defaultSelectedTime,
    initialState: undefined,
  });

  const selectedTimeTextRef = React.useRef<string | undefined>(undefined);

  const selectTime: TimePickerProps['onTimeSelect'] = React.useCallback(
    (e, data) => {
      setSelectedTime(data.selectedTime);
      selectedTimeTextRef.current = data.selectedTimeText;
      onTimeSelect?.(e, data);
    },
    [onTimeSelect, setSelectedTime],
  );

  const selectedOptions = React.useMemo(() => {
    const selectedOption = options.find(date => date.key === dateToKey(selectedTime));
    return selectedOption ? [selectedOption.key] : [];
  }, [options, selectedTime]);

  const handleOptionSelect: ComboboxProps['onOptionSelect'] = React.useCallback(
    (e, data) => {
      if (freeform && data.optionValue === undefined) {
        // Combobox clears selection when input value not matching any option; but we allow this case in freeform TimePicker.
        return;
      }

      const timeSelectionData: TimeSelectionData = {
        selectedTime: keyToDate(data.optionValue),
        selectedTimeText: data.optionText,
        error: undefined,
      };
      selectTime(e, timeSelectionData);
    },
    [freeform, selectTime],
  );

  const baseState = useCombobox_unstable(
    {
      ...rest,
      selectedOptions,
      onOptionSelect: handleOptionSelect,
      children: options.map(date => (
        <Option key={date.key} value={date.key}>
          {date.text}
        </Option>
      )),
    },
    ref,
  );

  const defaultValidateTime = React.useCallback(
    (time: string | undefined) => getDateFromTimeString(time, dateStartAnchor, dateEndAnchor, { hour12, showSeconds }),
    [dateEndAnchor, dateStartAnchor, hour12, showSeconds],
  );

  const state: TimePickerState = {
    ...baseState,
    freeform,
    validateFreeFormTime: validateFreeFormTimeInProps ?? defaultValidateTime,
    selectedTimeTextRef,
  };

  useSelectTimeFromValue(state, selectTime);

  return state;
};

/**
 * Provides stable start and end date anchors based on the provided date and time parameters.
 * The hook ensures that the memoization remains consistent even if new Date objects representing the same date are provided.
 */
const useStableDateAnchor = (providedDate: Date | undefined, startHour: Hour, endHour: Hour) => {
  const [fallbackDateAnchor] = React.useState(() => new Date());

  // Convert the Date object to a stable key representation. This ensures that the memoization remains stable when a new Date object representing the same date is passed in.
  const dateAnchorKey = dateToKey(providedDate);
  const dateAnchor = React.useMemo(
    () => keyToDate(dateAnchorKey) ?? fallbackDateAnchor,
    [dateAnchorKey, fallbackDateAnchor],
  );

  const dateStartAnchor = React.useMemo(() => getDateStartAnchor(dateAnchor, startHour), [dateAnchor, startHour]);
  const dateEndAnchor = React.useMemo(
    () => getDateEndAnchor(dateAnchor, startHour, endHour),
    [dateAnchor, endHour, startHour],
  );

  return { dateStartAnchor, dateEndAnchor };
};

/**
 * Mimics the behavior of the browser's change event for a freeform TimePicker.
 * The provided callback is called when input changed and:
 * - Enter/Tab key is pressed on the input.
 * - TODO: TimePicker loses focus, signifying a possible change.
 */
const useSelectTimeFromValue = (state: TimePickerState, callback: TimePickerProps['onTimeSelect']) => {
  const { activeOption, freeform, validateFreeFormTime, options, selectedTimeTextRef, setActiveOption, value } = state;

  // Base Combobox has activeOption default to first option in dropdown even if it doesn't match input value, and Enter key will select it.
  // This effect ensures that the activeOption is cleared when the input doesn't match any option.
  // This behavior is specific to a freeform TimePicker where the input value is treated as a valid time even if it's not in the dropdown.
  const isValueOptionPrefix = value ? options.some(({ text }) => text.indexOf(value) === 0) : false;
  React.useEffect(() => {
    if (freeform && value && !isValueOptionPrefix) {
      setActiveOption(undefined);
    }
  }, [freeform, isValueOptionPrefix, setActiveOption, value]);

  const selectTimeFromValue = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
      if (!freeform) {
        return;
      }

      const { date: selectedTime, error } = validateFreeFormTime(value);

      // Only triggers callback when the text in input has changed.
      if (selectedTimeTextRef.current !== value) {
        callback?.(e, { selectedTime, selectedTimeText: value, error });
      }
    },
    [callback, freeform, selectedTimeTextRef, validateFreeFormTime, value],
  );

  const handleKeyDown: ComboboxProps['onKeyDown'] = React.useCallback(
    e => {
      if (!activeOption && e.key === Enter) {
        selectTimeFromValue(e);
      }
    },
    [activeOption, selectTimeFromValue],
  );
  state.root.onKeyDown = mergeCallbacks(handleKeyDown, state.root.onKeyDown);

  // TODO call selectTimeFromValue on blur
};
