import * as React from 'react';
import { Avatar } from '@fluentui/react-modern-components-preview/avatar';
import { CalendarMonthRegular } from '@fluentui/react-icons';

export const BadgeIcon = (): React.ReactNode => <Avatar name="John Doe" badge={{ icon: <CalendarMonthRegular /> }} />;

BadgeIcon.parameters = {
  docs: {
    description: {
      story: 'An Avatar can have a custom icon inside the badge.',
    },
  },
};
