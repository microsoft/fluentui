import * as React from 'react';
import { Pill, PillProps, Flex } from '@fluentui/react-northstar';

const PillSizesExample = () => (
  <Flex gap="gap.medium" column>
  <Flex gap="gap.medium">
    {['smaller', 'small', 'medium'].map(size => (
      <Pill size={size as const}>{size} pill</Pill>
    ))}
  </Flex>
  </Flex>
);

export default PillSizesExample;
