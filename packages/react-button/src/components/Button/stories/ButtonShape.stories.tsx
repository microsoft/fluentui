import * as React from 'react';
import { Button } from '../../../Button';

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
