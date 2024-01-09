import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TablePicker } from './TablePicker';

describe('TablePicker', () => {
  isConformant({
    Component: TablePicker,
    displayName: 'TablePicker',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TablePicker>Default TablePicker</TablePicker>);
    expect(result.container).toMatchSnapshot();
  });
});
