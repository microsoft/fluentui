import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavDrawerHeader } from './NavDrawerHeader';

describe('NavDrawerHeader', () => {
  isConformant({
    Component: NavDrawerHeader,
    displayName: 'NavDrawerHeader',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavDrawerHeader>Default NavDrawerHeader</NavDrawerHeader>);
    expect(result.container).toMatchSnapshot();
  });
});
