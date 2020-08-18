import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { CallVideoIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon primary>
      <CallVideoIcon xSpacing="after" />
      <Button.Content content="Join call" />
    </Button>
    <Button icon>
      <Button.Content content="Join call" />
      <CallVideoIcon xSpacing="before" />
    </Button>
    <Button icon text>
      <CallVideoIcon xSpacing="after" />
      <Button.Content content="Join call" />
    </Button>
  </Flex>
);

export default ButtonExampleContentAndIcon;
