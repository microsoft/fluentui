import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
import { Button } from '@fluentui/react-button';

export const Block = () => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button block>Block button</Button>
  </div>
);
Block.parameters = {
  docs: {
    description: {
      story: 'A button can fill the width of its container.',
    },
  },
};
