import * as React from 'react';
import { Portal } from './Portal';
import { render } from '@testing-library/react';

describe('Portal', () => {
  /**
   * Note: see more visual regression tests for Portal in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const children = 'test';
    const { getByText } = render(<Portal>{children}</Portal>);
    expect(getByText(children)).toMatchSnapshot();
  });
});
