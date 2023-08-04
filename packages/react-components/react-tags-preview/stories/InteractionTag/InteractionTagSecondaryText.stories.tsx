import * as React from 'react';
import { InteractionTag, Primary } from '@fluentui/react-tags-preview';

export const SecondaryText = () => (
  <InteractionTag>
    <Primary secondaryText="Secondary text">Primary text</Primary>
  </InteractionTag>
);

SecondaryText.storyName = 'SecondaryText';
SecondaryText.parameters = {
  docs: {
    description: {
      story: 'A InteractionTag can have a secondary text.',
    },
  },
};
