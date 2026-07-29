import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DataGridCell } from './DataGridCell';
import { isConformant } from '../../testing/isConformant';
import type { DataGridCellProps } from './DataGridCell.types';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { mockDataGridContext } from '../../testing/mockDataGridContext';

describe('DataGridCell', () => {
  isConformant<DataGridCellProps>({
    Component: DataGridCell,
    displayName: 'DataGridCell',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    // This component renders another component's ROOT — a DataGridCell IS a TableCell — so the
    // element legitimately carries BOTH markers (DECISIONS.md D16.3). Declaring the whole set
    // keeps `component-has-group-marker` running as an exact set comparison, and keeps its
    // `classList[0]` half — the D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on —
    // asserted here.
    testOptions: {
      'has-group-marker': {
        markers: ['group/fui-table-cell', 'group/fui-data-grid-cell'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
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
