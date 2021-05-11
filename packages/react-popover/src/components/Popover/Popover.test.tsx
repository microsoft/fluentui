import * as React from 'react';
import { Popover } from './Popover';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';

describe('Popover', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Popover in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Popover>Default Popover</Popover>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
