import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridVirtualizedBody } from './DataGridVirtualizedBody';
import { isConformant } from '../../common/isConformant';

describe('DataGridVirtualizedBody', () => {
  isConformant({
    Component: DataGridVirtualizedBody,
    displayName: 'DataGridVirtualizedBody',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<DataGridVirtualizedBody>Default DataGridVirtualizedBody</DataGridVirtualizedBody>);
    expect(result.container).toMatchSnapshot();
  });
});
