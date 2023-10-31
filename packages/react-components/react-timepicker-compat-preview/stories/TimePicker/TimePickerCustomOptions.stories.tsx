import * as React from 'react';
import { Option, OptionGroup, Field, makeStyles } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-compat-preview';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
  groupLabel: { fontStyle: 'italic' },
});

export const CustomOptions = () => {
  const styles = useStyles();
  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker startHour={9} endHour={15} hourCycle="h11">
        {({ options }) => {
          const morningOptions = options.filter(option => option.text.endsWith('am'));
          const afternoonOptions = options.filter(option => option.text.endsWith('pm'));
          return (
            <>
              <OptionGroup label={{ children: 'morning', className: styles.groupLabel }}>
                {morningOptions.map(date => (
                  <Option key={date.key} value={date.key} disabled={date.text === '11:00 am'}>
                    {date.text}
                  </Option>
                ))}
              </OptionGroup>
              <OptionGroup label={{ children: 'afternoon', className: styles.groupLabel }}>
                {afternoonOptions.map(date => (
                  <Option key={date.key} value={date.key}>
                    {date.text}
                  </Option>
                ))}
              </OptionGroup>
            </>
          );
        }}
      </TimePicker>
    </Field>
  );
};

CustomOptions.parameters = {
  docs: {
    description: {
      story: 'Time options in dropdown can be customized by passing a function as the children of TimePicker.',
    },
  },
};
