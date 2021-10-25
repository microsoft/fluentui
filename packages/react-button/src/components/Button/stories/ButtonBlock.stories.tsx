import * as React from 'react';
import { Button } from '../../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

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
