import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton';

export const Checked = () => (
  <>
    <ToggleButton checked={true}>Controlled checked state</ToggleButton>

    <ToggleButton checked={false}>Controlled unchecked state</ToggleButton>
  </>
);
Checked.parameters = {
  docs: {
    description: {
      story: `A toggle button can be checked or unchecked. Unchecked is default.
      If a checked value is given, the button is 'controlled' and will only change state when the
      props value changes.`,
    },
  },
};
