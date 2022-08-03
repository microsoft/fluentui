import * as React from 'react';
import { tokens, useId, Label, Radio, RadioGroup } from '@fluentui/react-components';

export const Required = () => {
  const labelId = useId('label-');
  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <Label id={labelId} required>
        Favorite Fruit
      </Label>
      <RadioGroup aria-labelledby={labelId} required>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
Required.parameters = {
  docs: {
    description: {
      story: 'Use the `required` prop on `RadioGroup` to make all child `Radio`s required.',
    },
  },
};
