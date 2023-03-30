import * as React from 'react';
import { render } from '@testing-library/react';
import { TableResizeHandle } from './TableResizeHandle';
import { isConformant } from '../../testing/isConformant';

describe('TableResizeHandle', () => {
  isConformant({
    Component: TableResizeHandle,
    displayName: 'TableResizeHandle',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableResizeHandle>Default TableResizeHandle</TableResizeHandle>);
    expect(result.container).toMatchSnapshot();
  });
});
