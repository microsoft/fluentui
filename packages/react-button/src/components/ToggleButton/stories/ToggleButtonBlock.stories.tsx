import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Block = () => (
  <>
    <ToggleButton block>Block button</ToggleButton>
  </>
);
Block.parameters = {
  docs: {
    description: {
      story: 'A toggle button can fill the width of its container.',
    },
  },
};
