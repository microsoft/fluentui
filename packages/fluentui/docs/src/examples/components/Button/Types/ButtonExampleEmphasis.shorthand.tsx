import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { Button } from '@fluentui/react-button';

const ButtonExampleEmphasis = () => (
  <Flex gap="gap.smaller">
    <Button content="Primary" primary />
    <Button content="Secondary" secondary />
  </Flex>
);

export default ButtonExampleEmphasis;
