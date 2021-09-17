import * as React from 'react';
import { Button } from '../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-alpha
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
