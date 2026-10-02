import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { Table } from './Table';
import { useTable_unstable } from './useTable';
import { isConformant } from '../../testing/isConformant';
import type { TableProps } from './Table.types';
import { TableRow } from '../TableRow/TableRow';
import { TableCell } from '../TableCell/TableCell';
import { TableBody } from '../TableBody/TableBody';

describe('Table', () => {
  isConformant({
    Component: Table as React.FC<TableProps>,
    displayName: 'Table',
  });

  it.each([
    [false, undefined, 'table', undefined],
    [true, undefined, 'div', 'table'],
    [false, 'table', 'table', undefined],
    [true, 'table', 'table', undefined],
    [false, 'div', 'div', 'table'],
    [true, 'div', 'div', 'table'],
  ] as const)(
    'uses noNativeElements=%s with explicit as=%s to render %s with role %s',
    (noNativeElements, as, expected, role) => {
      const { result } = renderHook(() => useTable_unstable({ noNativeElements, as }, React.createRef<HTMLElement>()));
      expect(result.current.root.role).toBe(role);
      expect(result.current.noNativeElements).toBe(noNativeElements);

      const ref = jest.fn<void, [HTMLElement | null]>();
      const { container } = render(<Table noNativeElements={noNativeElements} as={as} ref={ref} id="explicit-root" />);
      const root = container.firstElementChild;
      expect(root?.tagName.toLowerCase()).toBe(expected);
      expect(root?.getAttribute('role')).toBe(role ?? null);
      expect(root?.id).toBe('explicit-root');
      expect(ref).toHaveBeenLastCalledWith(root);
    },
  );

  it('renders a default state', () => {
    const result = render(
      <Table>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <Table noNativeElements>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container).toMatchSnapshot();
  });
});
