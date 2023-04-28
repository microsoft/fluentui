import * as React from 'react';
import { Avatar } from '@fluentui/react-avatar';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { TagButton } from '@fluentui/react-tags';

export const Dismiss = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <TagButton dismissable>Primary text</TagButton>
    <TagButton dismissable icon={<Calendar3Day20Regular />}>
      Primary text
    </TagButton>
    <TagButton
      dismissable
      media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}
      secondaryText="Secondary text"
    >
      Primary text
    </TagButton>
  </div>
);

Dismiss.storyName = 'Dismiss';
Dismiss.parameters = {
  docs: {
    description: {
      story: 'A TagButton can have a button that dismisses it',
    },
  },
};
