import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { InteractionTag } from '@fluentui/react-tags-preview';

export const Icon = () => <InteractionTag icon={<CalendarMonthRegular />}>Primary text</InteractionTag>;

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag can render a custom icon if provided.',
    },
  },
};
