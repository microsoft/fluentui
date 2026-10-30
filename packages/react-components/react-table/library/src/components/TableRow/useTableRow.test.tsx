// `state.components` is deprecated but is still part of the state contract that styled hooks and renderers rely on.
/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { renderHook } from '@testing-library/react';
import { useTableRow_unstable } from './useTableRow';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';
import { TableHeaderContextProvider } from '../../contexts/tableHeaderContext';

describe('useTableRow_unstable', () => {
  it('renders a native tr by default', () => {
    const { result } = renderHook(() => useTableRow_unstable({}, React.createRef()));

    expect(result.current.components.root).toBe('tr');
    expect(result.current.root.role).toBeUndefined();
    expect(result.current.appearance).toBe('none');
    expect(result.current.size).toBe('medium');
    expect(result.current.noNativeElements).toBe(false);
    expect(result.current.isHeaderRow).toBe(false);
  });

  it('takes size and noNativeElements from the table context', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <TableContextProvider value={{ ...tableContextDefaultValue, size: 'small', noNativeElements: true }}>
        {children}
      </TableContextProvider>
    );
    const { result } = renderHook(() => useTableRow_unstable({}, React.createRef()), { wrapper });

    expect(result.current.components.root).toBe('div');
    expect(result.current.root.role).toBe('row');
    expect(result.current.size).toBe('small');
    expect(result.current.noNativeElements).toBe(true);
  });

  it('forwards appearance', () => {
    const { result } = renderHook(() => useTableRow_unstable({ appearance: 'brand' }, React.createRef()));

    expect(result.current.appearance).toBe('brand');
  });

  it('flags rows rendered inside a table header', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <TableHeaderContextProvider value="">{children}</TableHeaderContextProvider>
    );
    const { result } = renderHook(() => useTableRow_unstable({}, React.createRef()), { wrapper });

    expect(result.current.isHeaderRow).toBe(true);
  });
});
