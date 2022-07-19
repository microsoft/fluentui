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

export const Controlled = () => {
  const textareaId = useId('textarea');
  const styles = useStyles();
  const [value, setValue] = React.useState('initial value');

  const onChange: TextareaProps['onChange'] = (ev, data) => {
    if (data.value.length <= 50) {
      setValue(data.value);
    }
  };

  return (
    <div className={styles.base}>
      <Label htmlFor={textareaId} style={{ display: 'block' }}>
        Controlled Textarea limiting the value to 50 characters.
      </Label>
      <Textarea value={value} onChange={onChange} id={textareaId} />
    </div>
  );
};
