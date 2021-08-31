import * as React from 'react';
import { Button } from '@fluentui/react-button';

export const ButtonBlock = () => (
  <>
    <Button block>Block button</Button>
  </>
);
ButtonBlock.parameters = {
  docs: {
    description: {
      story: 'A button can fill the width of its container.',
    },
  },
};
