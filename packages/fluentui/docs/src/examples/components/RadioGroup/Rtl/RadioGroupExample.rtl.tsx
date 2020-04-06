import * as React from 'react';
import { RadioGroup } from '@fluentui/react-northstar';

const RadioGroupExampleRtl = () => (
  <RadioGroup
    defaultCheckedValue="1"
    items={[
      { key: '1', label: 'الإثنين', value: '1' },
      { key: '2', label: 'الثلاثاء', value: '2' },
      { key: '3', label: 'الأربعاء', value: '3' },
    ]}
  />
);

export default RadioGroupExampleRtl;
