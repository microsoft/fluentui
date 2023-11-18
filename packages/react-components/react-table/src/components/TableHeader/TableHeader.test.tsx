import * as React from 'react';
import { render } from '@testing-library/react';
import { TableHeader } from './TableHeader';
import { isConformant } from '../../testing/isConformant';
import { TableHeaderProps } from './TableHeader.types';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';

describe('TableHeader', () => {
  const table = document.createElement('table');
  beforeEach(() => {
    document.body.appendChild(table);
  });
  isConformant({
    Component: TableHeader as React.FC<TableHeaderProps>,
    displayName: 'TableHeader',
    renderOptions: {
      container: table,
    },
  });

  it('renders a default state', () => {
    const result = render(
      <TableHeader>
        <tr />
      </TableHeader>,
      { container: table },
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableHeader>
          <div />
        </TableHeader>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('rowgroup');
  });
});
