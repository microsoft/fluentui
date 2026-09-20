import * as React from 'react';

import { CalendarMonthRegular } from '@fluentui/react-icons';
import { Tag } from '@fluentui/react-components';

export const Icon = (): React.ReactNode => <Tag icon={<CalendarMonthRegular />}>Primary text</Tag>;

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'A Tag can render a custom icon if provided.',
    },
  },
};
