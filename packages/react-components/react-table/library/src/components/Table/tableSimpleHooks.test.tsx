// `state.components` is deprecated but is still part of the state contract that styled hooks and renderers rely on.
/* eslint-disable @typescript-eslint/no-deprecated */
import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTableBody_unstable } from '../TableBody/useTableBody';
import { useTableCell_unstable } from '../TableCell/useTableCell';
import { useTableHeader_unstable } from '../TableHeader/useTableHeader';
import { useTableCellActions_unstable } from '../TableCellActions/useTableCellActions';
import { useTableResizeHandle_unstable } from '../TableResizeHandle/useTableResizeHandle';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';

const noNativeElementsWrapper = ({ children }: { children?: React.ReactNode }) => (
  <TableContextProvider value={{ ...tableContextDefaultValue, size: 'small', noNativeElements: true }}>
    {children}
  </TableContextProvider>
);

describe('structural table hooks', () => {
  it.each([
    ['useTableBody_unstable', useTableBody_unstable, 'tbody', 'rowgroup'],
    ['useTableHeader_unstable', useTableHeader_unstable, 'thead', 'rowgroup'],
    ['useTableCell_unstable', useTableCell_unstable, 'td', 'cell'],
  ] as const)('%s renders a native %s by default and a div with the %s role otherwise', (_, hook, tag, role) => {
    const native = renderHook(() => hook({}, React.createRef()));
    expect(native.result.current.components.root).toBe(tag);
    expect(native.result.current.root.role).toBeUndefined();
    expect(native.result.current.noNativeElements).toBe(false);

    const divs = renderHook(() => hook({}, React.createRef()), { wrapper: noNativeElementsWrapper });
    expect(divs.result.current.components.root).toBe('div');
    expect(divs.result.current.root.role).toBe(role);
    expect(divs.result.current.noNativeElements).toBe(true);

    const asDiv = renderHook(() => hook({ as: 'div' }, React.createRef()));
    expect(asDiv.result.current.components.root).toBe('div');
    expect(asDiv.result.current.root.role).toBe(role);
  });

  it('useTableCell_unstable exposes the table size', () => {
    expect(renderHook(() => useTableCell_unstable({}, React.createRef())).result.current.size).toBe('medium');
    expect(
      renderHook(() => useTableCell_unstable({}, React.createRef()), { wrapper: noNativeElementsWrapper }).result
        .current.size,
    ).toBe('small');
  });

  it('useTableCellActions_unstable renders a div and is not visible by default', () => {
    const hidden = renderHook(() => useTableCellActions_unstable({}, React.createRef()));
    expect(hidden.result.current.components.root).toBe('div');
    expect(hidden.result.current.visible).toBe(false);

    const visible = renderHook(() => useTableCellActions_unstable({ visible: true }, React.createRef()));
    expect(visible.result.current.visible).toBe(true);
  });

  it('useTableResizeHandle_unstable calls onClick and stops propagation', () => {
    const onClick = jest.fn();
    const { result } = renderHook(() => useTableResizeHandle_unstable({ onClick }, React.createRef()));
    const stopPropagation = jest.fn();

    result.current.root.onClick?.({ stopPropagation } as unknown as React.MouseEvent<HTMLDivElement>);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(stopPropagation).toHaveBeenCalledTimes(1);
  });
});
