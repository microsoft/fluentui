import * as React from 'react';
import { TimePicker } from '@fluentui/react/lib/TimePicker';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Label } from '@fluentui/react/lib/Label';
import { Text } from '@fluentui/react/lib/Text';

export const TimePickerDateTimePickerExample: React.FC = () => {
  const [datePickerDate, setDatePickerDate] = React.useState<Date>();
  const [currentTimeString, setCurrentTimeString] = React.useState<string>('');

  const onSelectDate = React.useCallback((selectedDate: Date) => {
    setDatePickerDate(selectedDate);
  }, []);

  const onDateTimePickerChange = React.useCallback((boi: Date) => {
    setCurrentTimeString(boi.toString());
  }, []);

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
          <TimePicker dateAnchor={datePickerDate} useComboBoxAsMenuWidth onChange={onDateTimePickerChange} />
        </div>
        <Text>{`TimePicker selected time: ${currentTimeString ? currentTimeString : '<no time selected>'}`}</Text>
      </div>
    </>
  );
};
