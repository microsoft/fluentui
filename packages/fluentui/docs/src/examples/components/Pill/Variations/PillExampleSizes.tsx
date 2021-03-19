import * as React from 'react';
import { Pill, PillProps, Flex } from '@fluentui/react-northstar';

const PillSizesExample = () => (
  <Flex gap="gap.medium" column>
    {(['smaller', 'small', 'medium'] as PillProps['size'][]).map(size => (
      <React.Fragment key={size}>
        <strong>{size}</strong>
        <Flex gap="gap.small">
          <Pill size={size}>Pill Content</Pill>
        </Flex>
      </React.Fragment>
    ))}
  </Flex>
);

export default PillSizesExample;
