import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field, makeStyles, shorthands, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
  },
  fieldWrapper: {
    ...shorthands.padding(tokens.spacingVerticalMNudge, tokens.spacingHorizontalMNudge),
  },
});

export const Size = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.fieldWrapper}>
        <Field label="Small SearchBox">
          <SearchBox size="small" />
        </Field>
      </div>

      <div className={styles.fieldWrapper}>
        <Field label="Medium SearchBox">
          <SearchBox size="medium" />
        </Field>
      </div>

      <div className={styles.fieldWrapper}>
        <Field label="Large SearchBox">
          <SearchBox size="large" />
        </Field>
      </div>
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
