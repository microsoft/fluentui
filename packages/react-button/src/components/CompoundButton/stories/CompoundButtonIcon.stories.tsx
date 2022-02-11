import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-tooltip';
import { CompoundButton } from '../../../CompoundButton';

export const Icon = () => (
  <>
    <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />}>
      With calendar icon before contents
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />} iconPosition="after">
      With calendar icon after contents
    </CompoundButton>
    <Tooltip content="With calendar icon only" relationship="label">
      <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />} />
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
