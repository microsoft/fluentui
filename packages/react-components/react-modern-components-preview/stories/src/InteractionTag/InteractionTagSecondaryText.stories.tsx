import * as React from 'react';

import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-modern-components-preview/interaction-tag';

export const SecondaryText = (): React.ReactNode => (
  <InteractionTag>
    <InteractionTagPrimary secondaryText="Secondary text">Primary text</InteractionTagPrimary>
  </InteractionTag>
);

SecondaryText.storyName = 'SecondaryText';
SecondaryText.parameters = {
  docs: {
    description: {
      story: 'An InteractionTag can have a secondary text.',
    },
  },
};
