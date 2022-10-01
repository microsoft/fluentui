import * as React from 'react';
import { render } from '@testing-library/react';
import { CompoundButtonShim } from './CompoundButtonShim';

describe('CompoundButtonShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CompoundButtonShim>Default CompoundButtonShim</CompoundButtonShim>);
    expect(result.container).toMatchSnapshot();
  });
});
