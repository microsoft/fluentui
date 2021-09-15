import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
import { Button } from '@fluentui/react-button';

export const Emphasis = () => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button primary>Primary button</Button>
    <Button>Default button</Button>
    <Button outline>Outline button</Button>
    <Button subtle>Subtle button</Button>
    <Button transparent>Transparent button</Button>
  </div>
);
Emphasis.parameters = {
  docs: {
    description: {
      story:
        '- `primary` button is used for the most important action on the page or in a view\n' +
        '- `default` button is used for subordinate actions\n' +
        '- `outline` has no background styling and is emphasized through the styling of its content and borders\n' +
        '- `transparent` has no background or border styling and is just emphasized through its content styling\n' +
        '- `subtle` button blends into its background and becomes less emphasized\n',
    },
  },
};
