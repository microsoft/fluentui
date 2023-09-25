import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellActions } from './TableCellActions';
import { isConformant } from '../../testing/isConformant';

describe('TableCellActions', () => {
  isConformant({
    Component: TableCellActions,
    displayName: 'TableCellActions',
  });

  it('renders a default state', () => {
    const result = render(<TableCellActions>Default TableCellActions</TableCellActions>);
    expect(result.container).toMatchSnapshot();
  });
});
