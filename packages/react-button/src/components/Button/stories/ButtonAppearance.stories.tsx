import * as React from 'react';
import { Button } from '../../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Appearance = () => (
  <>
    <Button>Default button</Button>
    <Button appearance="primary">Primary button</Button>
    <Button appearance="outline">Outline button</Button>
    <Button appearance="subtle">Subtle button</Button>
    <Button appearance="transparent">Transparent button</Button>
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
