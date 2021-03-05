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

const SvgIconExampleCircular = () => (
  <Flex gap="gap.smaller">
    <SkypeLogoIcon circular bordered />
    <EmojiIcon circular bordered />
    <PlayIcon circular bordered />
    <CallIcon circular bordered />
    <CallVideoIcon circular bordered />
    <TranslationIcon circular bordered />
  </Flex>
);

export default SvgIconExampleCircular;
