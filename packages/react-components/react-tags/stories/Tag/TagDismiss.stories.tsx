import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { Tag } from '@fluentui/react-tags';

export const Dismiss = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <Tag dismissable>Primary text</Tag>
    <Tag dismissable icon={<Calendar3Day20Regular />}>
      Primary text
    </Tag>
    <Tag dismissable media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />} secondaryText="Secondary text">
      Primary text
    </Tag>
  </div>
);

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A tag can have a button that dismisses it',
    },
  },
};
