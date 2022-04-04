import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-tooltip';
import { Button } from '../../../Button';

export const Icon = () => (
  <>
    <Button icon={<CalendarMonthRegular />}>With calendar icon before contents</Button>
    <Button icon={<CalendarMonthRegular />} iconPosition="after">
      With calendar icon after contents
    </Button>
    <Tooltip content="With calendar icon only" relationship="label">
      <Button icon={<CalendarMonthRegular />} />
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
