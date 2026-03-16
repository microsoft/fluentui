import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Label } from '@fluentui/react-components';

export const Size = (): JSXElement => {
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
