import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-tooltip';
import { Button } from '../../../Button';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Icon = () => (
  <>
    <Button icon={<CalendarMonth />}>With calendar icon before contents</Button>
    <Button icon={<CalendarMonth />} iconPosition="after">
      With calendar icon after contents
    </Button>
    <Tooltip content="With calendar icon only" relationship="label">
      <Button icon={<CalendarMonth />} />
    </Tooltip>
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
