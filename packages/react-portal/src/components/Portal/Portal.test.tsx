import * as React from 'react';
import { Portal } from './Portal';
import { render } from '@testing-library/react';

describe('Portal', () => {
  /**
   * Note: see more visual regression tests for Portal in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const id = 'test';
    const { getByTestId } = render(<Portal data-testid={id}>Default Portal</Portal>);
    expect(getByTestId(id)).toMatchSnapshot();
  });
});
