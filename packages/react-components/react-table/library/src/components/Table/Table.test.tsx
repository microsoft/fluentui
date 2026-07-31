import * as React from 'react';
import { render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { Table } from './Table';
import { isConformant } from '../../testing/isConformant';
import type { TableProps } from './Table.types';
import { TableRow } from '../TableRow/TableRow';
import { TableCell } from '../TableCell/TableCell';
import { TableBody } from '../TableBody/TableBody';

describe('Table', () => {
  isConformant({
    Component: Table as React.FC<TableProps>,
    displayName: 'Table',
    // `classname-overrides-win` (extraTests below) pins the styling override contract
    // cascade-natively: the consumer `className` is composed last, and unlayered consumer CSS
    // beats the component’s `@layer fui.*` rules (DECISIONS.md D2/D9).
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  it('renders a default state', () => {
    const result = render(
      <Table>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <Table noNativeElements>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container).toMatchSnapshot();
  });
});
