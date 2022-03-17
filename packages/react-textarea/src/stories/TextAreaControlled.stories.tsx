import * as React from 'react';
import { TextArea } from '../TextArea';
import { useId } from '@fluentui/react-utilities';
import { Label } from '@fluentui/react-label';
import type { TextAreaProps } from '../TextArea';
import { makeStyles, shorthands } from '@griffel/react';

const useStyles = makeStyles({
  container: {
    '> div': { ...shorthands.padding('20px') },
    '& label': { display: 'block', marginBottom: '10px' },
  },
});

export const Controlled = () => {
  const textareaId = useId('textarea');
  const styles = useStyles();
  const [value, setValue] = React.useState('initial value');

  const onChange: TextAreaProps['onChange'] = (ev, data) => {
    if (data.value.length <= 50) {
      setValue(data.value);
    }
  };

  return (
    <div className={styles.container}>
      <Label htmlFor={textareaId} style={{ display: 'block' }}>
        Controlled textarea limiting the value to 50 characters.
      </Label>
      <TextArea value={value} onChange={onChange} id={textareaId} />
    </div>
  );
};
