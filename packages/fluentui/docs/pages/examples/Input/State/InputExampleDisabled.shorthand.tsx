import * as React from 'react';
import { Input, Flex } from '@fluentui/react-northstar';

const InputExampleDisabled = () => (
  <Flex gap="gap.smaller">
    <Input fluid disabled placeholder="You shall not type ..." />
    <Input fluid disabled clearable value="Same but clearable (apparently)" />
  </Flex>
);

export default InputExampleDisabled;
