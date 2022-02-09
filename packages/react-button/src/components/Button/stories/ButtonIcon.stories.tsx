import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Button } from '../../../Button';

export const Icon = () => (
  <>
    <Button icon={<CalendarMonthRegular />}>Text</Button>
    <Button icon={<CalendarMonthRegular />} iconPosition="after">
      Text
    </Button>
    <Button icon={<CalendarMonthRegular />} />
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
