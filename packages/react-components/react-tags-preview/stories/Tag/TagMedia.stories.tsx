import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

import { Tag } from '@fluentui/react-tags-preview';

export const Media = () => <Tag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Primary text</Tag>;

Media.storyName = 'Media';
Media.parameters = {
  docs: {
    description: {
      story: 'A tag can render a media, for example an Avatar.',
    },
  },
};
