import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { EmojiIcon, BroadcastIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular>
      <Button.Content>C</Button.Content>
    </Button>
    <Button circular icon title="Emoji">
      <EmojiIcon xSpacing="none" />
    </Button>
    <Button circular icon primary title="Broadcast">
      <BroadcastIcon xSpacing="none" />
    </Button>
  </Flex>
);

export default ButtonExampleCircular;
