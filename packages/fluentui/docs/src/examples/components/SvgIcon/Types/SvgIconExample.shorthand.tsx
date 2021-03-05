import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { CallVideoIcon, SkypeLogoIcon, EmojiIcon, CircleIcon } from '@fluentui/react-icons-northstar';

const SvgIconExample = () => (
  <Flex gap="gap.smaller">
    <CallVideoIcon />
    <SkypeLogoIcon />
    <EmojiIcon />
    <CircleIcon />
  </Flex>
);

export default SvgIconExample;
