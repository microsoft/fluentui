import * as React from 'react';
import { Pill, Flex, PillProps } from '@fluentui/react-northstar';

const PillSizesExample = () => (
  <Flex gap="gap.medium">
    {['smaller', 'small', 'medium'].map((size: PillProps['size']) => (
      <Pill key={size} size={size}>
        {size} pill
      </Pill>
    ))}
  </Flex>
);

export default PillSizesExample;
