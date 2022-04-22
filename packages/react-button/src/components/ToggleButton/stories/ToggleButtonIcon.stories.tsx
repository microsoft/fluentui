import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-tooltip';
import { ToggleButton } from '../../../ToggleButton';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Icon = () => (
  <>
    <ToggleButton icon={<CalendarMonth />}>With calendar icon before contents</ToggleButton>
    <ToggleButton icon={<CalendarMonth />} iconPosition="after">
      With calendar icon after contents
    </ToggleButton>
    <Tooltip content="With calendar icon only" relationship="label">
      <ToggleButton icon={<CalendarMonth />} aria-label="Icon only" />
    </Tooltip>
  </>
);
Icon.parameters = {
  docs: {
    description: {
      story:
        'The ToggleButton has an `icon` slot that, if specified, renders an icon either `before` ' +
        'or `after` the children, as specified by the `iconPosition` prop.',
    },
  },
};
