import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridCell } from './DataGridCell';
import { isConformant } from '../../testing/isConformant';
import { DataGridCellProps } from './DataGridCell.types';

describe('DataGridCell', () => {
  isConformant<DataGridCellProps>({
    Component: DataGridCell,
    displayName: 'DataGridCell',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DataGridCell>Default DataGridCell</DataGridCell>);
    expect(result.container).toMatchSnapshot();
  });
});
