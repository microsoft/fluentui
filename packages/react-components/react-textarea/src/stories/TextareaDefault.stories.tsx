import * as React from 'react';
import { useId } from '@fluentui/react-utilities';
import { Textarea, TextareaProps } from '../index';
import { Label } from '@fluentui/react-label';
import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  base: {
    display: 'flex',
    flexDirection: 'column',
    '& > label': {
      marginBottom: tokens.spacingVerticalMNudge,
    },
  },
});

export const Default = (props: Partial<TextareaProps>) => {
  const textareaId = useId('textarea');
  const styles = useStyles();

  return (
    <div className={styles.base}>
      <Label htmlFor={textareaId}>Default Textarea</Label>
      <Textarea id={textareaId} {...props} />
    </div>
  );
};
