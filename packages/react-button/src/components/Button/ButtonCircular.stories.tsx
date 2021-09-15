import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
import { Button } from '@fluentui/react-button';
import { CalendarMonth24Regular } from '@fluentui/react-icons';

export const Circular = () => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button circular>Button</Button>
    <Button circular outline icon={<CalendarMonth24Regular />} />
    <Button circular subtle icon={<CalendarMonth24Regular />} />
    <Button circular transparent icon={<CalendarMonth24Regular />} />
  </div>
);
Circular.parameters = {
  docs: {
    description: {
      story: 'A button can have completely rounded corners.',
    },
  },
};
