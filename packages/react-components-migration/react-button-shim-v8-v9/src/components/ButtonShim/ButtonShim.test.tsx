import * as React from 'react';
import { render } from '@testing-library/react';
import { ButtonShim } from './ButtonShim';

describe('ButtonShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ButtonShim>Default ButtonShim</ButtonShim>);
    expect(result.container).toMatchSnapshot();
  });
});
