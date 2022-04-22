import * as React from 'react';
import { bundleIcon, CalendarMonthFilled, CalendarMonthRegular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-tooltip';
import { CompoundButton } from '../../../CompoundButton';

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

export const Icon = () => (
  <>
    <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonth />}>
      With calendar icon before contents
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonth />} iconPosition="after">
      With calendar icon after contents
    </CompoundButton>
    <Tooltip content="With calendar icon only" relationship="label">
      <CompoundButton icon={<CalendarMonth />} />
    </Tooltip>
  </>
);
Icon.parameters = {
  docs: {
    description: {
      story:
        'The CompoundButton has an `icon` slot that, if specified, renders an icon either `before` ' +
        'or `after` the children, as specified by the `iconPosition` prop.',
    },
  },
};
