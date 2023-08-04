import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Secondary } from './Secondary';

describe('Secondary', () => {
  isConformant({
    Component: Secondary,
    displayName: 'Secondary',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<Secondary>Default Secondary</Secondary>);
    expect(result.container).toMatchSnapshot();
  });
});
