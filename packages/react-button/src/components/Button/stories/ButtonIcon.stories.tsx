import * as React from 'react';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { Button } from '../../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Icon = () => (
  <>
    <Button icon={<CalendarMonth24Regular />}>Text</Button>
    <Button icon={<CalendarMonth24Regular />} iconPosition="after">
      Text
    </Button>
    <Button icon={<CalendarMonth24Regular />} />
  </>
);
Icon.parameters = {
  docs: {
    description: {
      story:
        'Button has an `icon` slot that, if specified, renders an icon either `before` or `after` the children, ' +
        'as specified by the `iconPosition` prop.',
    },
  },
};
