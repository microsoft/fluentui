import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Name = (props: Partial<AvatarProps>) => <Avatar {...props} name="Katri Athokas" />;

Name.storyName = 'Initials: based on name';
Name.parameters = {
  docs: {
    description: {
      story: 'An avatar can display initials based on the name.',
    },
  },
};
