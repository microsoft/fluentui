import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { TagButton } from '@fluentui/react-tags';

export const Shape = () => (
  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
    <div style={{ display: 'flex', gap: '10px' }}>
      <TagButton media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</TagButton>
      <TagButton shape="circular" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
        Circular
      </TagButton>
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <TagButton dismissable icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Rounded
      </TagButton>
      <TagButton shape="circular" dismissable icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Circular
      </TagButton>
    </div>
  </div>
);

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'A TagButton can be rounded or circular,',
    },
  },
};
