import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

export const Name = (props: Partial<AvatarProps>) => <Avatar {...props} name="Katri Athokas" />;

Name.storyName = 'Initials: based on name';
Name.parameters = {
  docs: {
    description: {
      story: 'An avatar can display initials based on the name.',
    },
  },
};
