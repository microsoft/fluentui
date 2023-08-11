import * as React from 'react';
import { render } from '@testing-library/react';
import { Nav } from './Nav';
import { isConformant } from '../../testing/isConformant';

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
