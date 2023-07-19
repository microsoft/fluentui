import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

import { InteractionTag } from '@fluentui/react-tags-preview';

export const Media = () => (
  <InteractionTag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Primary text</InteractionTag>
);

Media.storyName = 'Media';
Media.parameters = {
  docs: {
    description: {
      story: 'A tag can render a media, for example an Avatar.',
    },
  },
};
