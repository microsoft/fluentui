import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: 'flex',
    flexDirection: 'column',
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: '400px',
  },
});

export const Disabled = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Field label="Disabled SearchBox">
        <SearchBox defaultValue="disabled value" />
      </Field>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'A SearchBox can be disabled.',
    },
  },
};
