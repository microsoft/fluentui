import * as React from 'react';
import { Label } from '../index'; // codesandbox-dependency: @fluentui/react-label ^9.0.0-beta

export const Required = () => (
  <>
    <Label required>Required label</Label>
    <Label required="***">Required label</Label>
  </>
);

Required.parameters = {
  docs: {
    description: {
      story:
        'A Label can display a required asterisk or a custom required indicator. This custom required indicator can' +
        'be a custom string or jsx content.',
    },
  },
};
