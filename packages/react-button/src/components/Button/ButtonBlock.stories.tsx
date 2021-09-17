import * as React from 'react';
import { Button } from '../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-alpha

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
