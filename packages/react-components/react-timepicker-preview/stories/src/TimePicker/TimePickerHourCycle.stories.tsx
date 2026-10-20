import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, tokens } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-preview';
import story from './TimePickerHourCycle.md';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXL,
    maxWidth: '300px',
  },
});

export const HourCycle = (): JSXElement => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Field label="24-hour format (h23)">
        <TimePicker freeform hourCycle="h23" />
      </Field>
      <Field label="12-hour format (h12)">
        <TimePicker freeform hourCycle="h12" />
      </Field>
      <Field label="With seconds">
        <TimePicker freeform hourCycle="h23" showSeconds increment={1} startHour={9} endHour={10} />
      </Field>
    </div>
  );
};

HourCycle.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
