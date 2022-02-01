import * as React from 'react';
import { Avatar } from './index';

export const Name = () => <Avatar name="Ashley McCarthy" />;

Name.storyName = 'Name';
Name.parameters = {
  docs: {
    description: {
      story: 'An avatar can display initials based on the name.',
    },
  },
};
