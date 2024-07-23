import * as React from 'react';
import { render } from '@testing-library/react';
import { Table } from './Table';
import { isConformant } from '../../testing/isConformant';
import { TableProps } from './Table.types';
import { TableRow } from '../TableRow/TableRow';
import { TableCell } from '../TableCell/TableCell';
import { TableBody } from '../TableBody/TableBody';

describe('Table', () => {
  isConformant({
    Component: Table as React.FC<TableProps>,
    displayName: 'Table',
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
