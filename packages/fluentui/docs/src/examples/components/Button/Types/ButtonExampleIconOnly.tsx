import * as React from 'react';
import { Button, Flex, Text } from '@fluentui/react-northstar';
import { CloseIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleIconOnly = () => (
  <div>
    <Flex gap="gap.large" vAlign="center">
      <Button iconOnly title="Close">
        <CloseIcon xSpacing="none" />
      </Button>
      <Text content="AS A DEFAULT BUTTON" weight="bold" />
    </Flex>
    <Flex gap="gap.large" vAlign="center">
      <Button iconOnly text title="Close">
        <CloseIcon xSpacing="none" />
      </Button>
      <Text content="AS A TEXT BUTTON" weight="bold" />
    </Flex>
  </div>
);

export default ButtonExampleIconOnly;
