import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Tag, Avatar } from '@fluentui/react-components';

export const Media = (): JSXElement => (
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
