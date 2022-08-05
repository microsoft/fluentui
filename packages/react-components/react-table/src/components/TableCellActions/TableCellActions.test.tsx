import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellActions } from './TableCellActions';
import { isConformant } from '../../common/isConformant';

describe('TableCellActions', () => {
  isConformant({
    Component: TableCellActions,
    displayName: 'TableCellActions',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableCellActions>Default TableCellActions</TableCellActions>);
    expect(result.container).toMatchSnapshot();
  });
});
