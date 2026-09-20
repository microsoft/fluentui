import * as React from 'react';

import { Field, makeStyles, tokens } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-modern-components-preview/textarea';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalMNudge,
  },
});

export const Size = (): React.ReactNode => {
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Field size="small" label="Small Textarea">
        <Textarea />
      </Field>

      <Field size="medium" label="Medium Textarea">
        <Textarea />
      </Field>

      <Field size="large" label="Large Textarea">
        <Textarea />
      </Field>
    </div>
  );
};
