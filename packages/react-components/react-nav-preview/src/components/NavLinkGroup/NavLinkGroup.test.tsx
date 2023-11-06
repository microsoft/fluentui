import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavLinkGroup } from './NavLinkGroup';

describe('NavLinkGroup', () => {
  isConformant({
    Component: NavLinkGroup,
    displayName: 'NavLinkGroup',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavLinkGroup>Default NavLinkGroup</NavLinkGroup>);
    expect(result.container).toMatchSnapshot();
  });
});
