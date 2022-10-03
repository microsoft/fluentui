import * as React from 'react';
import { render } from '@testing-library/react';
import { MenuButtonShim } from './MenuButtonShim';

describe('MenuButtonShim', () => {
  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<MenuButtonShim id="test">Default MenuButtonShim</MenuButtonShim>);
    expect(result.container).toMatchSnapshot();
  });
});
