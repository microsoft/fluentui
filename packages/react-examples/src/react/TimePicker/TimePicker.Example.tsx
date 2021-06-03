import * as React from 'react';
import { ComboBox, IComboBox, IComboBoxOption } from '@fluentui/react';
import { TimeConstants } from '@fluentui/date-time-utilities';

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

// TODO: Make sure how many options we are going to show
const OPTION_NUMBER = 10;

// This functions should be moved to date-time-utilities eventually
const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date.getTime());
  result.setTime(result.getTime() + minutes * TimeConstants.MinutesInOneHour * TimeConstants.MillisecondsIn1Sec);
  return result;
};

// This functions needs to be reimplemented later with proper handling of user region/timezone
const formatTimeString = (date: Date): string => {
  return date.toLocaleTimeString();
};

const TimePicker = ({ label, increments = 30 }: ITimePickerProps) => {
  const now = new Date();

  const timePickerOptions: IComboBoxOption[] = Array(OPTION_NUMBER)
    .fill(0)
    .map((_, index) => ({
      key: index,
      text: formatTimeString(addMinutes(now, increments * index)),
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
  return <TimePicker label={'TimePicker basic example'} />;
};
