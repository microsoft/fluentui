import * as React from 'react';
import { render } from '@testing-library/react';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { TableSelectionCell } from './TableSelectionCell';
import { isConformant } from '../../testing/isConformant';
import { TableSelectionCellProps } from './TableSelectionCell.types';
import { tableContextDefaultValue, TableContextProvider } from '../../contexts/tableContext';
import { tableSelectionCellClassNames } from './useTableSelectionCellStyles.styles';

const tr = document.createElement('tr');
describe('TableSelectionCell', () => {
  beforeEach(() => {
    document.body.appendChild(tr);
    resetIdsForTests();
  });

  isConformant({
    Component: TableSelectionCell as React.FC<TableSelectionCellProps>,
    displayName: 'TableSelectionCell',
    renderOptions: {
      container: tr,
    },
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            type: 'checkbox',
          },
          expectedClassNames: {
            root: tableSelectionCellClassNames.root,
            checkboxIndicator: tableSelectionCellClassNames.checkboxIndicator,
          },
        },
        {
          props: {
            type: 'radio',
          },
          expectedClassNames: {
            root: tableSelectionCellClassNames.root,
            radioIndicator: tableSelectionCellClassNames.radioIndicator,
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<TableSelectionCell>Default TableSelectionCell</TableSelectionCell>, { container: tr });
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableSelectionCell>Table cell</TableSelectionCell>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('cell');
  });

  it('renders Checkbox if type checkbox is set', () => {
    const { queryByRole } = render(<TableSelectionCell type="checkbox">Table cell</TableSelectionCell>, {
      container: tr,
    });
    expect(queryByRole('checkbox')).not.toBeNull();
  });

  it('renders radio if type radio is set', () => {
    const { queryByRole } = render(<TableSelectionCell type="radio">Table cell</TableSelectionCell>, {
      container: tr,
    });
    expect(queryByRole('checkbox')).toBeNull();
    expect(queryByRole('radio')).not.toBeNull();
  });
});
