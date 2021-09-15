import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
import { Button } from '@fluentui/react-button';
import { CalendarMonth24Regular } from '@fluentui/react-icons';

export const WithIcon = () => (
  <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
    <Button icon={<CalendarMonth24Regular />}>Text</Button>
    <Button icon={<CalendarMonth24Regular />} iconPosition="after">
      Text
    </Button>
    <Button icon={<CalendarMonth24Regular />} />
  </div>
);
WithIcon.parameters = {
  docs: {
    description: {
      story:
        'Button has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, ' +
        'as specified by the `iconPosition` prop.',
    },
  },
};
