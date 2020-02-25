import * as React from 'react';
import { Button, Flex, Text, Icon } from '@fluentui/react';

const ButtonExampleIconOnly = () => (
  <div>
    <Flex gap="gap.large" vAlign="center">
      <Button iconOnly title="Close">
        <Icon name="icon-close" xSpacing="none" />
      </Button>
      <Text content="AS A DEFAULT BUTTON" weight="bold" />
    </Flex>
    <Flex gap="gap.large" vAlign="center">
      <Button iconOnly text title="Close">
        <Icon name="icon-close" xSpacing="none" />
      </Button>
      <Text content="AS A TEXT BUTTON" weight="bold" />
    </Flex>
  </div>
);

export default ButtonExampleIconOnly;
