import { Loader, Flex } from '@fluentui/react-northstar';
import * as React from 'react';

const LoaderExampleSecondary: React.FC = () => (
  <Flex
    style={{
      backgroundColor: 'rgb(98, 100, 167)',
      padding: 8,
      width: 'fit-content',
    }}
  >
    <Loader secondary />
  </Flex>
);

export default LoaderExampleSecondary;
