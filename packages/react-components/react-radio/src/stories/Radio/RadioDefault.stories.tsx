import * as React from 'react';
import { tokens, useId, Radio } from '@fluentui/react-components';
import type { RadioProps } from '@fluentui/react-components';

export const Default = (props: Partial<RadioProps>) => {
  const radioName = useId('radio');
  const labelId = useId('label');
  return (
    <div style={{ display: 'grid', gridRowGap: tokens.spacingVerticalS }}>
      <label id={labelId}>Favorite Color</label>
      <div role="radiogroup" aria-labelledby={labelId}>
        <Radio name={radioName} value="apple" label="Apple" {...props} />
        <Radio name={radioName} value="pear" label="Pear" {...props} />
        <Radio name={radioName} value="banana" label="Banana" {...props} />
        <Radio name={radioName} value="orange" label="Orange" {...props} />
      </div>
    </div>
  );
};
