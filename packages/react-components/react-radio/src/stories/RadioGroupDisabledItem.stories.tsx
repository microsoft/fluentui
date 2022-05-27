import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup } from '../index';

export const DisabledItem = () => {
  const labelId = useId('label');
  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup defaultValue="apple" aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" disabled />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
DisabledItem.parameters = {
  docs: {
    description: {
      story: 'Radio items can be disabled individually.',
    },
  },
};
