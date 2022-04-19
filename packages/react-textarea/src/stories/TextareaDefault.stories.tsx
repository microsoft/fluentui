import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Textarea, TextareaProps } from '../index';
import { Label } from '@fluentui/react-label';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    '& > div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('10px'), ...shorthands.padding('10px') },
  },
});

export const Default = (props: Partial<TextareaProps>) => {
  const textareaId = useId('textarea');
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Label htmlFor={textareaId}>Default Textarea</Label>
      <Textarea id={textareaId} {...props} />
    </div>
  );
};
