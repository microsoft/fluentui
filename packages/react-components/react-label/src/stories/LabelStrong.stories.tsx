import * as React from 'react';
import { Label } from '../index'; // codesandbox-dependency: @fluentui/react-label ^9.0.0-beta

export const Strong = () => <Label strong>Strong label</Label>;

Strong.parameters = {
  docs: {
    description: {
      story: 'A Label with a strong font weight.',
    },
  },
};
