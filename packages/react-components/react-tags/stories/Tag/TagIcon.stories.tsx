import * as React from 'react';
import { Calendar3Day20Regular } from '@fluentui/react-icons';
import { Tag, TagContent } from '@fluentui/react-tags';

export const Icon = () => (
  <Tag>
    <TagContent icon={<Calendar3Day20Regular />}>Primary text</TagContent>
  </Tag>
);

Icon.storyName = 'Icon';
Icon.parameters = {
  docs: {
    description: {
      story: 'A TagContent can render a custom icon if provided.',
    },
  },
};
