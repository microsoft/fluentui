import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles } from '@griffel/react';
import { Input } from '../index';

const useStyles = makeStyles({
  root: {
    '& label': { display: 'block', paddingBottom: '2px' },
    '& label:not(:first-child)': { paddingTop: '20px' },
  },
});

export const Size = () => {
  const smallId = useId('input-small');
  const mediumId = useId('input-medium');
  const largeId = useId('input-large');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Label size="small" htmlFor={smallId}>
        Small input
      </Label>
      <Input size="small" id={smallId} />

      <Label size="medium" htmlFor={mediumId}>
        Medium input
      </Label>
      <Input size="medium" id={mediumId} />

      <Label size="large" htmlFor={largeId}>
        Large input
      </Label>
      <Input size="large" id={largeId} />
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'An input can have different sizes.',
    },
  },
};
