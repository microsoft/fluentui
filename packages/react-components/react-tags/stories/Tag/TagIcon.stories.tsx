import * as React from 'react';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { Tag } from '@fluentui/react-tags';

export const Icon = () => <Tag icon={<Calendar3Day20Regular />}>Primary text</Tag>;

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'A Tag can render a custom icon if provided.',
    },
  },
};
