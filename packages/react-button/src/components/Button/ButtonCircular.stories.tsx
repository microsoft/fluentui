import * as React from 'react';
import { Button } from '../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-alpha
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
