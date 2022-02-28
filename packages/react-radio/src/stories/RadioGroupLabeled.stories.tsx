import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup } from '../index';

export const Labeled = () => {
  const labelId = useId('label-');
  return (
    <>
      <Label id={labelId} required>
        Pick an option:
      </Label>
      <RadioGroup aria-labelledby={labelId}>
        <Radio value="A" label="Option A" />
        <Radio value="B" label="Option B" />
        <Radio value="C" label="Option C" />
        <Radio value="D" label="Option D" />
      </RadioGroup>
    </>
  );
};
Labeled.parameters = {
  docs: {
    description: {
      story:
        'Use the `aria-labelledby` property on RadioGroup to associate a label with the group.<br />' +
        '**Note**: The `<label>` attribute `for` (`htmlFor`) does _not_ work with RadioGroup.',
    },
  },
};
