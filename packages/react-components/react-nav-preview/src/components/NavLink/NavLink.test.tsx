import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavLink } from './NavLink';

describe('NavLink', () => {
  isConformant({
    Component: NavLink,
    displayName: 'NavLink',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavLink>Default NavLink</NavLink>);
    expect(result.container).toMatchSnapshot();
  });
});
