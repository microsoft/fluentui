import * as React from 'react';
import { Label } from '../index'; // codesandbox-dependency: @fluentui/react-label ^9.0.0-beta

export const Weight = () => <Label weight="semibold">Strong label</Label>;

Weight.parameters = {
  docs: {
    description: {
      story: 'A Label with a semibold font weight.',
    },
  },
};
