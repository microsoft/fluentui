import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { useTableBase_unstable } from './useTable';
import { useTableRowBase_unstable } from '../TableRow/useTableRow';
import { useTableCellBase_unstable } from '../TableCell/useTableCell';
import { useTableHeaderCellBase_unstable } from '../TableHeaderCell/useTableHeaderCell';
import { useTableCellLayoutBase_unstable } from '../TableCellLayout/useTableCellLayout';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';

const wrapper = ({ children }: { children?: React.ReactNode }) => (
  <TableContextProvider value={{ ...tableContextDefaultValue, size: 'small', noNativeElements: true }}>
    {children}
  </TableContextProvider>
);

describe('table base hooks', () => {
  it('useTableBase_unstable has no design state', () => {
    const { result } = renderHook(() => useTableBase_unstable({ size: 'small' } as {}, React.createRef()));

    expect(result.current).not.toHaveProperty('size');
    expect(result.current.noNativeElements).toBe(false);
    expect(result.current.sortable).toBe(false);
  });

  it('useTableRowBase_unstable has no design or focus state', () => {
    const { result } = renderHook(() => useTableRowBase_unstable({ appearance: 'brand' } as {}, React.createRef()), {
      wrapper,
    });

    expect(result.current).not.toHaveProperty('size');
    expect(result.current).not.toHaveProperty('appearance');
    expect(result.current.noNativeElements).toBe(true);
    expect(result.current.root.role).toBe('row');
  });

  it('useTableCellBase_unstable has no design state', () => {
    const { result } = renderHook(() => useTableCellBase_unstable({}, React.createRef()), { wrapper });

    expect(result.current).not.toHaveProperty('size');
    expect(result.current.root.role).toBe('cell');
  });

  it('useTableHeaderCellBase_unstable does not render a default sort icon', () => {
    const { result } = renderHook(() =>
      useTableHeaderCellBase_unstable({ sortable: true, sortDirection: 'ascending' }, React.createRef()),
    );

    expect(result.current.sortIcon).toBeUndefined();
    expect(result.current.sortDirection).toBe('ascending');
    expect(result.current.root['aria-sort']).toBe('ascending');
  });

  it('useTableHeaderCellBase_unstable renders a provided sort icon', () => {
    const { result } = renderHook(() =>
      useTableHeaderCellBase_unstable({ sortIcon: { children: 'up' } }, React.createRef()),
    );

    expect(result.current.sortIcon?.children).toBe('up');
  });

  it('useTableCellLayoutBase_unstable has no design state', () => {
    const { result } = renderHook(
      () => useTableCellLayoutBase_unstable({ appearance: 'primary', truncate: true } as {}, React.createRef()),
      { wrapper },
    );

    expect(result.current).not.toHaveProperty('size');
    expect(result.current).not.toHaveProperty('avatarSize');
    expect(result.current).not.toHaveProperty('appearance');
    expect(result.current).not.toHaveProperty('truncate');
    expect(result.current.main).toBeDefined();
  });
});
