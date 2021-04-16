import * as React from 'react';
import { Portal } from './Portal';
import * as renderer from 'react-test-renderer';

describe('Portal', () => {
  /**
   * Note: see more visual regression tests for Portal in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Portal>Default Portal</Portal>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
