import * as React from 'react';
import { Button } from '../../../Button';

export const Block = () => (
  <>
    <Button block>Block</Button>
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'A button can fill the width of its container.',
    },
  },
};
