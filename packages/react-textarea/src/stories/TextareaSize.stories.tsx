import * as React from 'react';
import { makeStyles, shorthands } from '@griffel/react';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { Textarea } from '../Textarea';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    '& > div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('10px'), ...shorthands.padding('10px') },
  },
});

export const Size = () => {
  const smallId = useId('textarea-small');
  const mediumId = useId('textarea-medium');
  const largeId = useId('textarea-large');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div>
        <Label htmlFor={smallId}>Small Textarea.</Label>
        <Textarea id={smallId} size="small" />
      </div>
      <div>
        <Label htmlFor={mediumId}>Medium Textarea.</Label>
        <Textarea id={mediumId} size="medium" />
      </div>
      <div>
        <Label htmlFor={largeId}>Large Textarea.</Label>
        <Textarea id={largeId} size="large" />
      </div>
    </div>
  );
};
