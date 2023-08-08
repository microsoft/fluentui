import * as React from 'react';
import { KeyCodes } from '../../Utilities';
import {
  TimeConstants,
  addMinutes,
  formatTimeString,
  ceilMinuteToIncrement,
  getDateFromTimeSelection,
} from '@fluentui/date-time-utilities';
import { ComboBox } from '../../ComboBox';
import { format } from '../../Utilities';
import type { IComboBox, IComboBoxOption } from '../../ComboBox';
import type { ITimePickerProps, ITimeRange, ITimePickerStrings } from './TimePicker.types';
import { useControllableValue, useConst } from '@fluentui/react-hooks';

const REGEX_SHOW_SECONDS_HOUR_12 = /^((1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])\s([AaPp][Mm]))$/;
const REGEX_HIDE_SECONDS_HOUR_12 = /^((1[0-2]|0?[1-9]):[0-5][0-9]\s([AaPp][Mm]))$/;
const REGEX_SHOW_SECONDS_HOUR_24 = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
const REGEX_HIDE_SECONDS_HOUR_24 = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const TIME_LOWER_BOUND = 0;
const TIME_UPPER_BOUND = 23;

const getDefaultStrings = (useHour12: boolean, showSeconds: boolean): ITimePickerStrings => {
  const hourUnits = useHour12 ? '12-hour' : '24-hour';
  const timeFormat = `hh:mm${showSeconds ? ':ss' : ''}${useHour12 ? ' AP' : ''}`;
  const invalidInputErrorMessage = `Enter a valid time in the ${hourUnits} format: ${timeFormat}`;
  const timeOutOfBoundsErrorMessage = `Please enter a time within the range of {0} and {1}`;

  return {
    invalidInputErrorMessage,
    timeOutOfBoundsErrorMessage,
  };
};

/**
 * {@docCategory TimePicker}
 */
export const TimePicker: React.FunctionComponent<ITimePickerProps> = ({
  label,
  increments = 30,
  showSeconds = false,
  allowFreeform = true,
  useHour12 = false,
  timeRange,
  strings = getDefaultStrings(useHour12, showSeconds),
  defaultValue,
  value,
  dateAnchor,
  onChange,
  onFormatDate,
  onValidateUserInput,
  onValidationResult,
  ...rest
}: ITimePickerProps) => {
  const [comboBoxText, setComboBoxText] = React.useState<string>('');
  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined | null>();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const fallbackDateAnchor = useConst(new Date());

  const [selectedTime, setSelectedTime] = useControllableValue(value, defaultValue);

  const optionsCount = getDropdownOptionsCount(increments, timeRange);

  const internalDateAnchor = dateAnchor || value || defaultValue || fallbackDateAnchor;

  const dateStartAnchor = React.useMemo(
    () => getDateAnchor(internalDateAnchor, 'start', increments, timeRange),
    [internalDateAnchor, increments, timeRange],
  );

  const dateEndAnchor = React.useMemo(
    () => getDateAnchor(internalDateAnchor, 'end', increments, timeRange),
    [internalDateAnchor, increments, timeRange],
  );

  const timePickerOptions: IComboBoxOption[] = React.useMemo(() => {
    const optionsList = Array(optionsCount);
    for (let i = 0; i < optionsCount; i++) {
      optionsList[i] = 0;
    }

    return optionsList.map((_, index) => {
      const option: Date = addMinutes(dateStartAnchor, increments * index);
      option.setSeconds(0);
      const formattedTimeString = formatTimeString(option, showSeconds, useHour12);
      const optionText = onFormatDate ? onFormatDate(option) : formattedTimeString;
      return {
        key: formattedTimeString,
        text: optionText,
        data: option,
      };
    });
  }, [dateStartAnchor, increments, optionsCount, showSeconds, onFormatDate, useHour12]);

  React.useEffect(() => {
    if (selectedTime && !isNaN(selectedTime.valueOf())) {
      const formattedTimeString = formatTimeString(selectedTime, showSeconds, useHour12);
      const comboboxOption = timePickerOptions.find((option: IComboBoxOption) => option.key === formattedTimeString);
      setSelectedKey(comboboxOption?.key);
      setComboBoxText(comboboxOption ? comboboxOption.text : formattedTimeString);
    } else {
      setSelectedKey(null);
    }
  }, [selectedTime, timePickerOptions, onFormatDate, showSeconds, useHour12]);

  const onInputChange = React.useCallback(
    (ev: React.FormEvent<IComboBox>, option?: IComboBoxOption, _index?: number, input?: string): void => {
      const validateUserInput = (userInput: string): string => {
        let errorMessageToDisplay = '';
        let regex: RegExp;
        if (useHour12) {
          regex = showSeconds ? REGEX_SHOW_SECONDS_HOUR_12 : REGEX_HIDE_SECONDS_HOUR_12;
        } else {
          regex = showSeconds ? REGEX_SHOW_SECONDS_HOUR_24 : REGEX_HIDE_SECONDS_HOUR_24;
        }
        if (!regex.test(userInput)) {
          errorMessageToDisplay = strings.invalidInputErrorMessage;
        } else if (timeRange && strings.timeOutOfBoundsErrorMessage) {
          const optionDate: Date = getDateFromTimeSelection(useHour12, dateStartAnchor, userInput);
          if (optionDate < dateStartAnchor || optionDate > dateEndAnchor) {
            errorMessageToDisplay = format(
              strings.timeOutOfBoundsErrorMessage,
              dateStartAnchor.toString(),
              dateEndAnchor.toString(),
            );
          }
        }
        return errorMessageToDisplay;
      };

      let errorMessageToDisplay = '';
      if (input) {
        if (allowFreeform && !option) {
          if (!onFormatDate) {
            // Validate only if user did not add onFormatDate
            errorMessageToDisplay = validateUserInput(input);
          } else {
            // Use user provided validation if onFormatDate is provided
            if (onValidateUserInput) {
              errorMessageToDisplay = onValidateUserInput(input);
            }
          }
        }
      }

      if (onValidationResult && errorMessage !== errorMessageToDisplay) {
        // only call onValidationResult if stored errorMessage state value is different from latest error message
        onValidationResult(ev, { errorMessage: errorMessageToDisplay });
      }

      let changedTime: Date;
      if (errorMessageToDisplay || (input !== undefined && !input.length)) {
        const timeSelection = input || option?.text || '';
        setComboBoxText(timeSelection);
        setSelectedTime(errorMessageToDisplay ? new Date('invalid') : undefined);
        changedTime = new Date('invalid');
      } else {
        let updatedTime;
        if (option?.data instanceof Date) {
          updatedTime = option.data;
        } else {
          const timeSelection = (option?.key as string) || input || '';
          updatedTime = getDateFromTimeSelection(useHour12, dateStartAnchor, timeSelection);
        }
        setSelectedTime(updatedTime);
        changedTime = updatedTime;
      }

      onChange?.(ev, changedTime);
      setErrorMessage(errorMessageToDisplay);
    },
    [
      timeRange,
      dateStartAnchor,
      dateEndAnchor,
      allowFreeform,
      onFormatDate,
      onValidateUserInput,
      showSeconds,
      useHour12,
      strings.invalidInputErrorMessage,
      strings.timeOutOfBoundsErrorMessage,
      setSelectedTime,
      onValidationResult,
      onChange,
      errorMessage,
    ],
  );

  const evaluatePressedKey = (event: React.KeyboardEvent<IComboBox>) => {
    // eslint-disable-next-line deprecation/deprecation
    const charCode = event.charCode;
    if (
      !onFormatDate &&
      // Only permit input of digits, space, colon, A/P/M characters
      !(
        (charCode >= KeyCodes.zero && charCode <= KeyCodes.colon) ||
        charCode === KeyCodes.space ||
        charCode === KeyCodes.a ||
        charCode === KeyCodes.m ||
        charCode === KeyCodes.p
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <ComboBox
      {...rest}
      allowFreeform={allowFreeform}
      selectedKey={selectedKey}
      label={label}
      errorMessage={errorMessage}
      options={timePickerOptions}
      onChange={onInputChange}
      text={comboBoxText}
      //eslint-disable-next-line
      onKeyPress={evaluatePressedKey}
      useComboBoxAsMenuWidth
    />
  );
};
TimePicker.displayName = 'TimePicker';

const getDateAnchor = (
  internalDateAnchor: Date,
  startEnd: 'start' | 'end',
  increments: number,
  timeRange?: ITimeRange,
) => {
  const clampedDateAnchor = new Date(internalDateAnchor.getTime());
  if (timeRange) {
    const clampedTimeRange = clampTimeRange(timeRange);
    const timeRangeHours = startEnd === 'start' ? clampedTimeRange.start : clampedTimeRange.end;
    if (clampedDateAnchor.getHours() !== timeRangeHours) {
      clampedDateAnchor.setHours(timeRangeHours);
    }
  } else if (startEnd === 'end') {
    clampedDateAnchor.setDate(clampedDateAnchor.getDate() + 1);
  }
  clampedDateAnchor.setMinutes(0);
  clampedDateAnchor.setSeconds(0);
  clampedDateAnchor.setMilliseconds(0);

  return ceilMinuteToIncrement(clampedDateAnchor, increments);
};

const clampTimeRange = (timeRange: ITimeRange): ITimeRange => {
  return {
    start: Math.min(Math.max(timeRange.start, TIME_LOWER_BOUND), TIME_UPPER_BOUND),
    end: Math.min(Math.max(timeRange.end, TIME_LOWER_BOUND), TIME_UPPER_BOUND),
  };
};

const getHoursInRange = (timeRange: ITimeRange | undefined) => {
  let hoursInRange = TimeConstants.HoursInOneDay;
  if (timeRange) {
    const clampedTimeRange = clampTimeRange(timeRange);
    if (clampedTimeRange.start > clampedTimeRange.end) {
      hoursInRange = TimeConstants.HoursInOneDay - timeRange.start - timeRange.end;
    } else if (timeRange.end > timeRange.start) {
      hoursInRange = timeRange.end - timeRange.start;
    }
  }

  return hoursInRange;
};

const getDropdownOptionsCount = (increments: number, timeRange: ITimeRange | undefined) => {
  const hoursInRange = getHoursInRange(timeRange);
  return Math.floor((TimeConstants.MinutesInOneHour * hoursInRange) / increments);
};
