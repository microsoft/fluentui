import * as React from 'react';
import { Avatar } from '@fluentui/react-components';
import { Calendar3Day20Regular } from '@fluentui/react-icons';

import { Tag } from '@fluentui/react-tags';

export const Shape = () => (
  <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Tag media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>Rounded</Tag>
      <Tag shape="circular" media={<Avatar name="Katri Athokas" badge={{ status: 'busy' }} />}>
        Circular
      </Tag>
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
      <Tag dismissable icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Rounded
      </Tag>
      <Tag shape="circular" dismissable icon={<Calendar3Day20Regular />} secondaryText="Secondary text">
        Circular
      </Tag>
    </div>
  </div>
);

Shape.storyName = 'Shape';
Shape.parameters = {
  docs: {
    description: {
      story: 'A tag can be rounded or circular,',
    },
  },
};
