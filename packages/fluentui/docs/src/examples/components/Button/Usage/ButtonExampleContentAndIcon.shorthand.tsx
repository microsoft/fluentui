import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon={<CallVideoIcon />} content="Join call" iconPosition="before" primary />
    <Button icon={<CallVideoIcon />} content="Join call" iconPosition="after" />
    <Button icon={<CallVideoIcon />} content="Join call" text />
  </Flex>
);

export default ButtonExampleContentAndIcon;
