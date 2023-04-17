import * as React from 'react';
import { TimePicker, DatePicker, Label, Text, IStackTokens, Stack, IStackStyles, IComboBox } from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { width: 500 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

export const TimePickerDateTimePickerExample: React.FC = () => {
  const currentDate = new Date('2023-02-01 05:00:00');
  const [datePickerDate, setDatePickerDate] = React.useState<Date>(currentDate);
  const [currentTime, setCurrentTime] = React.useState<Date>();
  const [currentTimeString, setCurrentTimeString] = React.useState<string>('');

  const onSelectDate = React.useCallback((selectedDate: Date) => {
    setDatePickerDate(selectedDate);
  }, []);

  const onDateTimePickerChange = React.useCallback((_ev: React.FormEvent<IComboBox>, date: Date) => {
    setCurrentTime(date);
  }, []);

  React.useEffect(() => {
    setCurrentTimeString(currentTime ? currentTime.toString() : '<no time selected>');
  }, [currentTime]);

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <Label>{'DatePicker and TimePicker combination'}</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
        <DatePicker placeholder="Select a date..." value={datePickerDate} onSelectDate={onSelectDate} />
        <TimePicker dateAnchor={datePickerDate} value={currentTime} onChange={onDateTimePickerChange} />
      </div>
      <Text>{`⚓ Date anchor: ${datePickerDate.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${currentTimeString ? currentTimeString : '<no time selected>'}`}</Text>
    </Stack>
  );
};
