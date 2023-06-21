import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { makeStyles, useId, Label } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    maxWidth: '300px',
  },
});

export const Placeholder = () => {
  const searchBoxId = useId('searchBox-with-placeholder');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={searchBoxId}>SearchBox with a placeholder</Label>
      <SearchBox placeholder="This is a placeholder" id={searchBoxId} />
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
