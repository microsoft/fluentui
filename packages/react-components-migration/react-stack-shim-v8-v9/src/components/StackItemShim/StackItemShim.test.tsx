import * as React from 'react';
import { render } from '@testing-library/react';
import { StackItemShim } from './StackItemShim';

describe('StackItemShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<StackItemShim>Default StackItemShim</StackItemShim>);
    expect(result.container).toMatchSnapshot();
  });
});
