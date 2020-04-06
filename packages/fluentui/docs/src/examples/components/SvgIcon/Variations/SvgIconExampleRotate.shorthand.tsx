import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { CallVideoIcon, SkypeLogoIcon, EmojiIcon, MoreIcon } from '@fluentui/react-icons-northstar';

const IconExampleRotate = () => (
  <Flex gap="gap.smaller">
    <CallVideoIcon rotate={45} />
    <SkypeLogoIcon rotate={45} />
    <EmojiIcon rotate={45} />
    <MoreIcon rotate={45} />
  </Flex>
);

export default IconExampleRotate;
