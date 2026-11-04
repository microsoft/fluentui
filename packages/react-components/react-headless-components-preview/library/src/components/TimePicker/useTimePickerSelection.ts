'use client';

import * as React from 'react';
import { mergeCallbacks, useControllableState, useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxProps } from '../Combobox/Combobox.types';
import type { TimePickerOption } from './utils/types';
import {
  createTimeFormat,
  dateToKey,
  keyToDate,
  getDateStartAnchor,
  getDateEndAnchor,
  getTimesBetween,
} from './utils/timeMath';
import type {
  TimePickerCommitData,
  TimePickerOnChangeData,
  TimePickerProps,
  TimePickerTimeState,
} from './TimePicker.types';

/**
 * Result of `useTimePickerSelection`.
 */
export type TimePickerSelection = TimePickerTimeState & {
  /**
   * Props to pass to the underlying Combobox hook. The Combobox `children` must be created from `options`.
   */
  comboboxProps: ComboboxProps;

  /**
   * Options rendered in the listbox.
   */
  options: TimePickerOption[];

  /**
   * Ref to be merged into the Combobox `clearIcon` slot. It tells clearing apart from a freeform commit.
   */
  clearIconRef: React.RefObject<HTMLSpanElement | null>;

  /**
   * Updates `value` and the display text, then invokes `onChange`.
   */
  commitValue: (event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => void;

  /**
   * Records the typed text. Merged into the resolved input slot, so an `onChange` on the input slot does not replace it.
   */
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Text typed by the user, with the value keys it belongs to.
 * The text is kept while `value` is either the value it was typed over or the value its commit produced,
 * and discarded when `value` changes to anything else (for example a new controlled value).
 */
type TypedText = {
  text: string | undefined;
  valueKey: string;
  committedValueKey: string;
};

/**
 * Text kept by the last failed commit, with the value keys it belongs to: the value it was made over and the value it
 * produced. Both are kept so a commit the controlled parent did not accept is not reported again.
 */
type LastCommit = {
  text: string;
  valueKey: string;
  committedValueKey: string;
};

const belongsTo = (text: { valueKey: string; committedValueKey: string }, valueKey: string) =>
  text.valueKey === valueKey || text.committedValueKey === valueKey;

/**
 * Resolves TimePicker specific props into the options, the selection state and the props for the underlying Combobox.
 *
 * @param props - props from this instance of TimePicker
 */
export const useTimePickerSelection = (props: TimePickerProps): TimePickerSelection => {
  const {
    dateAnchor: dateAnchorInProps,
    defaultValue: defaultValueInProps,
    endHour = 24,
    formatDateToTimeString: formatDateToTimeStringInProps,
    hourCycle,
    increment = 30,
    onChange,
    value: valueInProps,
    showSeconds = false,
    startHour = 0,
    parseTimeStringToDate: parseTimeStringToDateInProps,
    ...rest
  } = props;
  const { freeform = false, clearable } = rest;

  const [value, setValue] = useControllableState<Date | null>({
    state: valueInProps,
    defaultState: defaultValueInProps,
    initialState: null,
  });
  const valueKey = dateToKey(value);
  const validValue = value && valueKey !== 'invalid' ? value : undefined;

  // Without `dateAnchor`, the options follow the day of the last valid value. A range that crosses midnight keeps the
  // initial value, because a value after midnight cannot tell which day its range starts on.
  const [valueAnchor, setValueAnchor] = React.useState(validValue);
  if (validValue && endHour >= startHour && valueKey !== dateToKey(valueAnchor ?? null)) {
    setValueAnchor(validValue);
  }
  const { dateStartAnchor, dateEndAnchor } = useStableDateAnchor(dateAnchorInProps ?? valueAnchor, startHour, endHour);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && endHour < startHour && !dateAnchorInProps) {
      // eslint-disable-next-line no-console
      console.error(
        'TimePicker: a range that crosses midnight (endHour < startHour) needs an explicit dateAnchor, ' +
          'otherwise a value on the following day cannot identify its range.',
      );
    }
  }, [dateAnchorInProps, endHour, startHour]);

  const timeFormat = React.useMemo(() => createTimeFormat({ hourCycle, showSeconds }), [hourCycle, showSeconds]);
  const formatTime = React.useCallback(
    (date: Date) =>
      formatDateToTimeStringInProps
        ? formatDateToTimeStringInProps(date, { showSeconds, hourCycle })
        : timeFormat.format(date),
    [formatDateToTimeStringInProps, hourCycle, showSeconds, timeFormat],
  );

  const options: TimePickerOption[] = React.useMemo(
    () =>
      getTimesBetween(dateStartAnchor, dateEndAnchor, increment).map(time => ({
        date: time,
        key: dateToKey(time),
        text: formatTime(time),
      })),
    [dateEndAnchor, dateStartAnchor, formatTime, increment],
  );

  const [typedText, setTypedText] = React.useState<TypedText | undefined>(undefined);
  const [lastCommit, setLastCommit] = React.useState<LastCommit | undefined>(undefined);

  // When `value` changes, discard typed and committed text that belongs to neither value. Text whose commit was
  // accepted belongs to the committed value only from then on, so it does not come back when the value changes back.
  const [previousValueKey, setPreviousValueKey] = React.useState(valueKey);
  if (previousValueKey !== valueKey) {
    setPreviousValueKey(valueKey);
    const settle = <T extends TypedText | LastCommit>(text: T | undefined): T | undefined =>
      text && belongsTo(text, valueKey) ? { ...text, valueKey } : undefined;
    if (typedText) {
      setTypedText(settle(typedText));
    }
    if (lastCommit) {
      setLastCommit(settle(lastCommit));
    }
  }

  const activeTypedText = typedText && belongsTo(typedText, valueKey) ? typedText.text : undefined;
  const formattedValue = React.useMemo(
    () => (validValue ? formatTime(validValue) : ''),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `valueKey` stands for `value`
    [formatTime, valueKey],
  );
  const displayValue = activeTypedText ?? formattedValue;

  const committedText = lastCommit && belongsTo(lastCommit, valueKey) ? lastCommit.text : formattedValue;

  const commitValue = useEventCallback((event: TimePickerOnChangeData['event'], data: TimePickerCommitData) => {
    const keepsTypedText = !!data.errorType && data.displayValue !== undefined;
    const nextValueKey = dateToKey(data.value);
    const nextDisplayValue =
      keepsTypedText || data.displayValue === undefined
        ? data.displayValue
        : data.value && nextValueKey !== 'invalid'
        ? formatTime(data.value)
        : '';

    setValue(data.value);
    // After a successful change the input shows the formatted value, so only a failed commit needs its own baseline.
    setLastCommit(keepsTypedText ? { text: data.displayValue!, valueKey, committedValueKey: nextValueKey } : undefined);
    setTypedText(keepsTypedText ? { text: data.displayValue!, valueKey, committedValueKey: nextValueKey } : undefined);
    onChange?.(event, {
      event,
      type: event.type,
      ...data,
      displayValue: nextDisplayValue,
    } as TimePickerOnChangeData);
  });

  // The key is kept even when no option matches, so a value between options still shows the clear icon.
  const selectedOptions = React.useMemo(() => (value && valueKey !== 'invalid' ? [valueKey] : []), [value, valueKey]);

  const clearIconRef = React.useRef<HTMLSpanElement>(null);
  const onOptionSelect: NonNullable<ComboboxProps['onOptionSelect']> = useEventCallback((event, data) => {
    if (
      data.optionValue === undefined &&
      !(clearable && event.type === 'click' && event.currentTarget === clearIconRef.current)
    ) {
      return;
    }
    if (data.optionValue === valueKey && activeTypedText === undefined) {
      return;
    }

    commitValue(event, {
      value: keyToDate(data.optionValue ?? ''),
      displayValue: data.optionText,
      errorType: undefined,
    });
  });

  const onInputChange = useEventCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedText({ text: event.target.value, valueKey, committedValueKey: valueKey });
  });

  const discardTypedText = useEventCallback(() => {
    if (!freeform) {
      setTypedText(undefined);
    }
  });
  const onOpenChange: NonNullable<ComboboxProps['onOpenChange']> = useEventCallback((event, data) => {
    if (!data.open) {
      discardTypedText();
    }
  });

  const defaultParseTimeStringToDate = React.useCallback(
    (time: string | undefined) => timeFormat.parse(time, dateStartAnchor, dateEndAnchor),
    [dateEndAnchor, dateStartAnchor, timeFormat],
  );

  // Freeform text that no option starts with, or typed text that was deleted, keeps the Combobox from activating the
  // first option, so Enter or Tab cannot replace the text with an unrelated time. Arrow keys still activate options.
  const searchText = displayValue.trim().toLowerCase();
  const matchesNoOption =
    freeform &&
    (searchText
      ? !options.some(option => option.text.toLowerCase().indexOf(searchText) === 0)
      : activeTypedText !== undefined);

  const comboboxProps: ComboboxProps = {
    autoComplete: 'off',
    ...rest,
    disableAutoFocus: matchesNoOption,
    value: displayValue,
    onBlur: mergeCallbacks(rest.onBlur, discardTypedText),
    onOpenChange: mergeCallbacks(rest.onOpenChange, onOpenChange),
    selectedOptions,
    onOptionSelect,
  };

  return {
    comboboxProps,
    options,
    clearIconRef,
    commitValue,
    onInputChange,
    freeform,
    parseTimeStringToDate: parseTimeStringToDateInProps ?? defaultParseTimeStringToDate,
    committedText,
  };
};

/**
 * Provides stable start and end date anchors based on the provided date and time parameters.
 * The hook ensures that the memoization remains consistent even if new Date objects representing the same date are provided.
 */
const useStableDateAnchor = (providedDate: Date | undefined, startHour: number, endHour: number) => {
  const [fallbackDateAnchor] = React.useState(() => new Date());

  // Only the day matters, so a new time on the same day keeps the options.
  const providedDateKey = providedDate ? getDateStartAnchor(providedDate, startHour).getTime() : undefined;

  return React.useMemo(() => {
    const dateAnchor = providedDate ?? fallbackDateAnchor;

    const dateStartAnchor = getDateStartAnchor(dateAnchor, startHour);
    const dateEndAnchor = getDateEndAnchor(dateAnchor, startHour, endHour);

    return { dateStartAnchor, dateEndAnchor };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endHour, fallbackDateAnchor, providedDateKey, startHour]);
};
