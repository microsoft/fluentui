import * as React from 'react';

import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-modern-components-preview/interaction-tag';
import { Avatar } from '@fluentui/react-components';
import story from './InteractionTagMedia.md';

export const Media = (): React.ReactNode => (
  <InteractionTag>
    <InteractionTagPrimary media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
      Primary text
    </InteractionTagPrimary>
  </InteractionTag>
);

Media.storyName = 'Media';
Media.parameters = {
  docs: {
    description: {
      story,
    },
  },
};
