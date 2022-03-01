import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup } from '../index';

export const Labeled = () => {
  const labelId = useId('label-');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Label id={labelId} required>
        Option
      </Label>
      <RadioGroup aria-labelledby={labelId}>
        <Radio value="A" label="A" />
        <Radio value="B" label="B" />
        <Radio value="C" label="C" />
        <Radio value="D" label="D" />
      </RadioGroup>
    </div>
  );
};
Labeled.parameters = {
  docs: {
    description: {
      story:
        'Use the `aria-labelledby` property on RadioGroup to associate a label with the group.<br />' +
        '**Note**: The `<label>` attribute `htmlFor` does _not_ work with RadioGroup, as the group is not ' +
        'an input element. You must use `aria-labelledby` instead.',
    },
  },
};
