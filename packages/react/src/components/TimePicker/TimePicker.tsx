import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react';
import { TimeConstants } from '@fluentui/date-time-utilities';
import { ITimePickerProps, TimeRange } from './TimePicker.types';

// This should be added to TimeConstants
const HOURS_IN_ONE_DAY = 24;

export const TimePicker = ({
  label,
  increments = 30,
  showSeconds = false,
  showDurationIndicator = false,
  allowFreeform = true,
  useHour12 = true,
  onFormatDate,
  timeRange = { start: -1, end: -1 },
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
      const option = addMinutesToDate(defaultTime, increments * index);
      option.setSeconds(0);
      return {
        key: index,
        text: onFormatDate
          ? onFormatDate(option)
          : `${formatTimeString(option, showSeconds, useHour12)}${
              showDurationIndicator && index > 0 ? ` ${getshowDurationIndicator(index, increments)}` : ''
            }`,
      };
    });

  const onChange = React.useCallback(
    (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
      let key = option?.key;
      let updatedUserText = '';
      if (value) {
        if (allowFreeform && !option && !onFormatDate) {
          // Validate only if user did not add onFormatDate
          validateUserInput(value, showSeconds, useHour12);
        }
        updatedUserText = value;
      } else if (option) {
        updatedUserText = option.text;
      }
      setUserText(updatedUserText);
      setSelectedKey(key);
    },
    [allowFreeform], // TODO: not sure if we need this dependency list...
  );

  const validateUserInput = (userInput: string, showSeconds: boolean, useHour12: boolean) => {
    // TODO: REFACTOR THIS PLEASEEE.
    let regexString;
    if (useHour12) {
      regexString = showSeconds
        ? /((1[0-2]|0?[1-9]):([0-5][0-9]):(?:[0-5]\d) ?([AaPp][Mm]))/
        : /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
    } else {
      regexString = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    }

    const regex = new RegExp(regexString);
    if (!regex.test(userInput)) {
      setErrorMessage('FORMAT WAS INCORRECT');
    } else {
      setErrorMessage('');
    }
  };

  const comboBoxRef = React.useRef<IComboBox>(null);

  return (
    <div>
      <ComboBox
        allowFreeform={allowFreeform}
        componentRef={comboBoxRef}
        selectedKey={selectedKey}
        label={label}
        errorMessage={errorMessage}
        options={timePickerOptions}
        onChange={onChange}
        text={userText}
        {...rest}
      />
    </div>
  );
};

const generateDefaultTime = (increments: number, timeRange: TimeRange) => {
  const defaultTime = new Date();
  if (timeRange.start >= 0) {
    defaultTime.setHours(timeRange.start);
  }
  if (!(TimeConstants.MinutesInOneHour % increments)) {
    const minute = roundMinute(defaultTime.getMinutes(), increments);
    if (minute) {
      defaultTime.setMinutes(minute);
    }
  }
  return defaultTime;
};

const roundMinute = (minute: number, increments: number) => {
  if (minute === 0) return minute;
  const times = TimeConstants.MinutesInOneHour / increments;
  let rounded;
  for (let i = 1; i <= times; i++) {
    if (minute > increments * (i - 1) && minute <= increments * i) {
      rounded = increments * i;
      return rounded;
    }
  }
};

const getshowDurationIndicator = (index: number, increments: number) => {
  let showDurationIndicator = '';

  let displayHours = '',
    displayMinutes = '';
  let timeDifferenceInMinutes = index * increments;
  let hours = Math.floor(timeDifferenceInMinutes / 60);
  if (hours >= 1) displayHours = `${hours}h`;
  let minutes = timeDifferenceInMinutes - hours * 60;
  if (minutes >= 1) displayMinutes = `${minutes}m`;

  if (displayHours && displayMinutes) showDurationIndicator = `(${displayHours} ${displayMinutes})`;
  else if (displayHours) showDurationIndicator = `(${displayHours})`;
  else if (displayMinutes) showDurationIndicator = `(${displayMinutes})`;

  return showDurationIndicator;
};

const getDropdownOptionsCount = (increments: number, timeRange: TimeRange) => {
  let hoursInRange = HOURS_IN_ONE_DAY;
  if (timeRange.start >= 0 && timeRange.end >= 0) {
    if (timeRange.start > timeRange.end) hoursInRange = 24 - timeRange.start - timeRange.end;
    else if (timeRange.end > timeRange.start) hoursInRange = timeRange.end - timeRange.start;
  }
  return Math.floor((TimeConstants.MinutesInOneHour * hoursInRange) / increments);
};

// This functions should be moved to date-time-utilities eventually
const addMinutesToDate = (date: Date, minutes: number): Date => {
  const result = new Date(date.getTime());
  result.setTime(result.getTime() + minutes * TimeConstants.MinutesInOneHour * TimeConstants.MillisecondsIn1Sec);
  return result;
};

// This functions needs to be reimplemented later with proper handling of user region/timezone
const formatTimeString = (date: Date, showSeconds: boolean, useHour12: boolean): string => {
  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: useHour12,
  });
};
