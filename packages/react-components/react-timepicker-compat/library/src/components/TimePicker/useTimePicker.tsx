import * as React from 'react';
import {
  elementContains,
  mergeCallbacks,
  useControllableState,
  useEventCallback,
  useId,
  useMergedRefs,
} from '@fluentui/react-utilities';
import { Enter } from '@fluentui/keyboard-keys';
import type { Hour, TimePickerOption, TimePickerProps, TimePickerState, TimeSelectionData } from './TimePicker.types';
import { ComboboxProps, useCombobox_unstable, Option } from '@fluentui/react-combobox';
import { useFieldContext_unstable as useFieldContext } from '@fluentui/react-field';
import {
  dateToKey,
  keyToDate,
  formatDateToTimeString as defaultFormatDateToTimeString,
  getDateStartAnchor,
  getDateEndAnchor,
  getTimesBetween,
  getDateFromTimeString,
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
    formatDateToTimeString = defaultFormatDateToTimeString,
    hourCycle,
    increment = 30,
    onTimeChange,
    selectedTime: selectedTimeInProps,
    showSeconds = false,
    startHour = 0,
    parseTimeStringToDate: parseTimeStringToDateInProps,
    ...rest
  } = props;
  const { freeform = false } = rest;

  const { dateStartAnchor, dateEndAnchor } = useStableDateAnchor(
    dateAnchorInProps ?? selectedTimeInProps ?? defaultSelectedTimeInProps,
    startHour,
    endHour,
  );

  const options: TimePickerOption[] = React.useMemo(
    () =>
      getTimesBetween(dateStartAnchor, dateEndAnchor, increment).map(time => ({
        date: time,
        key: dateToKey(time),
        text: formatDateToTimeString(time, { showSeconds, hourCycle }),
      })),
    [dateEndAnchor, dateStartAnchor, formatDateToTimeString, hourCycle, increment, showSeconds],
  );

  const [selectedTime, setSelectedTime] = useControllableState<Date | null>({
    state: selectedTimeInProps,
    defaultState: defaultSelectedTimeInProps,
    initialState: null,
  });

  const [submittedText, setSubmittedText] = React.useState<string | undefined>(undefined);

  const selectTime: TimePickerProps['onTimeChange'] = useEventCallback((e, data) => {
    setSelectedTime(data.selectedTime);
    setSubmittedText(data.selectedTimeText);
    onTimeChange?.(e, data);
  });

  const selectedOptions = React.useMemo(() => {
    const selectedTimeKey = dateToKey(selectedTime);
    const selectedOption = options.find(date => date.key === selectedTimeKey);
    return selectedOption ? [selectedOption.key] : [];
  }, [options, selectedTime]);

  const clearIconRef = React.useRef<HTMLSpanElement>(null);
  const handleOptionSelect: ComboboxProps['onOptionSelect'] = useEventCallback((e, data) => {
    if (
      freeform &&
      data.optionValue === undefined &&
      !(rest.clearable && e.type === 'click' && e.currentTarget === clearIconRef.current)
    ) {
      // Combobox clears selection when input value not matching any option; but we allow this case in freeform TimePicker.
      return;
    }
    const timeSelectionData: TimeSelectionData = {
      selectedTime: keyToDate(data.optionValue ?? ''),
      selectedTimeText: data.optionText,
      errorType: undefined,
    };
    selectTime(e, timeSelectionData);
  });

  const baseState = useCombobox_unstable(
    {
      autoComplete: 'off',
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

  const defaultParseTimeStringToDate = React.useCallback(
    (time: string | undefined) =>
      getDateFromTimeString(time, dateStartAnchor, dateEndAnchor, { hourCycle, showSeconds }),
    [dateEndAnchor, dateStartAnchor, hourCycle, showSeconds],
  );

  const mergedClearIconRef = useMergedRefs(baseState.clearIcon?.ref, clearIconRef);
  const state: TimePickerState = {
    ...baseState,
    clearIcon: baseState.clearIcon
      ? {
          ...baseState.clearIcon,
          ref: mergedClearIconRef,
        }
      : undefined,
    freeform,
    parseTimeStringToDate: parseTimeStringToDateInProps ?? defaultParseTimeStringToDate,
    submittedText,
  };

  useDefaultChevronIconLabel(state);
  useSelectTimeFromValue(state, selectTime);

  return state;
};

/**
 * Provides stable start and end date anchors based on the provided date and time parameters.
 * The hook ensures that the memoization remains consistent even if new Date objects representing the same date are provided.
 */
const useStableDateAnchor = (providedDate: Date | undefined, startHour: Hour, endHour: Hour) => {
  const [fallbackDateAnchor] = React.useState(() => new Date());

  const providedDateKey = dateToKey(providedDate ?? null);

  return React.useMemo(() => {
    const dateAnchor = providedDate ?? fallbackDateAnchor;

    const dateStartAnchor = getDateStartAnchor(dateAnchor, startHour);
    const dateEndAnchor = getDateEndAnchor(dateAnchor, startHour, endHour);

    return { dateStartAnchor, dateEndAnchor };
    // `providedDate`'s stable key representation is used as dependency instead of the Date object. This ensures that the memoization remains stable when a new Date object representing the same date is passed in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endHour, fallbackDateAnchor, providedDateKey, startHour]);
};

/**
 * Mimics the behavior of the browser's change event for a freeform TimePicker.
 * The provided callback is called when input changed and:
 * - Enter/Tab key is pressed on the input.
 * - TimePicker loses focus, signifying a possible change.
 */
const useSelectTimeFromValue = (state: TimePickerState, callback: TimePickerProps['onTimeChange']) => {
  const { getOptionById, freeform, parseTimeStringToDate, submittedText, value, activeDescendantController } = state;
  const getActiveOption = React.useCallback(() => {
    const activeOptionId = activeDescendantController.active();
    return activeOptionId ? getOptionById(activeOptionId) : null;
  }, [activeDescendantController, getOptionById]);

  // Base Combobox has activeOption default to first option in dropdown even if it doesn't match input value, and Enter key will select it.
  // This effect ensures that the activeOption is cleared when the input doesn't match any option.
  // This behavior is specific to a freeform TimePicker where the input value is treated as a valid time even if it's not in the dropdown.
  React.useEffect(() => {
    if (freeform && value) {
      const activeOption = getActiveOption();
      if (!activeOption) {
        return;
      }

      const valueMatchesActiveOption = activeOption.text.toLowerCase().indexOf(value.toLowerCase()) === 0;
      if (!valueMatchesActiveOption) {
        activeDescendantController.blur();
      }
    }
  }, [freeform, value, activeDescendantController, getActiveOption]);

  const selectTimeFromValue = useEventCallback(
    (e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => {
      if (!freeform) {
        return;
      }

      const { date: selectedTime, errorType } = parseTimeStringToDate(value);

      // Only triggers callback when the text in input has changed.
      if (submittedText !== value) {
        callback?.(e, { selectedTime, selectedTimeText: value, errorType });
      }
    },
  );

  const handleKeyDown: ComboboxProps['onKeyDown'] = useEventCallback(e => {
    const activeOption = getActiveOption();
    if (!activeOption && e.key === Enter) {
      selectTimeFromValue(e);
    }
  });
  state.root.onKeyDown = mergeCallbacks(handleKeyDown, state.root.onKeyDown);

  const rootRef = React.useRef<HTMLDivElement>(null);
  state.root.ref = useMergedRefs(state.root.ref, rootRef);

  if (state.listbox) {
    state.listbox.tabIndex = -1; // allows it to be the relatedTarget of a blur event.
  }

  if (state.expandIcon) {
    state.expandIcon.tabIndex = -1; // allows it to be the relatedTarget of a blur event.
  }

  const handleInputBlur = useEventCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const isOutside = e.relatedTarget ? !elementContains(rootRef.current, e.relatedTarget) : true;
    if (isOutside) {
      selectTimeFromValue(e);
    }
  });
  state.input.onBlur = mergeCallbacks(handleInputBlur, state.input.onBlur);
};

/**
 * Provides a default aria-labelledby for the chevron icon if the TimePicker is wrapped in a Field.
 */
const useDefaultChevronIconLabel = (state: TimePickerState) => {
  const fieldContext = useFieldContext();
  const chevronDefaultId = useId('timepicker-chevron-');
  const defaultLabelFromCombobox = 'Open';

  if (fieldContext?.labelId && state.expandIcon?.['aria-label'] === defaultLabelFromCombobox) {
    const chevronId = state.expandIcon.id ?? chevronDefaultId;
    state.expandIcon['aria-labelledby'] = `${chevronId} ${fieldContext.labelId}`;
  }
};
