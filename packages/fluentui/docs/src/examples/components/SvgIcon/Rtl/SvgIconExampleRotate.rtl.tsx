import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import { CallVideoIcon, SkypeLogoIcon, EmojiIcon, BulletsIcon } from '@fluentui/react-icons-northstar';

const SvgIconExampleRotateRtl = () => (
  <Flex gap="gap.smaller">
    <CallVideoIcon rotate={45} />
    <SkypeLogoIcon rotate={45} />
    <EmojiIcon rotate={45} />
    <BulletsIcon rotate={45} />
  </Flex>
);

export default SvgIconExampleRotateRtl;
