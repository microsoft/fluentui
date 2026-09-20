import * as React from 'react';

import { Tag } from '@fluentui/react-modern-components-preview/tag';
import { Avatar } from '@fluentui/react-components';

export const Media = (): React.ReactNode => (
  <Tag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Primary text</Tag>
);

Media.storyName = 'Media';
Media.parameters = {
  docs: {
    description: {
      story: 'A tag can render a media, for example an Avatar.',
    },
  },
};
