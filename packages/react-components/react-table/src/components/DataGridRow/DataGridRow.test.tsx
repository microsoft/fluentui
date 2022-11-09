import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridRow } from './DataGridRow';
import { isConformant } from '../../testing/isConformant';
import { DataGridRowProps } from './DataGridRow.types';

describe('DataGridRow', () => {
  isConformant<DataGridRowProps>({
    Component: DataGridRow,
    displayName: 'DataGridRow',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DataGridRow>{() => 'foo'}</DataGridRow>);
    expect(result.container).toMatchSnapshot();
  });
});
