import * as React from 'react';
import { Avatar } from './index';
import { PeopleTeamRegular } from '@fluentui/react-icons';

export const Shape = () => (
  <div style={{ display: 'flex', gap: '10px' }}>
    <Avatar shape="circular" aria-label="circular avatar" />
    <Avatar shape="square" aria-label="square avatar" icon={<PeopleTeamRegular />} />
  </div>
);

Shape.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a circular or square shape. The default shape is circular.',
    },
  },
};
