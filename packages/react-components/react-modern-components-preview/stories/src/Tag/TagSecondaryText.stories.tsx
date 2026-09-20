import * as React from 'react';

import { Tag } from '@fluentui/react-modern-components-preview/tag';

export const SecondaryText = (): React.ReactNode => <Tag secondaryText="Secondary text">Primary text</Tag>;

SecondaryText.storyName = 'SecondaryText';
SecondaryText.parameters = {
  docs: {
    description: {
      story: 'A Tag can have a secondary text.',
    },
  },
};
