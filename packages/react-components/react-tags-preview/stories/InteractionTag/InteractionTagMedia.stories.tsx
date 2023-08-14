import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

import { InteractionTag, InteractionTagPrimary } from '@fluentui/react-tags-preview';

export const Media = () => (
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
      story: 'A tag can render a media, for example an Avatar.',
    },
  },
};
