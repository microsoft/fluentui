import * as React from 'react';
import { Button, Flex } from '@fluentui/react-northstar';
import { EmojiIcon, BroadcastIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon={<EmojiIcon />} title="Emoji" />
    <Button circular icon={<BroadcastIcon />} primary title="Broadcast" />
  </Flex>
);
export default ButtonExampleCircular;
