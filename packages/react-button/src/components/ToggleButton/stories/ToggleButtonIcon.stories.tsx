import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Tooltip } from '@fluentui/react-tooltip';
import { ToggleButton } from '../../../ToggleButton';

export const Icon = () => (
  <>
    <ToggleButton icon={<CalendarMonthRegular />}>With calendar icon before contents</ToggleButton>
    <ToggleButton icon={<CalendarMonthRegular />} iconPosition="after">
      With calendar icon after contents
    </ToggleButton>
    <Tooltip content="With calendar icon only" relationship="label">
      <ToggleButton icon={<CalendarMonthRegular />} aria-label="Icon only" />
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
