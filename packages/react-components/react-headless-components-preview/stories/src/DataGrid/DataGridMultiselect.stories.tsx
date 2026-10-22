import * as React from 'react';
import { StoryGrid } from './DataGridShared.stories';

export const Multiselect = (): React.ReactNode => <StoryGrid selectionMode="multiselect" defaultSelectedItems={[1]} />;

Multiselect.parameters = {
  docs: {
    description: {
      story:
        'Click a row or press `Space` to toggle it. The checkbox of the header selects all the rows and shows the mixed state (`data-checked="mixed"`) when only some are selected.',
    },
  },
};
