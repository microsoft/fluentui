import * as React from 'react';
import { Avatar } from '@fluentui/react-modern-components-preview/avatar';
import { PeopleTeamRegular } from '@fluentui/react-icons';

export const Square = (): React.ReactNode => (
  <Avatar shape="square" aria-label="square avatar" icon={<PeopleTeamRegular />} />
);

Square.storyName = 'Shape: square';
Square.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a square shape.',
    },
  },
};
