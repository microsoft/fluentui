import * as React from 'react';
import { Flex, Text } from '@fluentui/react-northstar';
import { createImgIcon } from '@fluentui/react-bindings';

const AccdbIcon = createImgIcon({
  name: 'accdb',
  displayName: 'AccdbIcon',
});

const AccdbPngIcon = createImgIcon({
  name: 'accdb',
  displayName: 'AccdbIcon',
  urlConfig: {
    type: 'png',
  },
});

const IconExample = () => (
  <Flex column>
    <Text content={'SVG icons'} />
    <Flex gap="gap.smaller">
      <AccdbIcon />
      <AccdbIcon size={20} />
      <AccdbIcon size={24} />
      <AccdbIcon size={32} />
      <AccdbIcon size={40} />
      <AccdbIcon size={48} />
      <AccdbIcon size={64} />
      <AccdbIcon size={96} />
    </Flex>
    <Text content={'PNG icons'} />
    <Flex gap="gap.smaller">
      <AccdbPngIcon />
      <AccdbPngIcon size={20} />
      <AccdbPngIcon size={24} />
      <AccdbPngIcon size={32} />
      <AccdbPngIcon size={40} />
      <AccdbPngIcon size={48} />
      <AccdbPngIcon size={64} />
      <AccdbPngIcon size={96} />
    </Flex>
    <Text content={'Size modifiers for size 24'} />
    <Flex gap="gap.smaller">
      <AccdbPngIcon size={24} sizeModifier="1.5x" />
      <AccdbPngIcon size={24} sizeModifier="2x" />
      <AccdbPngIcon size={24} sizeModifier="3x" />
      <AccdbPngIcon size={24} sizeModifier="4x" />
    </Flex>
  </Flex>
);

export default IconExample;
