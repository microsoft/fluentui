import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCell } from './TableCell';
import { isConformant } from '../../common/isConformant';
import { TableCellProps } from './TableCell.types';

describe('TableCell', () => {
  isConformant({
    Component: TableCell as React.FunctionComponent<TableCellProps>,
    displayName: 'TableCell',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableCell>Default TableCell</TableCell>);
    expect(result.container).toMatchSnapshot();
  });
});
