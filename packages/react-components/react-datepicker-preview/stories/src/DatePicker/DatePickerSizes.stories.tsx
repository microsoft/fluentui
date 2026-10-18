import * as React from 'react';
import { Field, makeStyles, tokens } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

const useStyles = makeStyles({
  stack: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM, alignItems: 'flex-start' },
});

export const Sizes = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.stack}>
      {(['small', 'medium', 'large'] as const).map(size => (
        <Field key={size} label={size}>
          <DatePicker today={new Date(2030, 0, 15)} size={size} />
        </Field>
      ))}
    </div>
  );
};
