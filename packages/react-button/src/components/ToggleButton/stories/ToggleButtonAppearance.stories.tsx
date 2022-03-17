import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton';

export const Appearance = () => (
  <>
    <ToggleButton>Default</ToggleButton>
    <ToggleButton appearance="primary">Primary</ToggleButton>
    <ToggleButton appearance="outline">Outline</ToggleButton>
    <ToggleButton appearance="subtle">Subtle</ToggleButton>
    <ToggleButton appearance="transparent">Transparent</ToggleButton>
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
