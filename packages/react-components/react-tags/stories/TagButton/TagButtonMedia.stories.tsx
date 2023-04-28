import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

import { TagButton } from '@fluentui/react-tags';

export const Media = () => (
  <TagButton media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Primary text</TagButton>
);

Media.storyName = 'Media';
Media.parameters = {
  docs: {
    description: {
      story: 'A tag can render a media, for example an Avatar.',
    },
  },
};
