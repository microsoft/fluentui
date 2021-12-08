import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

export const Appearance = () => (
  <>
    <CompoundButton secondaryContent="This is the secondary content">Default button</CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" appearance="primary">
      Primary button
    </CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" appearance="outline">
      Outline button
    </CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" appearance="subtle">
      Subtle button
    </CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" appearance="transparent">
      Transparent button
    </CompoundButton>
  </>
);
Appearance.parameters = {
  docs: {
    description: {
      story:
        '- `(undefined)`: the compound button appears with the default style\n' +
        '- `primary`: emphasizes the compound button as a primary action.\n' +
        '- `outline`: removes background styling.\n' +
        '- `subtle`: minimizes emphasis to blend into the background until hovered or focused\n' +
        '- `transparent`: removes background and border styling.\n',
    },
  },
};
