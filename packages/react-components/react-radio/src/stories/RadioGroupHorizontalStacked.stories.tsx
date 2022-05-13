import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup } from '../index';

export const HorizontalStacked = () => {
  const labelId = useId('label');

  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup layout="horizontalStacked" aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
HorizontalStacked.storyName = 'Layout: horizontalStacked';
HorizontalStacked.parameters = {
  docs: {
    description: {
      story: 'The `horizontalStacked` layout places each radio item in a row, with labels below the radio indicator.',
    },
  },
};
