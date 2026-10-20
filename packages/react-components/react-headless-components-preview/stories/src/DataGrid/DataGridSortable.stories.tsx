import * as React from 'react';
import { StoryGrid } from './DataGridShared.stories';

export const Sortable = (): React.ReactNode => (
  <StoryGrid sortable defaultSortState={{ sortColumn: 'file', sortDirection: 'ascending' }} />
);

Sortable.parameters = {
  docs: {
    description: {
      story:
        'Sortable columns render their header content inside a button. The sorted header cell exposes `data-sort-direction` and `aria-sort`. The last column has no `compare` function, so it is not sortable.',
    },
  },
};
