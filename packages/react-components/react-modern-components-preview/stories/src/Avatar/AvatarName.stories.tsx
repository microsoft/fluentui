import * as React from 'react';
import { Avatar } from '@fluentui/react-modern-components-preview/avatar';

export const Name = (): React.ReactNode => <Avatar name="Ashley McCarthy" />;

Name.storyName = 'Name';
Name.parameters = {
  docs: {
    description: {
      story: 'The name is used to determine the initials displayed by the Avatar. It is also read by screen readers.',
    },
  },
};
