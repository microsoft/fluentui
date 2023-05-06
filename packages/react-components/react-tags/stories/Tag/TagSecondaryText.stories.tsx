import * as React from 'react';
import { Tag, TagContent } from '@fluentui/react-tags';

export const SecondaryText = () => (
  <Tag>
    <TagContent secondaryText="Secondary text">Primary text</TagContent>
  </Tag>
);

SecondaryText.storyName = 'SecondaryText';
SecondaryText.parameters = {
  docs: {
    description: {
      story: 'A TagContent can have a secondary text.',
    },
  },
};
