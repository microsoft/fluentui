import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DataGridSelectionCell } from './DataGridSelectionCell';
import { isConformant } from '../../testing/isConformant';
import { DataGridSelectionCellProps } from '../../../dist/index';
import { dataGridSelectionCellClassNames } from './useDataGridSelectionCellStyles.styles';
import { mockDataGridContext } from '../../testing/mockDataGridContext';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { DataGridHeader } from '../DataGridHeader/DataGridHeader';

describe('DataGridSelectionCell', () => {
  isConformant<DataGridSelectionCellProps>({
    Component: DataGridSelectionCell,
    displayName: 'DataGridSelectionCell',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            type: 'checkbox',
          },
          expectedClassNames: {
            root: dataGridSelectionCellClassNames.root,
            checkboxIndicator: dataGridSelectionCellClassNames.checkboxIndicator,
          },
        },
        {
          props: {
            type: 'radio',
          },
          expectedClassNames: {
            root: dataGridSelectionCellClassNames.root,
            radioIndicator: dataGridSelectionCellClassNames.radioIndicator,
          },
        },
      ],
    },
  });

  it('should render radio selection indicator if selection mode is single select', () => {
    const ctx = mockDataGridContext({ selectableRows: true }, { selection: { selectionMode: 'single' } });
    const { queryByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridSelectionCell />
      </DataGridContextProvider>,
    );

    expect(queryByRole('radio')).not.toBeNull();
  });

  it('should render checkbox selection indicator if selection mode is multi select', () => {
    const ctx = mockDataGridContext({ selectableRows: true }, { selection: { selectionMode: 'multiselect' } });
    const { queryByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridSelectionCell />
      </DataGridContextProvider>,
    );

    expect(queryByRole('checkbox')).not.toBeNull();
  });

  it('should render checked checkbox if row is selected', () => {
    const isRowSelected = () => true;
    const ctx = mockDataGridContext(
      { selectableRows: true },
      { selection: { isRowSelected, selectionMode: 'multiselect' } },
    );
    const { getByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridSelectionCell />
      </DataGridContextProvider>,
    );

    expect((getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
  });

  it('should render aria-selected=true on cell if row is selected', () => {
    const isRowSelected = () => true;
    const ctx = mockDataGridContext(
      { selectableRows: true },
      { selection: { isRowSelected, selectionMode: 'multiselect' } },
    );
    const { getByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridSelectionCell />
      </DataGridContextProvider>,
    );

    expect(getByRole('gridcell').getAttribute('aria-selected')).toBe('true');
  });

  it('should render aria-selected=false on cell if row is not selected', () => {
    const isRowSelected = () => false;
    const ctx = mockDataGridContext(
      { selectableRows: true },
      { selection: { isRowSelected, selectionMode: 'multiselect' } },
    );
    const { getByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridSelectionCell />
      </DataGridContextProvider>,
    );

    expect(getByRole('gridcell').getAttribute('aria-selected')).toBe('false');
  });

  describe('in header', () => {
    it('should render indeterminate checkbox if some rows are selected in multiselect mode', () => {
      const someRowsSelected = true;
      const allRowsSelected = false;
      const ctx = mockDataGridContext(
        { selectableRows: true },
        { selection: { someRowsSelected, allRowsSelected, selectionMode: 'multiselect' } },
      );
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridSelectionCell />
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      expect((getByRole('checkbox') as HTMLInputElement).indeterminate).toBe(true);
    });

    it('should render checked checkbox if all rows are selected in multiselect mode', () => {
      const allRowsSelected = true;
      const ctx = mockDataGridContext(
        { selectableRows: true },
        { selection: { allRowsSelected, selectionMode: 'multiselect' } },
      );
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridSelectionCell />
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      expect((getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
    });

    it('should toggle all rows in multiselect mode', () => {
      const toggleAllRows = jest.fn();
      const ctx = mockDataGridContext(
        { selectableRows: true },
        { selection: { toggleAllRows, selectionMode: 'multiselect' } },
      );
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridSelectionCell />
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      fireEvent.click(getByRole('checkbox'));
      expect(toggleAllRows).toHaveBeenCalledTimes(1);
    });

    it('should render aria-checked false if no rows are selected', () => {
      const ctx = mockDataGridContext(
        { selectableRows: true },
        { selection: { allRowsSelected: false, someRowsSelected: false, selectionMode: 'multiselect' } },
      );
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridSelectionCell />
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      expect(getByRole('gridcell').getAttribute('aria-checked')).toBe('false');
    });

    it('should render aria-checked mixed if some rows are selected', () => {
      const ctx = mockDataGridContext(
        { selectableRows: true },
        { selection: { allRowsSelected: false, someRowsSelected: true, selectionMode: 'multiselect' } },
      );
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridSelectionCell />
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      expect(getByRole('gridcell').getAttribute('aria-checked')).toBe('mixed');
    });

    it('should render aria-checked true if all rows are selected', () => {
      const ctx = mockDataGridContext(
        { selectableRows: true },
        { selection: { allRowsSelected: true, someRowsSelected: true, selectionMode: 'multiselect' } },
      );
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridSelectionCell />
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      expect(getByRole('gridcell').getAttribute('aria-checked')).toBe('true');
    });
  });
});
