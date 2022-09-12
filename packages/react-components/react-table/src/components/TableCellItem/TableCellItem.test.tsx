import * as React from 'react';
import { render } from '@testing-library/react';
import { TableCellItem } from './TableCellItem';
import { isConformant } from '../../common/isConformant';

describe('TableCellItem', () => {
  isConformant({
    Component: TableCellItem,
    displayName: 'TableCellItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableCellItem>Default TableCellItem</TableCellItem>);
    expect(result.container).toMatchSnapshot();
  });
});
