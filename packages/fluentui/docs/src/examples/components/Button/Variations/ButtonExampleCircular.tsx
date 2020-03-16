import * as React from 'react';
import { Button, Flex, Icon } from '@fluentui/react';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular>
      <Button.Content>C</Button.Content>
    </Button>
    <Button circular icon title="Emoji">
      <Icon name="emoji" xSpacing="none" />
    </Button>
    <Button circular icon primary title="Broadcast">
      <Icon name="broadcast" xSpacing="none" />
    </Button>
  </Flex>
);

export default ButtonExampleCircular;
