import * as React from 'react';
import { Avatar, AvatarProps } from './index'; // codesandbox-dependency: @fluentui/react-components ^9.0.0-beta

const formatter = (name: string, isRTL: boolean) => {
  return `${name[0]} ${name[name.length - 1]}`;
};

export const GetInitials = (props: Partial<AvatarProps>) => {
  return <Avatar {...props} name="Jane Doe" getInitials={formatter} />;
};

GetInitials.storyName = 'Initials: from a callback';
GetInitials.parameters = {
  docs: {
    description: {
      story: 'An avatar can display initials from a callaback.',
    },
  },
};
