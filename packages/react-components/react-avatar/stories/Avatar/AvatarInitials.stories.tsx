import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

export const Initials = () => <Avatar name="Cecil Robin Folk" initials="CRF" />;

Initials.storyName = 'Initials: Custom Initials';
Initials.parameters = {
  docs: {
    description: {
      story: `An avatar can display custom initials by setting the initials prop. It is generally recommended to use
        the \`name\` prop instead, as that will automatically determine the initials and display them.`,
    },
  },
};
