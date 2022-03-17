import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import { TextArea } from '../TextArea';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Disabled = () => {
  const disabledId = useId('textarea-disabled');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Label htmlFor={disabledId}>Disabled TextArea.</Label>
      <TextArea id={disabledId} disabled placeholder="Disabled TextArea" />
    </div>
  );
};
