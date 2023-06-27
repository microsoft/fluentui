import * as React from 'react';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { InteractionTag } from '@fluentui/react-tags';

export const Icon = () => <InteractionTag icon={<Calendar3Day20Regular />}>Primary text</InteractionTag>;

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag can render a custom icon if provided.',
    },
  },
};
