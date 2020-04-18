import * as React from 'react';
import { RadioGroup } from '@fluentui/react-northstar';

const RadioGroupItemExample = () => (
  <RadioGroup
    items={[
      { key: '1', label: 'Make your choice', value: '1' },
      { key: '2', label: 'Another option', value: '2' },
    ]}
  />
);

export default RadioGroupItemExample;
