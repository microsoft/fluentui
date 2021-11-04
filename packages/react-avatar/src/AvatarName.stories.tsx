import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const Name = (props: Partial<AvatarProps>) => <Avatar {...props} name="Katri Athokas" />;

Name.parameters = {
  docs: {
    description: {
      story: "An Avatar can display the user's initials.",
    },
  },
};
