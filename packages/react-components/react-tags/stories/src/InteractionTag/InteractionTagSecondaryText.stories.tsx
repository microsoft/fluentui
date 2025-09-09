import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-components';

export const SecondaryText = (): JSXElement => (
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
