import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup } from '../index';

export const Required = () => {
  const labelId = useId('label-');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label id={labelId} required>
        Favorite Fruit
      </Label>
      <RadioGroup aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" required />
        <Radio value="pear" label="Pear" required />
        <Radio value="banana" label="Banana" required />
        <Radio value="orange" label="Orange" required />
      </RadioGroup>
    </div>
  );
};
Required.parameters = {
  docs: {
    description: {
      story: 'Use the `required` prop on every `Radio` child of a `RadioGroup` to make the group as required.',
    },
  },
};
