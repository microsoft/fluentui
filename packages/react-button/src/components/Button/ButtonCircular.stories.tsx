import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { CalendarMonth24Regular } from '@fluentui/react-icons';

export const Circular = () => (
  <>
    <Button circular>Button</Button>
    <Button circular outline icon={<CalendarMonth24Regular />} />
    <Button circular subtle icon={<CalendarMonth24Regular />} />
    <Button circular transparent icon={<CalendarMonth24Regular />} />
  </>
);
Circular.parameters = {
  docs: {
    description: {
      story: 'A button can have completely rounded corners.',
    },
  },
};
