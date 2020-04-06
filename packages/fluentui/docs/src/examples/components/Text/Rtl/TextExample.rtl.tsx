import * as React from 'react';
import { Flex, Text } from '@fluentui/react-northstar';

const TextExampleRtl = () => (
  <Flex column gap="gap.small">
    <div>
      <Text content="مرحبا العالم!" />
      <Text content="صباح الخير" />
    </div>
    <Text content="Hello world!" />
    <Text content="העלא וועלט!" />
  </Flex>
);

export default TextExampleRtl;
