import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    maxWidth: '300px',
  },
});

export const Placeholder = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Field label="SearchBox with a placeholder">
        <SearchBox placeholder="This is a placeholder" />
      </Field>
    </div>
  );
};

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'A SearchBox can have placeholder text. If using the placeholder as a label (which is not ' +
        'recommended for usability), be sure to provide an `aria-label` for screen reader users.',
    },
  },
};
