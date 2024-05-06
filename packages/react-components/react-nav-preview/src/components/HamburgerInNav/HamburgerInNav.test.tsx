import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { HamburgerInNav } from './HamburgerInNav';

describe('HamburgerInNav', () => {
  isConformant({
    Component: HamburgerInNav,
    displayName: 'HamburgerInNav',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<HamburgerInNav>Default HamburgerInNav</HamburgerInNav>);
    expect(result.container).toMatchSnapshot();
  });
});
