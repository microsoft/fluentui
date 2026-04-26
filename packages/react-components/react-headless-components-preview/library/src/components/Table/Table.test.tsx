import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Table } from './Table';

describe('Table', () => {
  isConformant({ Component: Table, displayName: 'Table' });

  it('renders a semantic table element by default', () => {
    const { getByRole } = render(
      <Table>
        <tbody>
          <tr>
            <td>cell</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(getByRole('table')).toBeInTheDocument();
  });

  it('renders as div with role="table" when noNativeElements', () => {
    const { getByRole } = render(
      <Table noNativeElements>
        <Table.root />
      </Table>,
    );
    // noNativeElements renders div with explicit role
    const { container } = render(<Table noNativeElements />);
    expect(container.querySelector('[role="table"]')).toBeInTheDocument();
  });
});
