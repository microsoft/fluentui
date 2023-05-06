import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

import { Tag, TagContent } from '@fluentui/react-tags';

export const Media = () => (
  <Tag>
    <TagContent media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Primary text</TagContent>
  </Tag>
);

Media.storyName = 'Media';
Media.parameters = {
  docs: {
    description: {
      story: 'A TagContent can render a media, for example an Avatar.',
    },
  },
};
