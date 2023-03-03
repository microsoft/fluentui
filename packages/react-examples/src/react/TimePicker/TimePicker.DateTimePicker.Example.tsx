import * as React from 'react';
import { TimePicker } from '@fluentui/react/lib/TimePicker';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Label } from '@fluentui/react/lib/Label';
import { Text } from '@fluentui/react/lib/Text';
import { TimePickerExampleWrapper } from './TimePicker.Example.Wrapper';

export const TimePickerDateTimePickerExample: React.FC = () => {
  const currentDate = new Date('2023-02-01 05:00:00');
  const [datePickerDate, setDatePickerDate] = React.useState<Date>(currentDate);
  const [currentTime, setCurrentTime] = React.useState<Date>();
  const [currentTimeString, setCurrentTimeString] = React.useState<string>('');

  const onSelectDate = React.useCallback((selectedDate: Date) => {
    setDatePickerDate(selectedDate);
  }, []);

  const onDateTimePickerChange = React.useCallback((_, date: Date) => {
    setCurrentTime(date);
  }, []);

  React.useEffect(() => {
    setCurrentTimeString(currentTime ? currentTime.toString() : '<no time selected>');
  }, [currentTime]);

  return (
    <TimePickerExampleWrapper>
      <Label>{'DatePicker and TimePicker combination'}</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
        <DatePicker placeholder="Select a date..." value={datePickerDate} onSelectDate={onSelectDate} />
        <TimePicker dateAnchor={datePickerDate} value={currentTime} onChange={onDateTimePickerChange} />
      </div>
      <Text>{`⚓ Date anchor: ${datePickerDate.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${currentTimeString ? currentTimeString : '<no time selected>'}`}</Text>
    </TimePickerExampleWrapper>
  );
};
