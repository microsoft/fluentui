import * as React from 'react';
import { render } from '@testing-library/react';
import { ActionButtonShim } from './ActionButtonShim';

describe('ActionButtonShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ActionButtonShim>Default ActionButtonShim</ActionButtonShim>);
    expect(result.container).toMatchSnapshot();
  });
});
