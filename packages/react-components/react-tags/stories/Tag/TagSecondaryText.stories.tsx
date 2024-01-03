import * as React from 'react';
import { Tag } from '@fluentui/react-components';

export const SecondaryText = () => <Tag secondaryText="Secondary text">Primary text</Tag>;

SecondaryText.storyName = 'SecondaryText';
SecondaryText.parameters = {
  docs: {
    description: {
      story: 'A Tag can have a secondary text.',
    },
  },
};
