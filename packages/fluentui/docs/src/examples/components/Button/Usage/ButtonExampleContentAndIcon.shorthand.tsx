import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { CallVideoIcon } from '@fluentui/react-icons-northstar';
import { Button } from '@fluentui/react-button';

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon={<CallVideoIcon />} content="Join call" iconPosition="before" primary />
    <Button icon={<CallVideoIcon />} content="Join call" iconPosition="after" />
    <Button icon={<CallVideoIcon />} content="Join call" text />
  </Flex>
);

export default ButtonExampleContentAndIcon;
