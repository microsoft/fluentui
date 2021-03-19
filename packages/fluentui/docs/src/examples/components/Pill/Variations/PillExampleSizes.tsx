import * as React from 'react';
import { Pill, Flex, PillProps } from '@fluentui/react-northstar';

const PillSizesExample = () => (
  <Flex gap="gap.medium" column>
    <Flex gap="gap.medium">
      {['smaller', 'small', 'medium'].map((size: PillProps['size']) => (
        <Pill size={size}>{size} pill</Pill>
      ))}
    </Flex>
  </Flex>
);

export default PillSizesExample;
