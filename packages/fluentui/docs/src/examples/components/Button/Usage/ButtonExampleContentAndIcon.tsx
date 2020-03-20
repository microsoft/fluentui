import * as React from 'react';
import { Button, Icon, Flex } from '@fluentui/react-northstar';

const ButtonExampleContentAndIcon = () => (
  <Flex gap="gap.large">
    <Button icon primary>
      <Icon name="call-video" xSpacing="after" />
      <Button.Content content="Join call" />
    </Button>
    <Button icon>
      <Button.Content content="Join call" />
      <Icon name="call-video" xSpacing="before" />
    </Button>
    <Button icon text>
      <Icon name="call-video" xSpacing="after" />
      <Button.Content content="Join call" />
    </Button>
  </Flex>
);

export default ButtonExampleContentAndIcon;
