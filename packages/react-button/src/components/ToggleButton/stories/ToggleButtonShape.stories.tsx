import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton';

export const Shape = () => (
  <>
    <ToggleButton>Rounded</ToggleButton>
    <ToggleButton shape="circular">Circular</ToggleButton>
    <ToggleButton shape="square">Square</ToggleButton>
  </>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'A toggle button can be rounded, circular, or square.',
    },
  },
};
