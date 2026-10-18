import * as React from 'react';
import { Field, makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';
import type { DatePickerProps } from '@fluentui/react-datepicker-preview';

const useStyles = makeStyles({
  stack: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, alignItems: 'flex-start' },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();
  const appearances: DatePickerProps['appearance'][] = ['outline', 'underline', 'filled-lighter', 'filled-darker'];
  return (
    <div className={styles.stack}>
      {appearances.map(appearance => (
        <Field key={appearance} label={appearance}>
          <DatePicker today={new Date(2030, 0, 15)} appearance={appearance} />
        </Field>
      ))}
    </div>
  );
};
