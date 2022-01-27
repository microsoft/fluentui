import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Appearance = () => (
  <>
    <ToggleButton>Default button</ToggleButton>
    <ToggleButton appearance="primary">Primary button</ToggleButton>
    <ToggleButton appearance="outline">Outline button</ToggleButton>
    <ToggleButton appearance="subtle">Subtle button</ToggleButton>
    <ToggleButton appearance="transparent">Transparent button</ToggleButton>
  </>
);
Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the toggle button appears with the default style\n' +
        '- `primary`: emphasizes the toggle button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
