import * as React from 'react';
import { Avatar } from './index';
import { PeopleTeamRegular } from '@fluentui/react-icons';

export const Shape = () => <Avatar shape="square" aria-label="square avatar" icon={<PeopleTeamRegular />} />;

Shape.storyName = 'Shape: square';
Shape.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a square shape.',
    },
  },
};
