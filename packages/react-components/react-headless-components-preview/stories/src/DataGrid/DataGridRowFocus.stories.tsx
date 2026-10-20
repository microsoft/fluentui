import * as React from 'react';
import { StoryGrid } from './DataGridShared.stories';

export const RowFocus = (): React.ReactNode => <StoryGrid focusMode="row_unstable" selectionMode="multiselect" />;

RowFocus.parameters = {
  docs: {
    description: {
      story:
        'With the `row_unstable` focus mode the rows are the navigation stops: use `ArrowUp` and `ArrowDown` to move between them and `Space` to toggle the selection. The content of the cells is reached with `Tab`.',
    },
  },
};
