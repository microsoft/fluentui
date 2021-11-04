import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Shape = () => (
  <>
    <ToggleButton>ToggleButton</ToggleButton>
    <ToggleButton shape="circular">ToggleButton</ToggleButton>
    <ToggleButton shape="square">ToggleButton</ToggleButton>
  </>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'A toggle button can be rounded, circular, or square.',
    },
  },
};
