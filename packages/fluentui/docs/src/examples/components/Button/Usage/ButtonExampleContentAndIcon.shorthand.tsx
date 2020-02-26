import * as React from 'react';
import { Button, Flex } from '@fluentui/react';

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon="call-video" content="Join call" iconPosition="before" primary />
    <Button icon="call-video" content="Join call" iconPosition="after" />
    <Button icon="call-video" content="Join call" text />
  </Flex>
);

export default ButtonExampleContentAndIcon;
