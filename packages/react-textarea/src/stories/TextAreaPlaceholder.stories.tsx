import * as React from 'react';
import { TextArea } from '../TextArea';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Placeholder = () => {
  const styles = useStyles();
  const textareaId = useId('textarea');
  return (
    <div className={styles.container}>
      <Label htmlFor={textareaId}>TextArea with placeholder.</Label>
      <TextArea id={textareaId} placeholder="type here..." />
    </div>
  );
};
