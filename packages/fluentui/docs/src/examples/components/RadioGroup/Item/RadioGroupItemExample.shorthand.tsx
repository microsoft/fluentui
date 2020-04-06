import * as React from 'react';
import { RadioGroup } from '@fluentui/react-northstar';

const handleChange = () => {
  alert('The radio checked value was changed!');
};

const RadioGroupItemExample = () => (
  <RadioGroup
    items={[
      { key: '1', label: 'Make your choice', value: '1', checkedChanged: handleChange },
      { key: '2', label: 'Another option', value: '2', checkedChanged: handleChange },
    ]}
  />
);

export default RadioGroupItemExample;
