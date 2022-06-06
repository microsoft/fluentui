import * as React from 'react';
import { CompoundButton } from '../../../CompoundButton';

export const Appearance = () => (
  <>
    <CompoundButton secondaryContent="Secondary content">Default</CompoundButton>
    <CompoundButton secondaryContent="Secondary content" appearance="primary">
      Primary
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" appearance="outline">
      Outline
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" appearance="subtle">
      Subtle
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" appearance="transparent">
      Transparent
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
