import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup } from '../index';

export const Labeled = () => {
  const labelId = useId('label-');
  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
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
