import * as React from 'react';
import { Label, makeStyles, Radio, RadioGroup, tokens, useId } from '@fluentui/react-components';

const useStyles = makeStyles({
  field: {
    display: 'grid',
    gridRowGap: tokens.spacingVerticalS,
  },
});

export const ControlledValue = () => {
  const [value, setValue] = React.useState('banana');
  const styles = useStyles();
  const labelId = useId('label');
  return (
    <div className={styles.field}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup value={value} onChange={(_, data) => setValue(data.value)} aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
      <div>Current value: {value}</div>
    </div>
  );
};
ControlledValue.parameters = {
  docs: {
    description: {
      story: 'The selected radio item can be controlled using the `value` and `onChange` props.',
    },
  },
};
