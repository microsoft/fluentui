import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton';

export const Block = () => (
  <>
    <ToggleButton block>Block</ToggleButton>
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'A toggle button can fill the width of its container.',
    },
  },
};
