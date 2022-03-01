import * as React from 'react';
import { Radio, RadioGroup } from '../index';

export const ControlledValue = () => {
  const [value, setValue] = React.useState('C');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <RadioGroup value={value} onChange={(_, data) => setValue(data.value)}>
        <Radio value="A" label="Option A" />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
        <Radio value="D" label="Option D" />
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
