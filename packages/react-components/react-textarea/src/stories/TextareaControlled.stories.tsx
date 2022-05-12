import * as React from 'react';
import { Textarea } from '../Textarea';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import type { TextareaProps } from '../Textarea';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px'),
    '& > div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('10px'), ...shorthands.padding('10px') },
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
    <div className={styles.container}>
      <Label htmlFor={textareaId} style={{ display: 'block' }}>
        Controlled Textarea limiting the value to 50 characters.
      </Label>
      <Textarea value={value} onChange={onChange} id={textareaId} />
    </div>
  );
};
