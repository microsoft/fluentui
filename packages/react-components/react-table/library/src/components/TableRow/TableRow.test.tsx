import * as React from 'react';
import { render } from '@testing-library/react';
import { TableRow } from './TableRow';
import { isConformant } from '../../testing/isConformant';
import { TableRowProps } from './TableRow.types';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';

const tbody = document.createElement('tbody');
describe('TableRow', () => {
  beforeEach(() => {
    tbody.remove();
    document.body.appendChild(tbody);
  });

  isConformant({
    Component: TableRow as React.FunctionComponent<TableRowProps>,
    renderOptions: {
      container: tbody,
    },
    displayName: 'TableRow',
  });

  it('renders a default state', () => {
    const result = render(
      <TableRow>
        <td>Table Cell</td>
      </TableRow>,
      { container: tbody },
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableRow>
          <div>Table cell</div>
        </TableRow>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('row');
  });
});
