import * as React from 'react';
import { Field, makeStyles, SearchBox, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldWrapper: {
    padding: `${tokens.spacingVerticalMNudge} ${tokens.spacingHorizontalMNudge}`,
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Field className={styles.fieldWrapper} label="Small SearchBox">
        <SearchBox size="small" />
      </Field>

      <Field className={styles.fieldWrapper} label="Medium SearchBox">
        <SearchBox size="medium" />
      </Field>

      <Field className={styles.fieldWrapper} label="Large SearchBox">
        <SearchBox size="large" />
      </Field>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A SearchBox can have different sizes.',
    },
  },
};
