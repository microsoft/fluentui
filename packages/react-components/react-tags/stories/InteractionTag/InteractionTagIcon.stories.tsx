import * as React from 'react';
import { CalendarMonthRegular } from '@fluentui/react-icons';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-components';

export const Icon = () => (
  <InteractionTag>
    <InteractionTagPrimary icon={<CalendarMonthRegular />}>Primary text</InteractionTagPrimary>
  </InteractionTag>
);

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'An InteractionTag can render a custom icon if provided.',
    },
  },
};
