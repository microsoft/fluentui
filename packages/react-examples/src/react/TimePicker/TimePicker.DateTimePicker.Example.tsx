import * as React from 'react';
import { TimePicker } from '@fluentui/react/lib/TimePicker';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Label } from '@fluentui/react/lib/Label';
import { Text } from '@fluentui/react/lib/Text';

export const TimePickerDateTimePickerExample: React.FC = () => {
  const [datePickerDate, setDatePickerDate] = React.useState<Date>();
  const [currentTime, setCurrentTime] = React.useState<Date>();
  const [currentTimeString, setCurrentTimeString] = React.useState<string>('');

  const onSelectDate = React.useCallback((selectedDate: Date) => {
    setDatePickerDate(selectedDate);
  }, []);

  const onDateTimePickerChange = React.useCallback((date: Date) => {
    setCurrentTime(date);
  }, []);

  React.useEffect(() => {
    if (currentTime) {
      setCurrentTimeString(currentTime.toString());
    }
  }, [currentTime]);

  React.useEffect(() => {
    if (currentTime && datePickerDate) {
      const earlyDatePickerDate = new Date(datePickerDate);
      const laterDatePickerDate = new Date(datePickerDate);
      laterDatePickerDate.setDate(datePickerDate.getDate() + 1);

      const updatedCurrentTime = new Date(currentTime);

      if (updatedCurrentTime < earlyDatePickerDate || updatedCurrentTime > laterDatePickerDate) {
        updatedCurrentTime.setDate(earlyDatePickerDate.getDate());
        setCurrentTime(updatedCurrentTime);
      }
    }
  }, [currentTime, datePickerDate]);

  return (
    <>
      <div style={{ paddingTop: '20px', width: '500px' }}>
        <Label>{'DatePicker and TimePicker combination'}</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
          <DatePicker
            placeholder="Select a date..."
            value={datePickerDate}
            onSelectDate={onSelectDate}
            minDate={new Date()}
          />
          <TimePicker dateAnchor={datePickerDate} value={currentTime} onChange={onDateTimePickerChange} />
        </div>
        <Text>{`TimePicker selected time: ${currentTimeString ? currentTimeString : '<no time selected>'}`}</Text>
      </div>
    </>
  );
};
