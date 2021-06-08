import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react';
import { TimeConstants } from '@fluentui/date-time-utilities';

// This should be added to TimeConstants
const HOURS_IN_ONE_DAY = 24;

interface ITimePickerProps {
  /**
   * Label of the component
   */
  label?: string;
  /**
   * Time increments of the options in the dropdown
   */
  increments?: number;
  /**
   * Whether to show seconds in the component
   */
  showSeconds?: boolean;
  /**
   * Whether to show duration indicator for dropdown options;
   */
  durationIndicator?: boolean;
  /**
   * Custom time range to for time options
   */
  // TODO: Decide how this should be handled
  range?: any;
}

const TimePicker = ({ label, increments = 30, showSeconds = false, durationIndicator = false }: ITimePickerProps) => {
  const defaultTime = generateDefaultTime(increments);
  const optionsCount = getDropdownOptionsCount(increments);
  const timePickerOptions: IComboBoxOption[] = Array(optionsCount)
    .fill(0)
    .map((_, index) => ({
      key: index,
      text: `${formatTimeString(addMinutes(defaultTime, increments * index), showSeconds)}${
        durationIndicator && index > 0 ? ` (${getDurationIndicator(index, increments)})` : ''
      }`,
    }));

  const comboBoxRef = React.useRef<IComboBox>(null);

  return (
    <div>
      <ComboBox
        componentRef={comboBoxRef}
        defaultSelectedKey={0}
        label={label}
        allowFreeform
        autoComplete="on"
        options={timePickerOptions}
      />
    </div>
  );
};

export const TimePickerBasicExample: React.FC = () => {
  return <TimePicker label={'TimePicker basic example'} durationIndicator />;
};

const generateDefaultTime = (increments: number) => {
  const now = new Date();
  if (!(TimeConstants.MinutesInOneHour % increments)) {
    const minute = roundMinute(now.getMinutes(), increments);
    if (minute) {
      now.setMinutes(minute);
    }
  }
  return now;
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

const getDurationIndicator = (index: number, increments: number) => {
  let displayHours = '';
  let displayMinutes = '';

  let timeDifferenceInMinutes = index * increments;
  let hours = Math.floor(timeDifferenceInMinutes / 60);
  if (hours >= 1) displayHours = `${hours}h`;
  let minutes = timeDifferenceInMinutes - hours * 60;
  if (minutes >= 1) displayMinutes = `${minutes}m`;

  if (displayHours && displayMinutes) return `${displayHours} ${displayMinutes}`;
  else if (displayHours) return `${displayHours}`;
  else if (displayMinutes) return `${displayMinutes}`;
};

const getDropdownOptionsCount = (increments: number) => {
  return Math.floor((TimeConstants.MinutesInOneHour * HOURS_IN_ONE_DAY) / increments);
};

// This functions should be moved to date-time-utilities eventually
const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date.getTime());
  result.setTime(result.getTime() + minutes * TimeConstants.MinutesInOneHour * TimeConstants.MillisecondsIn1Sec);
  result.setSeconds(0);
  return result;
};

// This functions needs to be reimplemented later with proper handling of user region/timezone
const formatTimeString = (date: Date, showSeconds: boolean): string => {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
  });
};
