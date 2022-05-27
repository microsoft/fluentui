import * as React from 'react';
import { Button } from '../../../Button';

export const Appearance = () => (
  <>
    <Button>Default</Button>
    <Button appearance="primary">Primary</Button>
    <Button appearance="outline">Outline</Button>
    <Button appearance="subtle">Subtle</Button>
    <Button appearance="transparent">Transparent</Button>
  </>
);
Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the button appears with the default style\n' +
        '- `primary`: emphasizes the button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
