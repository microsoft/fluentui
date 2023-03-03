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
  const defaultTimePickerPlaceholder = `Enter or select a time`;
  const timeOutOfBoundsErrorMessage = `Please enter a time within the range of {0} and {1}`;

  return {
    invalidInputErrorMessage,
    defaultTimePickerPlaceholder,
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
  onGetErrorMessage,
  placeholder = strings.defaultTimePickerPlaceholder,
  ...rest
}: ITimePickerProps) => {
  const [comboBoxText, setComboBoxText] = React.useState<string>('');
  const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>();
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const fallbackDateAnchor = useConst(new Date());

  const [dateStartAnchor, setDateStartAnchor] = React.useState<Date>(dateAnchor || defaultValue || new Date());
  const [dateEndAnchor, setDateEndAnchor] = React.useState<Date>(dateAnchor || defaultValue || new Date());

  const [selectedTime, setSelectedTime] = useControllableValue(value, defaultValue, (_ev, newValue) =>
    onChange?.(undefined, newValue),
  );

  const optionsCount = getDropdownOptionsCount(increments, timeRange);

  const internalDateAnchor = React.useMemo(() => dateAnchor || value || defaultValue || fallbackDateAnchor, [
    dateAnchor,
    defaultValue,
    value,
    fallbackDateAnchor,
  ]);

  React.useEffect(() => {
    const clampedStartAnchor = new Date(internalDateAnchor);
    const clampedEndAnchor = new Date(clampedStartAnchor);

    if (timeRange) {
      const clampedTimeRange = clampTimeRange(timeRange);
      if (clampedStartAnchor.getHours() !== clampedTimeRange.start) {
        clampedStartAnchor.setHours(clampedTimeRange.start);
        clampedStartAnchor.setMinutes(0);
      }
      if (clampedEndAnchor.getHours() !== clampedTimeRange.end) {
        clampedEndAnchor.setHours(clampedTimeRange.end);
        clampedEndAnchor.setMinutes(0);
      }
    } else {
      clampedEndAnchor.setDate(clampedStartAnchor.getDate() + 1);
    }

    clampedStartAnchor.setMinutes(0);
    clampedStartAnchor.setSeconds(0);

    clampedEndAnchor.setMinutes(0);
    clampedEndAnchor.setSeconds(0);

    setDateStartAnchor(ceilMinuteToIncrement(clampedStartAnchor, increments));
    setDateEndAnchor(ceilMinuteToIncrement(clampedEndAnchor, increments));
  }, [internalDateAnchor, increments, timeRange]);

  React.useEffect(() => {
    if (selectedTime && !isNaN(selectedTime.valueOf())) {
      if (selectedTime < dateStartAnchor || selectedTime > dateEndAnchor) {
        const updatedCurrentTime = new Date(dateStartAnchor);
        updatedCurrentTime.setHours(selectedTime.getHours());
        updatedCurrentTime.setMinutes(selectedTime.getMinutes());
        updatedCurrentTime.setSeconds(selectedTime.getSeconds());
        updatedCurrentTime.setMilliseconds(selectedTime.getMilliseconds());

        setSelectedTime(updatedCurrentTime);
      }
    }
  }, [selectedTime, dateStartAnchor, dateEndAnchor, setSelectedTime]);

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
      };
    });
  }, [dateStartAnchor, increments, optionsCount, showSeconds, onFormatDate, useHour12]);

  const getComboBoxOptionInDropdown = React.useCallback(
    (optionKey: string) => timePickerOptions.find((option: IComboBoxOption) => option.key === optionKey),
    [timePickerOptions],
  );

  React.useEffect(() => {
    if (selectedTime && !isNaN(selectedTime.valueOf())) {
      const formattedTimeString = formatTimeString(selectedTime, showSeconds, useHour12);
      const option = getComboBoxOptionInDropdown(formattedTimeString);
      setSelectedKey(option?.key);
      setComboBoxText(option ? option.text : formattedTimeString);
    }
  }, [selectedTime, getComboBoxOptionInDropdown, onFormatDate, showSeconds, useHour12]);

  const onInputChange = React.useCallback(
    (_: React.FormEvent<IComboBox>, option?: IComboBoxOption, _index?: number, input?: string): void => {
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
        } else if (timeRange) {
          const optionDate: Date = getDateFromTimeSelection(useHour12, dateStartAnchor, userInput);
          if (optionDate < dateStartAnchor || optionDate > dateEndAnchor) {
            errorMessageToDisplay = format(
              strings.timeOutOfBoundsErrorMessage,
              dateStartAnchor.toString(),
              dateEndAnchor,
              toString(),
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

      if (onGetErrorMessage) {
        onGetErrorMessage(errorMessageToDisplay);
      }

      if (errorMessageToDisplay || (input !== undefined && !input.length)) {
        const timeSelection = input || option?.text || '';
        setSelectedKey(option?.key as string);
        setComboBoxText(timeSelection);
        setSelectedTime(errorMessageToDisplay ? new Date('invalid') : undefined);
      } else {
        const timeSelection = (option?.key as string) || input || '';
        const updatedTime = getDateFromTimeSelection(useHour12, dateStartAnchor, timeSelection);
        setSelectedTime(updatedTime);
      }

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
      onGetErrorMessage,
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
      placeholder={placeholder}
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
