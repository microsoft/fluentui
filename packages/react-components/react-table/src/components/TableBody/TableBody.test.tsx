import * as React from 'react';
import { render } from '@testing-library/react';
import { TableBody } from './TableBody';
import { isConformant } from '../../testing/isConformant';
import { TableBodyProps } from './TableBody.types';
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
