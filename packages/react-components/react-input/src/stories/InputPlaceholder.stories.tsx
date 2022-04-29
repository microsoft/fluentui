import * as React from 'react';
import { Input } from '../index';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
    maxWidth: '300px',
  },
});

export const Placeholder = () => {
  const placeholderId = useId('input-placeholder');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label htmlFor={placeholderId}>Input With a Placeholder</Label>
      <Input placeholder="This is a placeholder" id={placeholderId} />
    </div>
  );
};

Placeholder.parameters = {
  docs: {
    description: {
      story:
        'An input can have placeholder text. If using the placeholder as a label (which is not ' +
        'recommended for usability), be sure to provide an `aria-label` for screen reader users.',
    },
  },
};
