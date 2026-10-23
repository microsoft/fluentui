import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, tokens } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-preview';
import story from './TimePickerTimeRange.md';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXL,
    maxWidth: '300px',
  },
});

export const TimeRange = (): JSXElement => {
  const styles = useStyles();
  const [overnightAnchor] = React.useState(() => new Date(2023, 10, 25));

  return (
    <div className={styles.root}>
      <Field label="Business hours, every 15 minutes">
        <TimePicker startHour={9} endHour={17} increment={15} />
      </Field>
      <Field label="Night shift (crosses midnight)">
        <TimePicker startHour={22} endHour={6} increment={60} dateAnchor={overnightAnchor} />
      </Field>
    </div>
  );
};

TimeRange.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
