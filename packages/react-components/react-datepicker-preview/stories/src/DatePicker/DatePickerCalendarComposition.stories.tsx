import * as React from 'react';
import { Field, makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

const today = new Date(2030, 0, 15);
const useStyles = makeStyles({
  stack: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, alignItems: 'flex-start' },
});

export const CalendarComposition = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      <Field label="Day only">
        <DatePicker today={today} calendar={{ monthPicker: null }} />
      </Field>
      <Field label="Overlay with a close action">
        <DatePicker
          today={today}
          calendar={{ layout: 'overlay', dayPicker: { closeButton: { 'aria-label': 'Close calendar' } } }}
        />
      </Field>
      <Field label="Month selection">
        <DatePicker today={today} calendar={{ dayPicker: null }} />
      </Field>
    </div>
  );
};
