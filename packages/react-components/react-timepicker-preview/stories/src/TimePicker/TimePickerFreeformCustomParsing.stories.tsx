import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import type { TimePickerProps } from '@fluentui/react-timepicker-preview';
import { TimePicker } from '@fluentui/react-timepicker-preview';
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

export const FreeformCustomParsing = (): JSXElement => {
  const styles = useStyles();

  const [anchor] = React.useState(() => new Date(2023, 1, 1));

  const parseTimeStringToDate: TimePickerProps['parseTimeStringToDate'] = (time: string | undefined) => {
    const match = time?.match(/^(Morning|Afternoon): (\d{1,2}):(\d{2})/);
    if (!match) {
      return { date: null, errorType: 'invalid-input' };
    }

    const [, dayPart, hours, minutes] = match;
    const adjustedHours = dayPart === 'Afternoon' && +hours !== 12 ? +hours + 12 : +hours;
    const date = new Date(anchor.getFullYear(), anchor.getMonth(), anchor.getDate(), adjustedHours, +minutes);

    return { date };
  };

  const [displayValue, setDisplayValue] = React.useState<string | undefined>(undefined);
  const onChange: TimePickerProps['onChange'] = (_ev, data) => {
    setDisplayValue(data.errorType ? undefined : data.displayValue);
  };

  return (
    <div>
      <Field label="Coffee time" className={styles.root}>
        <TimePicker
          freeform
          dateAnchor={anchor}
          formatDateToTimeString={formatDateToTimeString}
          parseTimeStringToDate={parseTimeStringToDate}
          onChange={onChange}
        />
      </Field>
      {displayValue && <div>Value: {displayValue}</div>}
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
