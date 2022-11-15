import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { CalendarMonthRegular } from '@fluentui/react-icons';

export const BadgeIcon = () => (
  <>
    <Avatar name="John Doe" badge={{ icon: <CalendarMonthRegular /> }} />
  </>
);

BadgeIcon.parameters = {
  docs: {
    description: {
      story: 'An avatar can have the icon inside the badge customized by the user instead of using the default ones.',
    },
  },
};
