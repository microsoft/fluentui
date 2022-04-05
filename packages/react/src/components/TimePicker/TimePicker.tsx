import * as React from 'react';
import { useConst } from '@fluentui/react-hooks';
import { KeyCodes } from '../../Utilities';
import {
  TimeConstants,
  addMinutes,
  formatTimeString,
  ceilMinuteToIncrement,
  getDateFromTimeSelection,
} from '@fluentui/date-time-utilities';
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
  onChange,
  onFormatDate,
  onValidateUserInput,
  ...rest
}: ITimePickerProps) => {
  const [userText, setUserText] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const optionsCount = getDropdownOptionsCount(increments, timeRange);

  const initialValue = useConst(defaultValue || new Date());
  const baseDate: Date = React.useMemo(() => generateBaseDate(increments, timeRange, initialValue), [
    increments,
    timeRange,
    initialValue,
  ]);

  const timePickerOptions: IComboBoxOption[] = React.useMemo(() => {
    const optionsList = Array(optionsCount);
    for (let i = 0; i < optionsCount; i++) {
      optionsList[i] = 0;
    }

    return optionsList.map((_, index) => {
      const option = addMinutes(baseDate, increments * index);
      option.setSeconds(0);
      const optionText = onFormatDate ? onFormatDate(option) : formatTimeString(option, showSeconds, useHour12);
      return {
        key: optionText,
        text: optionText,
      };
    });
  }, [baseDate, increments, optionsCount, showSeconds, onFormatDate, useHour12]);

  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>(timePickerOptions[0].key);

  const onInputChange = React.useCallback(
    (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
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

      if (onChange && !errorMessageToDisplay) {
        const selectedTime = value || option?.text || '';
        const date = getDateFromTimeSelection(useHour12, baseDate, selectedTime);
        onChange(event, date);
      }

      setErrorMessage(errorMessageToDisplay);
      setUserText(updatedUserText);
      setSelectedKey(key);
    },
    [
      baseDate,
      allowFreeform,
      onChange,
      onFormatDate,
      onValidateUserInput,
      showSeconds,
      useHour12,
      strings.invalidInputErrorMessage,
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

const generateBaseDate = (increments: number, timeRange: ITimeRange | undefined, baseDate: Date) => {
  if (timeRange) {
    const clampedTimeRange = clampTimeRange(timeRange);
    baseDate.setHours(clampedTimeRange.start);
  }

  return ceilMinuteToIncrement(baseDate, increments);
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
