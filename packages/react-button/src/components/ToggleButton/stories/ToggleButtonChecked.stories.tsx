import * as React from 'react';
import { ToggleButton } from '../../../ToggleButton'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Checked = () => (
  <>
    <ToggleButton checked={true}>A checked toggle button</ToggleButton>

    <ToggleButton checked={false}>An unchecked toggle button</ToggleButton>
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
