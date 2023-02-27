import * as React from 'react';
import { ITimeRange, TimePicker } from '@fluentui/react/lib/TimePicker';
import { IStackTokens, Stack, IStackStyles } from '@fluentui/react/lib/Stack';
import { IComboBoxStyles } from '@fluentui/react/lib/ComboBox';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Label } from '@fluentui/react/lib/Label';
import { Text } from '@fluentui/react/lib/Text';

const stackStyles: Partial<IStackStyles> = { root: { maxWidth: 300 } };
const stackTokens: IStackTokens = { childrenGap: 20 };

const timePickerStyles: Partial<IComboBoxStyles> = {
  optionsContainerWrapper: {
    height: '500px',
  },
  root: {
    width: '50%',
  },
};

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
      <div style={{ paddingTop: '20px', maxWidth: '50%' }}>
        <Label>{'DatePicker and TimePicker combination'}</Label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '3px' }}>
          <DatePicker
            placeholder="Select a date..."
            value={datePickerDate}
            onSelectDate={onSelectDate}
            minDate={new Date()}
          />
          <TimePicker dateAnchor={datePickerDate} useComboBoxAsMenuWidth onTimeChange={onDateTimePickerChange} />
        </div>
        <Text>{`TimePicker selected time: ${currentTimeString ? currentTimeString : '<no time selected>'}`}</Text>
      </div>
    </>
  );
};
