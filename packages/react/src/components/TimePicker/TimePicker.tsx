import * as React from 'react';
import { KeyCodes } from '../../Utilities';
import { TimeConstants, addMinutes, formatTimeString, ceilMinuteToIncrement } from '@fluentui/date-time-utilities';
import { ComboBox } from '../../ComboBox';
import type { IComboBox, IComboBoxOption } from '../../ComboBox';
import type { ITimePickerProps, ITimeRange, ITimePickerStrings } from './TimePicker.types';

const REGEX_SHOW_SECONDS_HOUR_12 = /^((1[0-2]|0?[1-9]):([0-5][0-9]):([0-5][0-9])\s([AaPp][Mm]))$/;
const REGEX_HIDE_SECONDS_HOUR_12 = /^((1[0-2]|0?[1-9]):[0-5][0-9]\s([AaPp][Mm]))$/;
const REGEX_SHOW_SECONDS_HOUR_24 = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
const REGEX_HIDE_SECONDS_HOUR_24 = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const TIME_LOWER_BOUND = 0;
const TIME_UPPER_BOUND = 23;

const getDefaultStrings = (useHour12: boolean, showSeconds: boolean): ITimePickerStrings => {
  const hourUnits = useHour12 ? '12-hour' : '24-hour';
  const timeFormat = `hh:mm${showSeconds ? ':ss' : ''}${useHour12 ? ' AP' : ''}`;
  const errorMessageToDisplay = `Enter a valid time in the ${hourUnits} format: ${timeFormat}`;

  return {
    invalidInputErrorMessage: errorMessageToDisplay,
  };
};

export const TimePicker: React.FunctionComponent<ITimePickerProps> = ({
  label,
  increments = 30,
  showSeconds = false,
  allowFreeform = true,
  useHour12 = false,
  timeRange,
  strings = getDefaultStrings(useHour12, showSeconds),
  defaultValue,
  onSelectTime,
  onFormatDate,
  onValidateUserInput,
  onChange,
  ...rest
}: ITimePickerProps) => {
  const [userText, setUserText] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const optionsCount = getDropdownOptionsCount(increments, timeRange);

  const defaultTime: Date = React.useMemo(() => generateDefaultTime(increments, timeRange, defaultValue), [
    increments,
    timeRange,
    defaultValue,
  ]);

  const timePickerOptions: IComboBoxOption[] = React.useMemo(() => {
    const optionsList = Array(optionsCount);
    for (let i = 0; i < optionsCount; i++) {
      optionsList[i] = 0;
    }

    return optionsList.map((_, index) => {
      const option = addMinutes(defaultTime, increments * index);
      option.setSeconds(0);
      const optionText = onFormatDate ? onFormatDate(option) : formatTimeString(option, showSeconds, useHour12);
      return {
        key: optionText,
        text: optionText,
      };
    });
  }, [timeRange, increments, optionsCount, showSeconds, onFormatDate, useHour12]);

  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>(timePickerOptions[0].key);

  const onInputChange = React.useCallback(
    (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
      if (onChange) {
        onChange(event, option, index, value);
      }

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
        }
        return errorMessageToDisplay;
      };

      const key = option?.key;
      let updatedUserText = '';
      let errorMessageToDisplay = '';
      if (value) {
        if (allowFreeform && !option) {
          if (!onFormatDate) {
            // Validate only if user did not add onFormatDate
            errorMessageToDisplay = validateUserInput(value);
          } else {
            // Use user provided validation if onFormatDate is provided
            if (onValidateUserInput) {
              errorMessageToDisplay = onValidateUserInput(value);
            }
          }
        }
        updatedUserText = value;
      } else if (option) {
        updatedUserText = option.text;
      }

      if (onSelectTime) {
        const selectedTime = value ? value : option ? option.text : '';
        const date = getDateFromSelection(showSeconds, useHour12, defaultTime, selectedTime);
        onSelectTime(date);
      }

      setErrorMessage(errorMessageToDisplay);
      setUserText(updatedUserText);
      setSelectedKey(key);
    },
    [
      allowFreeform,
      onFormatDate,
      onValidateUserInput,
      showSeconds,
      useHour12,
      onChange,
      onSelectTime,
      strings.invalidInputErrorMessage,
    ],
  );

  const evaluatePressedKey = (event: React.KeyboardEvent<IComboBox>) => {
    if (
      !onFormatDate &&
      // Only permit input of digits, space, colon, A/P/M characters
      !(
        (event.charCode >= KeyCodes.zero && event.charCode <= KeyCodes.colon) ||
        event.charCode === KeyCodes.space ||
        event.charCode === KeyCodes.a ||
        event.charCode === KeyCodes.m ||
        event.charCode === KeyCodes.p
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
      text={userText}
      //eslint-disable-next-line
      onKeyPress={evaluatePressedKey}
    />
  );
};
TimePicker.displayName = 'TimePicker';

const clampTimeRange = (timeRange: ITimeRange): ITimeRange => {
  return {
    start: Math.min(Math.max(timeRange.start, TIME_LOWER_BOUND), TIME_UPPER_BOUND),
    end: Math.min(Math.max(timeRange.end, TIME_LOWER_BOUND), TIME_UPPER_BOUND),
  };
};

const getDateFromSelection = (showSeconds: boolean, useHour12: boolean, defaultTime: Date, selectedTime: string) => {
  const splitValue = selectedTime.split(':');
  let hours = +splitValue[0];
  let minutes;
  let seconds = 0;
  let ap;
  if (showSeconds) {
    minutes = +splitValue[1];
    seconds = +splitValue[2].split(' ')[0];
    if (useHour12) {
      ap = splitValue[2].split(' ')[1];
    }
  } else {
    minutes = +splitValue[1].split(' ')[0];
    if (useHour12) {
      ap = splitValue[1].split(' ')[1];
    }
  }

  if (useHour12 && ap && ap.toLowerCase() === 'pm' && hours !== 12) {
    hours += TimeConstants.OffsetTo24HourFormat;
  }

  let hoursOffset;
  if (useHour12 && defaultTime.getHours() >= hours) {
    hoursOffset = TimeConstants.HoursInOneDay - defaultTime.getHours() + hours;
  } else {
    hoursOffset = Math.abs(defaultTime.getHours() - hours);
  }

  const offset =
    TimeConstants.MillisecondsIn1Sec * TimeConstants.MinutesInOneHour * hoursOffset * TimeConstants.SecondsInOneHour +
    seconds;

  const date = new Date(defaultTime.getTime() + offset);
  date.setMinutes(minutes);
  date.setSeconds(defaultTime.getSeconds());

  return date;
};

const generateDefaultTime = (increments: number, timeRange: ITimeRange | undefined, defaultValue?: Date) => {
  const newDefaultTime = defaultValue ? defaultValue : new Date();
  if (timeRange) {
    const clampedTimeRange = clampTimeRange(timeRange);
    newDefaultTime.setHours(clampedTimeRange.start);
  }

  return ceilMinuteToIncrement(newDefaultTime, increments);
};

const getDropdownOptionsCount = (increments: number, timeRange: ITimeRange | undefined) => {
  let hoursInRange = TimeConstants.HoursInOneDay;
  if (timeRange) {
    const clampedTimeRange = clampTimeRange(timeRange);
    if (clampedTimeRange.start > clampedTimeRange.end) {
      hoursInRange = TimeConstants.HoursInOneDay - timeRange.start - timeRange.end;
    } else if (timeRange.end > timeRange.start) {
      hoursInRange = timeRange.end - timeRange.start;
    }
  }
  return Math.floor((TimeConstants.MinutesInOneHour * hoursInRange) / increments);
};
