import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { NavDrawerBody } from './NavDrawerBody';

describe('NavDrawerBody', () => {
  isConformant({
    Component: NavDrawerBody,
    displayName: 'NavDrawerBody',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<NavDrawerBody>Default NavDrawerBody</NavDrawerBody>);
    expect(result.container).toMatchSnapshot();
  });
});
