import * as React from 'react';
import { makeStyles, tokens, useId, Label, Textarea } from '@fluentui/react-components';
import type { TextareaProps } from '@fluentui/react-components';

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
