import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavDrawerFooter } from './NavDrawerFooter';

describe('NavDrawerFooter', () => {
  isConformant({
    Component: NavDrawerFooter,
    displayName: 'NavDrawerFooter',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavDrawerFooter>Default NavDrawerFooter</NavDrawerFooter>);
    expect(result.container).toMatchSnapshot();
  });
});
