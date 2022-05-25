import * as React from 'react';
import { Avatar } from '../index';
import { PeopleTeamRegular } from '@fluentui/react-icons';

export const Square = () => <Avatar shape="square" aria-label="square avatar" icon={<PeopleTeamRegular />} />;

Square.storyName = 'Shape: square';
Square.parameters = {
  docs: {
    description: {
      story: 'An avatar can have a square shape.',
    },
  },
};
