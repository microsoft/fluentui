import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { TableBody } from './TableBody';
import { useTableBody_unstable } from './useTableBody';
import { isConformant } from '../../testing/isConformant';
import type { TableBodyProps } from './TableBody.types';
import { tableContextDefaultValue, TableContextProvider } from '../../contexts/tableContext';

const table = document.createElement('table');
describe('TableBody', () => {
  beforeEach(() => {
    document.body.appendChild(table);
  });
  isConformant({
    Component: TableBody as React.FC<TableBodyProps>,
    displayName: 'TableBody',
    renderOptions: {
      container: table,
    },
  });

  it.each([
    [false, undefined, 'tbody', undefined],
    [true, undefined, 'div', 'rowgroup'],
    [false, 'tbody', 'tbody', undefined],
    [true, 'tbody', 'tbody', undefined],
    [false, 'div', 'div', 'rowgroup'],
    [true, 'div', 'div', 'rowgroup'],
  ] as const)(
    'uses owner noNativeElements=%s with explicit as=%s to render %s with role %s',
    (noNativeElements, as, expected, role) => {
      const wrapper = ({ children }: { children?: React.ReactNode }) => (
        <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements }}>
          {children}
        </TableContextProvider>
      );
      const { result } = renderHook(() => useTableBody_unstable({ as }, React.createRef<HTMLElement>()), { wrapper });
      expect(result.current.root.role).toBe(role);
      expect(result.current.noNativeElements).toBe(noNativeElements);

      const ref = jest.fn<void, [HTMLElement | null]>();
      const { container } = render(<TableBody as={as} ref={ref} id="explicit-body" />, {
        wrapper,
        container: expected === 'tbody' ? table : undefined,
      });
      const root = container.firstElementChild;
      expect(root?.tagName.toLowerCase()).toBe(expected);
      expect(root?.getAttribute('role')).toBe(role ?? null);
      expect(root?.id).toBe('explicit-body');
      expect(ref).toHaveBeenLastCalledWith(root);
    },
  );

  it('renders a default state', () => {
    const result = render(
      <TableBody>
        <tr>
          <td>cell</td>
        </tr>
      </TableBody>,
      { container: table },
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableBody>
          <div>
            <div>Cell</div>
          </div>
        </TableBody>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('rowgroup');
  });
});
