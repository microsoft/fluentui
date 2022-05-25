import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup } from '../index';

export const ControlledValue = () => {
  const [value, setValue] = React.useState('banana');
  const labelId = useId('label');
  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
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
