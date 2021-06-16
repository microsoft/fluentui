import * as React from 'react';
import { TimeConstants, addMinutes, formatTimeString, ceilMinuteToIncrement } from '@fluentui/date-time-utilities';
import { ComboBox, IComboBox, IComboBoxOption } from '../../ComboBox';
import { ITimePickerProps, ITimeRange } from './TimePicker.types';

// Valid KeyChars for user input
const KEYCHAR_0 = 48;
const KEYCHAR_COLON = 58;
const KEYCHAR_SPACE = 32;
const KEYCHAR_A = 65;
const KEYCHAR_M = 77;
const KEYCHAR_P = 80;

export const TimePicker = ({
  label,
  increments = 30,
  showSeconds = false,
  allowFreeform = true,
  useHour12 = false,
  timeRange = { start: -1, end: -1 },
  onFormatDate,
  onValidateUserInput,
  ...rest
}: ITimePickerProps) => {
  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>(0);
  const [userText, setUserText] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const defaultTime = generateDefaultTime(increments, timeRange);
  const optionsCount = getDropdownOptionsCount(increments, timeRange);
  const timePickerOptions: IComboBoxOption[] = Array(optionsCount)
    .fill(0)
    .map((_, index) => {
      const option = addMinutes(defaultTime, increments * index);
      option.setSeconds(0);
      return {
        key: index,
        text: onFormatDate ? onFormatDate(option) : `${formatTimeString(option, showSeconds, useHour12)}`,
      };
    });

  const onChange = React.useCallback(
    (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
      const validateUserInput = (userInput: string): string => {
        let errorMessageToDisplay = '';
        let regexString;
        if (useHour12) {
          regexString = showSeconds
            ? /((1[0-2]|0?[1-9]):([0-5][0-9]):(?:[0-5]\d) ?([AaPp][Mm]))$/
            : /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$/;
        } else {
          regexString = showSeconds
            ? /([0-9]|0[0-9]|1[0-9]|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/
            : /([0-9]|0[0-9]|1[0-9]|2[0-3]):(?:[0-5]\d)$/;
        }
        if (!regexString.test(userInput)) {
          const useHour12ErrorMessage = useHour12 ? '12-hour' : '24-hour';
          showSeconds
            ? (errorMessageToDisplay =
                `TimePicker format must be valid and in the ${useHour12ErrorMessage} ` + `format hh:mm:ss A.`)
            : (errorMessageToDisplay =
                `TimePicker format must be valid and in the ${useHour12ErrorMessage} ` + `format hh:mm A.`);
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

      setErrorMessage(errorMessageToDisplay);
      setUserText(updatedUserText);
      setSelectedKey(key);
    },
    [allowFreeform, onFormatDate, onValidateUserInput, showSeconds, useHour12],
  );

  const evaluatePressedKey = (event: React.KeyboardEvent<IComboBox>) => {
    if (
      !onFormatDate &&
      // Only permit input of digits, space, colon, A/P/M characters
      !(
        (event.charCode >= KEYCHAR_0 && event.charCode <= KEYCHAR_COLON) ||
        event.charCode === KEYCHAR_SPACE ||
        event.charCode === KEYCHAR_A ||
        event.charCode === KEYCHAR_M ||
        event.charCode === KEYCHAR_P
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <ComboBox
        allowFreeform={allowFreeform}
        selectedKey={selectedKey}
        label={label}
        errorMessage={errorMessage}
        options={timePickerOptions}
        onChange={onChange}
        text={userText}
        //eslint-disable-next-line
        onKeyPress={evaluatePressedKey}
        {...rest}
      />
    </div>
  );
};

const generateDefaultTime = (increments: number, timeRange: ITimeRange) => {
  const defaultTime = new Date();
  if (timeRange.start >= 0) {
    defaultTime.setHours(timeRange.start);
  }
  const ceiledMinute = ceilMinuteToIncrement(defaultTime.getMinutes(), increments);
  if (ceiledMinute) {
    defaultTime.setMinutes(ceiledMinute);
  }
  return defaultTime;
};

const getDropdownOptionsCount = (increments: number, timeRange: ITimeRange) => {
  let hoursInRange = TimeConstants.HoursInOneDay;
  if (timeRange.start >= 0 && timeRange.end >= 0) {
    if (timeRange.start > timeRange.end) {
      hoursInRange = TimeConstants.HoursInOneDay - timeRange.start - timeRange.end;
    } else if (timeRange.end > timeRange.start) {
      hoursInRange = timeRange.end - timeRange.start;
    }
  }
  return Math.floor((TimeConstants.MinutesInOneHour * hoursInRange) / increments);
};
