import * as React from 'react';
import { RadioGroup } from '@fluentui/react-future';

const RadioGroupItemExampleDisabledShorthand = () => (
  <RadioGroup
    items={[
      { key: '1', label: 'Disabled', value: '1', disabled: true },
      { key: '2', label: 'Enabled', value: '2' }
    ]}
  />
);

export default RadioGroupItemExampleDisabledShorthand;
