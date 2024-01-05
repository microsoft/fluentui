import * as React from 'react';
import { TimePicker, DatePicker, Label, Text, IStackTokens, Stack, IStackStyles, IComboBox } from '@fluentui/react';

const stackStyles: Partial<IStackStyles> = { root: { width: 500 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

const snapTimeToUpdatedDateAnchor = (datePickerDate: Date, currentTime: Date) => {
  let snappedTime = new Date(currentTime);

  if (currentTime && !isNaN(currentTime.valueOf())) {
    const startAnchor = new Date(datePickerDate);
    const endAnchor = new Date(startAnchor);
    endAnchor.setDate(startAnchor.getDate() + 1);
    if (currentTime < startAnchor || currentTime > endAnchor) {
      snappedTime = new Date(startAnchor);
      snappedTime.setHours(currentTime.getHours());
      snappedTime.setMinutes(currentTime.getMinutes());
      snappedTime.setSeconds(currentTime.getSeconds());
      snappedTime.setMilliseconds(currentTime.getMilliseconds());
    }
  }

  return snappedTime;
};

export const TimePickerDateTimePickerExample: React.FC = () => {
  const currentDate = new Date('2023-02-01 05:00:00');
  const [datePickerDate, setDatePickerDate] = React.useState<Date>(currentDate);
  const [currentTime, setCurrentTime] = React.useState<Date>();

  const onSelectDate = React.useCallback(
    (selectedDate: Date) => {
      setDatePickerDate(selectedDate);
      if (currentTime) {
        const snappedTime = snapTimeToUpdatedDateAnchor(selectedDate, currentTime);
        setCurrentTime(snappedTime);
      }
    },
    [currentTime],
  );

  const onTimePickerChange = React.useCallback((_ev: React.FormEvent<IComboBox>, date: Date) => {
    setCurrentTime(date);
  }, []);

  return (
    <Stack tokens={stackTokens} styles={stackStyles}>
      <Label>{'DatePicker and TimePicker combination'}</Label>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
        <DatePicker
          placeholder="Select a date..."
          value={datePickerDate}
          onSelectDate={onSelectDate}
          ariaLabel="Date picker"
        />
        <TimePicker
          placeholder="Select a time"
          dateAnchor={datePickerDate}
          value={currentTime}
          onChange={onTimePickerChange}
          ariaLabel="Time picker"
        />
      </div>
      <Text>{`⚓ Date anchor: ${datePickerDate.toString()}`}</Text>
      <Text>{`⌚ Selected time: ${currentTime ? currentTime.toString() : '<no time selected>'}`}</Text>
    </Stack>
  );
};
