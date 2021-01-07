import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { Button } from '@fluentui/react-button';
import { EmojiIcon, BroadcastIcon } from '@fluentui/react-icons-northstar';

const ButtonExampleCircular = () => (
  <Flex gap="gap.smaller">
    <Button circular iconOnly icon="C" />
    <Button circular iconOnly icon={<EmojiIcon />} title="Emoji" />
    <Button circular iconOnly icon={<BroadcastIcon />} primary title="Broadcast" />
  </Flex>
);
export default ButtonExampleCircular;
