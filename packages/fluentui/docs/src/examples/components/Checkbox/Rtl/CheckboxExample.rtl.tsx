import * as React from 'react';
import { Checkbox, Divider, Flex } from '@fluentui/react-northstar';

const CheckboxExampleRtl = () => (
  <Flex column hAlign="start">
    <Checkbox label="لروسية عدد, كلّ لغزو" />
    <Checkbox label="Lorem ipsum dolor sit amet" />
    <Divider />
    <Checkbox label="لروسية عدد, كلّ لغزو" labelPosition="start" />
    <Checkbox label="Lorem ipsum dolor sit amet" labelPosition="start" />
  </Flex>
);

export default CheckboxExampleRtl;
