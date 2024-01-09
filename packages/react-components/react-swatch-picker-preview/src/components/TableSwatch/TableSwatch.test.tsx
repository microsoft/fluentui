import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TableSwatch } from './TableSwatch';

describe('TableSwatch', () => {
  isConformant({
    Component: TableSwatch,
    displayName: 'TableSwatch',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TableSwatch>Default TableSwatch</TableSwatch>);
    expect(result.container).toMatchSnapshot();
  });
});
