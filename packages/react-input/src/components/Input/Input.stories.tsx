import * as React from 'react';
import { makeStyles } from '@fluentui/react-make-styles';
import { Input } from './Input';
import { useId } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '300px',
  },
});

export const InputExamples = () => {
  const styles = useStyles();
  const inputId1 = useId();
  return (
    <div className={styles.container}>
      <Input />
      <div>
        <label htmlFor={inputId1}>with a label</label>
        <Input id={inputId1} />
      </div>
    </div>
  );
};

export default {
  title: 'Components/Input',
  component: Input,
};
