import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavDrawerHeaderNav } from './NavDrawerHeaderNav';

describe('NavDrawerHeaderNav', () => {
  isConformant({
    Component: NavDrawerHeaderNav,
    displayName: 'NavDrawerHeaderNav',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavDrawerHeaderNav>Default NavDrawerHeaderNav</NavDrawerHeaderNav>);
    expect(result.container).toMatchSnapshot();
  });
});
