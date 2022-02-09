import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { ToggleButton } from '../../../ToggleButton';

export const Icon = () => (
  <>
    <ToggleButton icon={<CalendarMonthRegular />}>With icon before</ToggleButton>
    <ToggleButton icon={<CalendarMonthRegular />} iconPosition="after">
      With icon after
    </ToggleButton>
    <ToggleButton icon={<CalendarMonthRegular />} aria-label="Icon only" />
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
