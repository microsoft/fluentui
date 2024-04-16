import * as React from 'react';
import { fireEvent, render, createEvent } from '@testing-library/react';
import { DataGridRow } from './DataGridRow';
import { isConformant } from '../../testing/isConformant';
import { DataGridRowProps } from './DataGridRow.types';
import { mockDataGridContext } from '../../testing/mockDataGridContext';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { useColumnIdContext } from '../../contexts/columnIdContext';
import { DataGridHeader } from '../DataGridHeader/DataGridHeader';

describe('DataGridRow', () => {
  const Wrapper: React.FC = props => {
    const ctx = mockDataGridContext({ selectableRows: true });
    return <DataGridContextProvider value={ctx}>{props.children}</DataGridContextProvider>;
  };

  isConformant<DataGridRowProps>({
    Component: DataGridRow,
    displayName: 'DataGridRow',
    requiredProps: {
      children: () => null,
    },
    renderOptions: {
      wrapper: Wrapper,
    },
  });

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

  it('should set tabindex 0 if row focus is enabled', () => {
    const ctx = mockDataGridContext({ focusMode: 'row_unstable' });
    const { getByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridRow>{() => <div />}</DataGridRow>
      </DataGridContextProvider>,
    );

    const row = getByRole('row');
    expect(row.tabIndex).toBe(0);
    expect(row.getAttribute('tabindex')).toBe('0');
  });

  it.each(['none', 'cell'] as const)('should not set tabindex if focus mode is %s', focusMode => {
    const ctx = mockDataGridContext({ focusMode });
    const { getByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridRow>{() => <div />}</DataGridRow>
      </DataGridContextProvider>,
    );

    const row = getByRole('row');
    expect(row.tabIndex).toBe(-1);
    expect(row.hasAttribute('tabindex')).toBe(false);
  });

  describe('selectable', () => {
    it('should toggle row on click', () => {
      const toggleRow = jest.fn();
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { toggleRow } });
      const { getByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      fireEvent.click(getByRole('row'));

      expect(toggleRow).toHaveBeenCalledTimes(1);
    });

    it('should toggle row on spacebar', () => {
      const toggleRow = jest.fn();
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { toggleRow } });
      const { getByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      fireEvent.keyDown(getByRole('row'), { key: ' ' });

      expect(toggleRow).toHaveBeenCalledTimes(1);
    });

    it('should prevent default on spacebar select', () => {
      const ctx = mockDataGridContext({ selectableRows: true });
      const { getByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      const row = getByRole('row');
      const keyDownEvent = createEvent.keyDown(row, { key: ' ', target: document.createElement('div') });
      fireEvent(row, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(true);
    });

    it('should toggle row on spacebar if element is interactive', () => {
      const toggleRow = jest.fn();
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { toggleRow } });
      const { getAllByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <button />}</DataGridRow>
        </DataGridContextProvider>,
      );

      fireEvent.keyDown(getAllByRole('button')[0], { key: ' ' });

      expect(toggleRow).toHaveBeenCalledTimes(0);
    });

    it('should not prevent default on spacebar on interactive element', () => {
      const ctx = mockDataGridContext({ selectableRows: true });
      const { getAllByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <button />}</DataGridRow>
        </DataGridContextProvider>,
      );

      const button = getAllByRole('button')[0];
      const keyDownEvent = createEvent.keyDown(button, { key: ' ' });
      fireEvent(button, keyDownEvent);

      expect(keyDownEvent.defaultPrevented).toBe(false);
    });

    it('should not toggle row on click if in header', () => {
      const toggleRow = jest.fn();
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { toggleRow } });
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridRow>{() => <div />}</DataGridRow>
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      fireEvent.click(getByRole('row'));

      expect(toggleRow).toHaveBeenCalledTimes(0);
    });

    it('should not toggle row on spacebar if in header', () => {
      const toggleRow = jest.fn();
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { toggleRow } });
      const { getByRole } = render(
        <DataGridHeader>
          <DataGridContextProvider value={ctx}>
            <DataGridRow>{() => <div />}</DataGridRow>
          </DataGridContextProvider>
        </DataGridHeader>,
      );

      fireEvent.keyDown(getByRole('row'), { key: ' ' });

      expect(toggleRow).toHaveBeenCalledTimes(0);
    });

    it('should render aria-selected=true if row is selected', () => {
      const isRowSelected = () => true;
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { isRowSelected } });
      const { getByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      expect(getByRole('row').getAttribute('aria-selected')).toBe('true');
    });

    it('should render aria-selected=false if row is not selected', () => {
      const isRowSelected = () => false;
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { isRowSelected } });
      const { getByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      expect(getByRole('row').getAttribute('aria-selected')).toBe('false');
    });

    it('should not render aria-selected if datagrid is not selectable', () => {
      const isRowSelected = () => true;
      const ctx = mockDataGridContext({ selectableRows: false }, { selection: { isRowSelected } });
      const { getByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      expect(getByRole('row').hasAttribute('aria-selected')).toBe(false);
    });

    it('should render selection indicator if datagrid is selectable', () => {
      const ctx = mockDataGridContext({ selectableRows: true });
      const { queryByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      expect(queryByRole('checkbox')).not.toBeNull();
    });

    it('should not render selection indicator if datagrid is not selectable', () => {
      const ctx = mockDataGridContext({ selectableRows: false });
      const { queryByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      expect(queryByRole('checkbox')).toBeNull();
      expect(queryByRole('radio')).toBeNull();
    });

    it('should render radio selection indicator if selection mode is single select', () => {
      const ctx = mockDataGridContext({ selectableRows: true }, { selection: { selectionMode: 'single' } });
      const { queryByRole } = render(
        <DataGridContextProvider value={ctx}>
          <DataGridRow>{() => <div />}</DataGridRow>
        </DataGridContextProvider>,
      );

      expect(queryByRole('radio')).not.toBeNull();
    });
  });
});
