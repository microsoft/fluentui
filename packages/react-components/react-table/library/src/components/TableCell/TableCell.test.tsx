import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { TableCell } from './TableCell';
import { isConformant } from '../../testing/isConformant';
import type { TableCellProps } from './TableCell.types';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';

const tr = document.createElement('tr');
describe('TableCell', () => {
  beforeEach(() => {
    document.body.appendChild(tr);
  });

  isConformant({
    Component: TableCell as React.FunctionComponent<TableCellProps>,
    renderOptions: {
      container: tr,
    },
    displayName: 'TableCell',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(<TableCell>Default TableCell</TableCell>, { container: tr });
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableCell>Table cell</TableCell>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('cell');
  });
});
