import * as React from 'react';
import { Label } from '../index'; // codesandbox-dependency: @fluentui/react-label ^9.0.0-beta

export const Size = () => {
  return (
    <>
      <Label size="small">Small</Label>
      <Label size="medium">Medium</Label>
      <Label size="large">Large</Label>
    </>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A Label supports `small`, `medium`, and `large` sizes.',
    },
  },
};
