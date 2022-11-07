import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridCell } from './DataGridCell';
import { isConformant } from '../../testing/isConformant';
import { DataGridCellProps } from './DataGridCell.types';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { mockDataGridContext } from '../../testing/mockDataGridContext';

describe('DataGridCell', () => {
  isConformant<DataGridCellProps>({
    Component: DataGridCell,
    displayName: 'DataGridCell',
  });

  it('renders a default state', () => {
    const result = render(<DataGridCell>Default DataGridCell</DataGridCell>);
    expect(result.container).toMatchSnapshot();
  });

  it('should set tabindex="0" when focusMode is cell', () => {
    const context = mockDataGridContext({ focusMode: 'cell' });
    const result = render(
      <DataGridContextProvider value={context}>
        <DataGridCell>Default DataGridCell</DataGridCell>
      </DataGridContextProvider>,
    );

    expect(result.getByRole('gridcell').tabIndex).toBe(0);
  });

  it('should not set tabindex when focusMode is none', () => {
    const context = mockDataGridContext({ focusMode: 'none' });
    const result = render(
      <DataGridContextProvider value={context}>
        <DataGridCell>Default DataGridCell</DataGridCell>
      </DataGridContextProvider>,
    );

    expect(result.getByRole('gridcell').tabIndex).toBe(-1);
    expect(result.getByRole('gridcell').hasAttribute('tabindex')).toBe(false);
  });
});
