import * as React from 'react';
import { MenuDivider } from './MenuDivider';
import * as renderer from 'react-test-renderer';
import { ReactWrapper } from 'enzyme';
import { isConformant } from '../../common/isConformant';

describe('MenuDivider', () => {
  isConformant({
    Component: MenuDivider,
    displayName: 'MenuDivider',
  });

  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
  });

  /**
   * Note: see more visual regression tests for MenuDivider in /apps/vr-tests.
   */
  it('renders a default state', () => {
    const component = renderer.create(<MenuDivider>Default MenuDivider</MenuDivider>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
