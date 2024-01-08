import * as React from 'react';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps } from '@fluentui/react-timepicker-compat';
import story from './TimePickerFreeformCustomParsing.md';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

const formatDateToTimeString = (date: Date) => {
  const localeTimeString = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h12',
  });
  if (date.getHours() < 12) {
    return `Morning: ${localeTimeString}`;
  }
  return `Afternoon: ${localeTimeString}`;
};

export const FreeformCustomParsing = () => {
  const styles = useStyles();

  const [anchor] = React.useState(() => new Date(2023, 1, 1));

  const parseTimeStringToDate: TimePickerProps['parseTimeStringToDate'] = (time: string | undefined) => {
    if (!time) {
      return { date: null };
    }

    const [hours, minutes] = (time.split(' ')[1].match(/\d+/g) ?? []).map(Number);
    const adjustedHours = time.includes('Afternoon: ') && hours !== 12 ? hours + 12 : hours;
    const date = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), adjustedHours, minutes);

    return { date };
  };

  const [selectedTimeText, setSelectedTimeText] = React.useState<string | undefined>(undefined);
  const onTimeChange: TimePickerProps['onTimeChange'] = (_ev, data) => {
    setSelectedTimeText(data.selectedTimeText);
  };

  return (
    <div>
      <Field label="Coffee time" className={styles.root}>
        <TimePicker
          freeform
          dateAnchor={anchor}
          formatDateToTimeString={formatDateToTimeString}
          parseTimeStringToDate={parseTimeStringToDate}
          onTimeChange={onTimeChange}
        />
      </Field>
      {selectedTimeText && <div>Selected time: {selectedTimeText}</div>}
    </div>
  );
};

FreeformCustomParsing.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
