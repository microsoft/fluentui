import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { DataGrid } from './DataGrid';
import { createTableColumn } from '@fluentui/react-table';

const columns = [createTableColumn({ columnId: 'name' })];
const items = [{ name: 'Alice' }];

describe('DataGrid', () => {
  isConformant({
    Component: DataGrid,
    displayName: 'DataGrid',
    requiredProps: { columns, items },
  });

  it('renders with role="grid" by default', () => {
    const { getByRole } = render(<DataGrid columns={columns} items={items} />);
    expect(getByRole('grid')).toBeInTheDocument();
  });
});
