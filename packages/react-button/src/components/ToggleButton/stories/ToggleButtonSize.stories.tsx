import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Size = () => {
  return (
    <>
      <ToggleButton size="small">Size: small</ToggleButton>
      <ToggleButton size="medium">Size: medium</ToggleButton>
      <ToggleButton size="large">Size: large</ToggleButton>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A toggle button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
