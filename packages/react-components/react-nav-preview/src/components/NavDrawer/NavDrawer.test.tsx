import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavDrawer } from './NavDrawer';

describe('NavDrawer', () => {
  isConformant({
    Component: NavDrawer,
    displayName: 'NavDrawer',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavDrawer>Default NavDrawer</NavDrawer>);
    expect(result.container).toMatchSnapshot();
  });
});
