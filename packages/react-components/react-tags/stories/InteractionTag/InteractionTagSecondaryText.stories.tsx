import * as React from 'react';
import { InteractionTag } from '@fluentui/react-tags';

export const SecondaryText = () => <InteractionTag secondaryText="Secondary text">Primary text</InteractionTag>;

SecondaryText.storyName = 'SecondaryText';
SecondaryText.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag can have a secondary text.',
    },
  },
};
