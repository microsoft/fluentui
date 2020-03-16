import * as React from 'react';
import { RadioGroup } from '@fluentui/react-northstar';

const RadioGroupItemExampleCheckedShorthand = () => (
  <RadioGroup
    defaultCheckedValue="1"
    items={[
      { key: '1', label: 'This radio comes pre-checked', value: '1' },
      { key: '2', label: 'This radio is not pre-checked', value: '2' },
    ]}
  />
);

export default RadioGroupItemExampleCheckedShorthand;
