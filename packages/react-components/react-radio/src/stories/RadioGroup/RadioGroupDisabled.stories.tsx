import * as React from 'react';
import { tokens, useId, Label, Radio, RadioGroup } from '@fluentui/react-components';

export const Disabled = () => {
  const labelId = useId('label');
  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <Label id={labelId} disabled>
        Favorite Fruit
      </Label>
      <RadioGroup defaultValue="apple" disabled aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
Disabled.parameters = {
  docs: {
    description: {
      story: 'RadioGroup can be disabled, which disables all Radio items inside.',
    },
  },
};
