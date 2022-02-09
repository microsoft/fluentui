import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { CompoundButton } from '../../../CompoundButton';

export const Icon = () => (
  <>
    <CompoundButton secondaryContent="This is the secondary content" icon={<CalendarMonthRegular />}>
      Text
    </CompoundButton>
    <CompoundButton
      secondaryContent="This is the secondary content"
      icon={<CalendarMonthRegular />}
      iconPosition="after"
    >
      Text
    </CompoundButton>
    <CompoundButton secondaryContent="This is the secondary content" icon={<CalendarMonthRegular />} />
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
