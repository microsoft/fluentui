import * as React from 'react';

import { CalendarMonthRegular } from '@fluentui/react-icons';
import { InteractionTag } from '@fluentui/react-components';
import { InteractionTagPrimary } from '@fluentui/react-modern-components-preview/interaction-tag';

export const Icon = (): React.ReactNode => (
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
