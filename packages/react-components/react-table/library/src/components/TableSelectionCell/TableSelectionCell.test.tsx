import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { TableSelectionCell } from './TableSelectionCell';
import { isConformant } from '../../testing/isConformant';
import type { TableSelectionCellProps } from './TableSelectionCell.types';
import { tableContextDefaultValue, TableContextProvider } from '../../contexts/tableContext';

const tr = document.createElement('tr');
describe('TableSelectionCell', () => {
  beforeEach(() => {
    document.body.appendChild(tr);
    resetIdsForTests();
  });

  isConformant({
    Component: TableSelectionCell as React.FC<TableSelectionCellProps>,
    displayName: 'TableSelectionCell',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
    renderOptions: {
      container: tr,
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

  it('should not render a radio if invisible', () => {
    const { queryByRole } = render(<TableSelectionCell type="radio" invisible />, {
      container: tr,
    });
    expect(queryByRole('checkbox')).toBeNull();
    expect(queryByRole('radio')).toBeNull();
  });
});
