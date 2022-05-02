import * as React from 'react';
import { Button } from '../../../Button';

export const Shape = () => (
  <>
    <Button>Rounded</Button>
    <Button shape="circular">Circular</Button>
    <Button shape="square">Square</Button>
  </>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'A button can be rounded, circular, or square.',
    },
  },
};
