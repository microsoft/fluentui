import * as React from 'react';
import { render } from '@testing-library/react';
import { StackShim } from './StackShim';
describe('StackShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<StackShim>Default StackShim</StackShim>);
    expect(result.container).toMatchSnapshot();
  });
});
