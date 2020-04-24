import * as React from 'react';
import { Flex } from '@fluentui/react-northstar';
import {
  SkypeLogoIcon,
  EmojiIcon,
  PlayIcon,
  CallIcon,
  CallVideoIcon,
  TranslationIcon,
} from '@fluentui/react-icons-northstar';

const SvgconExampleBordered = () => (
  <Flex gap="gap.smaller">
    <SkypeLogoIcon bordered />
    <EmojiIcon bordered />
    <PlayIcon bordered />
    <CallIcon bordered />
    <CallVideoIcon bordered />
    <TranslationIcon bordered />
  </Flex>
);

export default SvgconExampleBordered;
