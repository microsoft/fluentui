import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavItem } from './NavItem';

describe('NavItem', () => {
  isConformant({
    Component: NavItem,
    displayName: 'NavItem',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavItem>Default NavItem</NavItem>);
    expect(result.container).toMatchSnapshot();
  });
});
