import * as React from 'react';
import { Button } from '../../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Shape = () => (
  <>
    <Button>Button</Button>
    <Button shape="circular">Button</Button>
    <Button shape="square">Button</Button>
  </>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'A button can be rounded, circular, or square.',
    },
  },
};
