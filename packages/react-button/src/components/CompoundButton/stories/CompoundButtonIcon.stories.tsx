import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton } from '../../../CompoundButton';

export const Icon = () => (
  <>
    <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />}>
      With icon before contents
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />} iconPosition="after">
      With icon after contents
    </CompoundButton>
    <CompoundButton secondaryContent="Secondary content" icon={<CalendarMonthRegular />} aria-label="Calendar icon" />
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
