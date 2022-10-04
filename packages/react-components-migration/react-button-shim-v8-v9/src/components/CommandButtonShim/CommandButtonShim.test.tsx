import * as React from 'react';
import { render } from '@testing-library/react';
import { CommandButtonShim } from './CommandButtonShim';

describe('CommandButtonShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CommandButtonShim>Default CommandButtonShim</CommandButtonShim>);
    expect(result.container).toMatchSnapshot();
  });
});
