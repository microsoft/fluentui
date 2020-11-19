import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { Button } from '@fluentui/react-button';
import { EmojiIcon, BroadcastIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular content="C" />
    <Button circular icon={<EmojiIcon />} title="Emoji" />
    <Button circular icon={<BroadcastIcon />} primary title="Broadcast" />
  </Flex>
);
export default ButtonExampleCircular;
