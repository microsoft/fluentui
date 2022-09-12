import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellPrimaryItem } from './TableCellPrimaryItem';
import { isConformant } from '../../common/isConformant';
import { TableCellPrimaryItemProps } from './TableCellPrimaryItem.types';
import { tableContextDefaultValue, TableContextProvider } from '../../contexts/tableContext';

const tr = document.createElement('tr');
describe('TableCellPrimaryItem', () => {
  beforeEach(() => {
    document.body.appendChild(tr);
  });
  isConformant({
    Component: TableCellPrimaryItem as React.FC<TableCellPrimaryItemProps>,
    displayName: 'TableCellPrimaryItem',
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
    const result = render(<TableCellPrimaryItem>Default TableCellPrimaryItem</TableCellPrimaryItem>, { container: tr });
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableCellPrimaryItem>Table cell</TableCellPrimaryItem>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('cell');
  });
});
