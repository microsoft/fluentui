import * as React from 'react';
import { Label } from '@fluentui/react-components';

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
