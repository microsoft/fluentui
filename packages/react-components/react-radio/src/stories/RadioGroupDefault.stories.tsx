import * as React from 'react';
import { Label } from '@fluentui/react-label';
import { tokens } from '@fluentui/react-theme';
import { useId } from '@fluentui/react-utilities';
import { Radio, RadioGroup, RadioGroupProps } from '../index';

export const Default = (props: Partial<RadioGroupProps>) => {
  const labelId = useId('label');
  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <Label id={labelId}>Favorite Fruit</Label>
      <RadioGroup {...props} aria-labelledby={labelId}>
        <Radio value="apple" label="Apple" />
        <Radio value="pear" label="Pear" />
        <Radio value="banana" label="Banana" />
        <Radio value="orange" label="Orange" />
      </RadioGroup>
    </div>
  );
};
