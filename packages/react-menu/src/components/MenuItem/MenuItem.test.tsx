import * as React from 'react';
import { MenuItem } from './MenuItem';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('MenuItem', () => {
  isConformant({
    Component: MenuItem,
    displayName: 'MenuItem',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuItem in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuItem>Default MenuItem</MenuItem>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
