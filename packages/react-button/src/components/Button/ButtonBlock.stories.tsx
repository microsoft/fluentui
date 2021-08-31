import * as React from 'react';
import { Button } from '@fluentui/react-button';

export const Block = () => (
  <>
    <Button block>Block button</Button>
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'A button can fill the width of its container.',
    },
  },
};
