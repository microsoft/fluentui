import * as React from 'react';
import { StoryGrid } from './DataGridShared.stories';

export const Default = (): React.ReactNode => <StoryGrid />;

Default.parameters = {
  docs: {
    description: {
      story:
        'The grid is a single tab stop. Use the arrow keys to move between the cells, `Home` and `End` to jump within a row and `Ctrl+Home` and `Ctrl+End` to jump within the grid.',
    },
  },
};
