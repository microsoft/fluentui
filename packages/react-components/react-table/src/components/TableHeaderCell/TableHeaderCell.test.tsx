import * as React from 'react';
import { render } from '@testing-library/react';
import { TableHeaderCell } from './TableHeaderCell';
import { isConformant } from '../../common/isConformant';
import { TableHeaderCellProps } from './TableHeaderCell.types';
import { TableContextProvider } from '../../contexts/tableContext';

describe('TableHeaderCell', () => {
  const tr = document.createElement('tr');
  beforeEach(() => {
    document.body.appendChild(tr);
  });

  isConformant({
    Component: TableHeaderCell as React.FC<TableHeaderCellProps>,
    displayName: 'TableHeaderCell',
    renderOptions: {
      container: tr,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableHeaderCell>Default TableHeaderCell</TableHeaderCell>, { container: tr });
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ size: 'medium', noNativeElements: true }}>
        <TableHeaderCell>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('columnheader');
  });
});
