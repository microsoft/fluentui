import * as React from 'react';
import { Provider, themes, Box } from '@fluentui/react-northstar';

const BoxShorthandExample = () => (
  <Provider theme={themes.teams}>
    <Box
      content="Box"
      styles={{
        border: '1px dashed #ccc',
        color: 'blue',
        textAlign: 'center',
        width: '50px',
        ':hover': { color: 'red' },
      }}
    />{' '}
  </Provider>
);

export default BoxShorthandExample;
