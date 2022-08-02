import * as React from 'react';
import { tokens, useId, Label, Radio, RadioGroup } from '@fluentui/react-components';

export const HorizontalStacked = () => {
  const labelId = useId('label');

  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup layout="horizontal-stacked" aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
HorizontalStacked.storyName = 'Layout: horizontal-stacked';
HorizontalStacked.parameters = {
  docs: {
    description: {
      story: 'The `horizontal-stacked` layout places each radio item in a row, with labels below the radio indicator.',
    },
  },
};
