import * as React from 'react';
import { Avatar } from './index';

export const GetInitials = () => {
  const name = 'Jane Doe';
  return <Avatar name={name} initials={`${name[0]} ${name[name.length - 1]}`} />;
};

GetInitials.storyName = 'Custom initials';
GetInitials.parameters = {
  docs: {
    description: {
      story: 'An avatar can display custom initials by setting the initials prop.',
    },
  },
};
