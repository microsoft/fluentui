import * as React from 'react';
import { Box } from '@fluentui/react-northstar';

const BoxExample = () => (
  <Box
    styles={{
      border: '1px dashed #ccc',
      color: 'blue',
      textAlign: 'center',
      width: '50px',
      ':hover': { color: 'red' },
    }}
  >
    Box
  </Box>
);

export default BoxExample;
