import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { CalendarMonth24Regular } from '@fluentui/react-icons';

export const ButtonWithIcon = () => (
  <>
    <Button icon={<CalendarMonth24Regular />}>Text</Button>
    <Button icon={<CalendarMonth24Regular />} iconPosition="after">
      Text
    </Button>
    <Button icon={<CalendarMonth24Regular />} />
  </>
);
ButtonWithIcon.parameters = {
  docs: {
    description: {
      story:
        'Button has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, ' +
        'as specified by the `iconPosition` prop.',
    },
  },
};
