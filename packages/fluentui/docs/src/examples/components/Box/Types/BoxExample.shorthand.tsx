import * as React from 'react';
import { Box } from '@fluentui/react-northstar';

const BoxShorthandExample = () => (
  <Box
    content="Box"
    styles={{
      border: '1px dashed #ccc',
      color: 'blue',
      textAlign: 'center',
      width: '50px',
      ':hover': { color: 'red' },
    }}
  />
);

export default BoxShorthandExample;
