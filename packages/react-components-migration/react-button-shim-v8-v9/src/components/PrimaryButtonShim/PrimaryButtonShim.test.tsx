import * as React from 'react';
import { render } from '@testing-library/react';
import { PrimaryButtonShim } from './PrimaryButtonShim';

describe('PrimaryButtonShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<PrimaryButtonShim>Default PrimaryButtonShim</PrimaryButtonShim>);
    expect(result.container).toMatchSnapshot();
  });
});
