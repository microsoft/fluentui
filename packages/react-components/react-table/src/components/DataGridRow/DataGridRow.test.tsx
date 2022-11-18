import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridRow } from './DataGridRow';
import { isConformant } from '../../testing/isConformant';
import { DataGridRowProps } from './DataGridRow.types';
import { mockDataGridContext } from '../../testing/mockDataGridContext';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { useColumnIdContext } from '../../contexts/columnIdContext';

describe('DataGridRow', () => {
  isConformant<DataGridRowProps>({
    Component: DataGridRow,
    displayName: 'DataGridRow',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DataGridRow>{() => 'foo'}</DataGridRow>);
    expect(result.container).toMatchSnapshot();
  });

  it('renders column id context around each cell', () => {
    const ctx = mockDataGridContext();
    const TestComponent = () => {
      const columnId = useColumnIdContext();
      return <span role="status">{columnId}</span>;
    };
    const { getAllByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridRow>{() => <TestComponent />}</DataGridRow>
      </DataGridContextProvider>,
    );

    const columnIds = getAllByRole('status').map(el => el.textContent);
    expect(columnIds).toMatchInlineSnapshot(`
      Array [
        "first",
        "second",
        "third",
      ]
    `);
  });
});
