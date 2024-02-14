import * as React from 'react';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

export const Default = (props: Partial<TimePickerProps>) => {
  const [anchor] = React.useState(() => new Date(2023, 1, 1));
  const formatDateToTimeString = (date: Date) => {
    const localeTimeString = date.toLocaleTimeString([], {
      hour: 'numeric',
      hourCycle: 'h23',
      minute: '2-digit',
    });
    if (date.getHours() < 12) {
      return `Morning: ${localeTimeString}`;
    }
    if (date.getHours() === 12) {
      return `noon: ${localeTimeString}`;
    }
    return `Afternoon: ${localeTimeString}`;
  };

  const parseTimeStringToDate: TimePickerProps['parseTimeStringToDate'] = (time: string | undefined) => {
    if (!time) {
      return { date: null };
    }

    const [hours, minutes] = (time.split(' ')[1].match(/\d+/g) ?? []).map(Number);
    const date = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), hours, minutes);

    return { date };
  };

  const [selectedTimeText, setSelectedTimeText] = React.useState<string | undefined>(undefined);
  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTimeText(data.selectedTimeText);
  };
  return (
    <div>
      <TimePicker
        freeform
        dateAnchor={anchor}
        startHour={9}
        endHour={14}
        increment={60}
        hourCycle="h23"
        formatDateToTimeString={formatDateToTimeString}
        parseTimeStringToDate={parseTimeStringToDate}
        onTimeChange={onTimeChange}
      />
      {<div id="selected-time-text">{selectedTimeText}</div>}
    </div>
  );
};
