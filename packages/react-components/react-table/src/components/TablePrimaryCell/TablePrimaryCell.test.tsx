import * as React from 'react';
import { render } from '@testing-library/react';
import { TablePrimaryCell } from './TablePrimaryCell';
import { isConformant } from '../../common/isConformant';
import { TablePrimaryCellProps } from './TablePrimaryCell.types';
import { tableContextDefaultValue, TableContextProvider } from '../../contexts/tableContext';

const tr = document.createElement('tr');
describe('TablePrimaryCell', () => {
  beforeEach(() => {
    document.body.appendChild(tr);
  });
  isConformant({
    Component: TablePrimaryCell as React.FC<TablePrimaryCellProps>,
    displayName: 'TablePrimaryCell',
    renderOptions: {
      container: tr,
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            media: 'Test Icon',
            main: 'Main content',
            secondary: 'Secondary content',
          },
        },
      ],
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TablePrimaryCell>Default TablePrimaryCell</TablePrimaryCell>, { container: tr });
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TablePrimaryCell>Table cell</TablePrimaryCell>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('cell');
  });
});
