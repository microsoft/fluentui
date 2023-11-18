import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Nav } from './Nav';

describe('Nav', () => {
  isConformant({
    Component: Nav,
    displayName: 'Nav',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Nav>Default Nav</Nav>);
    expect(result.container).toMatchSnapshot();
  });
});
