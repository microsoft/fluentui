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

  it('should set tabindex 0 if cell focus is enabled', () => {
    const ctx = mockDataGridContext({ focusMode: 'cell' });
    const { getByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridCell>Default DataGridCell</DataGridCell>
      </DataGridContextProvider>,
    );

    const row = getByRole('gridcell');
    expect(row.tabIndex).toBe(0);
    expect(row.getAttribute('tabindex')).toBe('0');
  });

  it.each(['none', 'row_unstable'] as const)('should not set tabindex if focus mode is %s', focusMode => {
    const ctx = mockDataGridContext({ focusMode });
    const { getByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridCell>Default DataGridCell</DataGridCell>
      </DataGridContextProvider>,
    );

    const row = getByRole('gridcell');
    expect(row.tabIndex).toBe(-1);
    expect(row.hasAttribute('tabindex')).toBe(false);
  });
});
