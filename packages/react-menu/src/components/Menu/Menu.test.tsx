import * as React from 'react';
import { Menu } from './Menu';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('Menu', () => {
  isConformant({
    Component: Menu,
    displayName: 'Menu',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for Menu in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<Menu>Default Menu</Menu>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
