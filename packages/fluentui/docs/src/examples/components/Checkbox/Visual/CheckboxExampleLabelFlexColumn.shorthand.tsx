import { Checkbox, Flex } from '@fluentui/react-northstar';
import * as React from 'react';

const CheckboxExampleLabelFlexColumn = () => (
  <Flex column>
    <Checkbox label="At start" labelPosition="start" />
    <Checkbox label="At end" />
  </Flex>
);

export default CheckboxExampleLabelFlexColumn;
