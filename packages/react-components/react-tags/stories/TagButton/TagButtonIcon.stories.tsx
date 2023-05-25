import * as React from 'react';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { TagButton } from '@fluentui/react-tags';

export const Icon = () => <TagButton icon={<Calendar3Day20Regular />}>Primary text</TagButton>;

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'A TagButton can render a custom icon if provided.',
    },
  },
};
