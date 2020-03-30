import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { CallVideo } from '@fluentui/react-icons-northstar';

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon={<CallVideo />} content="Join call" iconPosition="before" primary />
    <Button icon={<CallVideo />} content="Join call" iconPosition="after" />
    <Button icon={<CallVideo />} content="Join call" text />
  </Flex>
);

export default ButtonExampleContentAndIcon;
