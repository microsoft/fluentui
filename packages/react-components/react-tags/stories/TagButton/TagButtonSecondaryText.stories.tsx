import * as React from 'react';
import { TagButton } from '@fluentui/react-tags';

export const SecondaryText = () => <TagButton secondaryText="Secondary text">Primary text</TagButton>;

SecondaryText.storyName = 'SecondaryText';
SecondaryText.parameters = {
  docs: {
    description: {
      story: 'A TagButton can have a secondary text.',
    },
  },
};
